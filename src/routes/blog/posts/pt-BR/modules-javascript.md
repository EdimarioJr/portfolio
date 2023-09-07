---
title: Módulos no javascript
date: '06-09-2023'
slug: 'modules-javascript'
---

Módulos são pedaços de código javascript. É isso. Um sistema de módulos é o que permite que o js entenda como esses pedaços de código serão usados em várias partes da aplicação, e como pedaços de código podem usar outros pedaços de código que estão em arquivos diferentes.

No começo da história do JS, módulos não eram necessários, por que os scripts eram muito simples, então os devs não viam necessidade de separar sua aplicação em vários pedaços.

```html
<head>
	<script src="pedaco1.js"></script>
	<script src="pedaco2.js"></script>
</head>
```

Esses scripts tem duas características que não são legais e que podem tornar a aplicação uma bagunça infestada de bugs enquanto cresce:

1 - O escopo é compartilhado por todos os scripts. Isso quer dizer que se você tem uma variável 'abc' no script1, você pode acessar tranquilamente essa variável no script2, sem precisar IMPORTAR EXPLICITAMENTE um script no outro. Escopo global poluído é uma das mais clássicas más práticas.

```html
<head>
	<script>
		const variavel = 123;
	</script>

	<script>
		console.log(variavel); // 123. De onde vem esse 'variavel'? Nem importei nada...
	</script>
</head>
```

2 - A ordem de carregamento não é determinada automaticamente: é a ordem dos scripts, de cima pra baixo. Isso quer dizer que se você precisa de algo de outro script, esse outro script tem que estar acima do código atual.

Lembro que no meu primeiro freela, inventei de fazer a aplicação para o cliente em vanilla js, sem uso de nenhum bundler por trás. A minha inocência foi um pouco cara: tempos depois, essas características dos scripts no js deixaram a aplicação muito ruim de se manter, com bugs surgindo devido a esse escopo global e ordem de carregamento dos scripts.

### CommonJS e Bundlers

A web foi crescendo e consequentemente os webapps foram ficando cada vez mais complexos. Isso forjou a necessidade de um sistema de módulos no JS, por que as aplicações cada vez mais estavam difíceis de serem mantidas.

Em 2009, surge o Nodejs executando Javascript no servidor. O nodejs tinha suas necessidades, portanto foi desenvolvido para ele um sistema de módulos chamado de Commonjs. Provavelmente você, caro leitor, já viu essa sintaxe umas 1000 vezes:

```js
const moduloA = require('./arquivoA');

console.log(moduloA.algo); // Funciona, importei algo!

const b = 10;

module.exports = b; // Legal, acabei de exportar algo para outros arquivos usarem!
```

Com o require estamos importando um pedaço de código de outro arquivo para usar no arquivo atual.

Já com o module.exports, estamos expondo código do arquivo atual para que outros arquivos possam importar.
Com isso , os desenvolvedores podem organizar sua aplicação do jeito que bem entender, e tudo fica mais fácil de se manter. Legal, né?

Mas por que isso não foi transferido pro navegador ? Por um motivo de **tempo de carregamento**. O commonjs foi especificado pro servidor. Importar um módulo de um servidor é simplesmente acessar o disco em busca de um arquivo. Isso é muito rápido e não afeta em quase nada o trabalho de uma hipotética Api em Node, por exemplo. Podemos portanto fazer essa operação de forma síncrona! E todo o Commonjs foi feito para ser síncrono.

Já no navegador não é tão simples. A nossa aplicação não está mais no servidor, está no dispositivo do cliente. Agora, carregar módulos é carregar pedaços de código pela internet, o que é uma tarefa muito mais lenta e custosa do que simplesmente acessar o disco rígido. Além disso, estamos em um ambiente menos tolerante a loadings. Não podemos travar a UI do usuário enquanto importamos um módulo, por exemplo. Então essas operações DEVEM ser assíncronas, consequentemente o Commonjs nunca funcionou no browser.

Por causa disso, surgiram diversas ferramentas e especificações de módulos para o front-end, por exemplo:

- [Browserify](https://browserify.org)
- [RequireJS](https://requirejs.org)
- [Especificação UMD](https://github.com/umdjs/umd)
- [Especificação AMD](https://requirejs.org/docs/whyamd.html)
- [Webpack](https://github.com/webpack/webpack)

Os bundlers serviam principalmente para isso naquela época: permitir que aplicações front-end tivessem um sistema de módulos. Eles também eram usados para minificar os arquivos, diminuindo o bundle e entregando menos peso ao cliente, e isso é essencial na web.

Mesmo assim, ainda faltava uma coisa: que navegadores pudessem entender **NATIVAMENTE** módulos.

### ESModules

Surge então o ESModules. Fruto de anos de amadurecimento e pesquisa do [TC39](https://tc39.es), a entidade que especifica e padroniza o javascript. Assim, é padronizada a seguinte sintaxe que funciona em qualquer ambiente javascript ( lado do servidor e browser ):

```js
import { algo } de './outrolugar.js'

console.log('algo', algo) // legal!

const b = 10;


export default b;  // show de bola

```

Com o import, você importa um módulo que está em outro arquivo para o arquivo atual, e com o export você deixa partes do código de seu arquivo atual livres para serem importados por outros arquivos.

Por ser um sistema de módulos unificado para todos os ambientes javascript, o ESM leva em conta as necessidades do browser.Por exemplo, ele é feito para ser tree-shakeable, permitindo que seja muito mais fácil para as ferramentas e para o browser deletar módulos que não estão sendo usados, diminuindo assim o tamanho do bundle e beneficiando o usuário no seu dispositivo.

Hoje em dia, a maioria dos navegadores suporta o ESM. É só colocar type=module nos scripts.

Duas coisas importantes sobre módulos no browser:

1 - Agora temos escopo por módulo. Ou seja, diferente de antigamente, o que colocamos no módulo não vai pro escopo global:

```html
<body>
	<script type="module">
		// A variável só é visível nesse script
		let user = 'John';
	</script>

	<script type="module">
		alert(user); // Erro!
	</script>
</body>
```

2 - Um módulo só é carregado uma vez. Se arquivos importarem esse módulo depois, eles vão receber uma referência na memória para esse módulo já carregado. Isso é bem conveniente e aproveitamos disso no dia a dia quando criamos aquele arquivo de configuração do axios ou do firebase para nosso projeto React, por exemplo. O ESM só 'roda' uma vez o arquvo durante o ciclo de vida da aplicação, não todas as vezes que algo importa esse módulo, é por isso que funciona normalmente.

Não tente usar módulos acessando os arquivos por meio do filesystem, não vai funcionar! Você tem que servir por algum servidor. Um [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) funciona.

### Conclusão

Você pode estar se perguntando: Se todos os navegadores suportam ESM, por que ainda precisamos de bundlers como webpack, rollup, etc.. ? Temos alguns motivos:

- Performance: Ainda vale mais a pena fazer o bundle e deixar tudo num arquivo só, por que assim o cliente recebe um arquivo só ( maior ) de uma vez, ao invés de fazer várias chamadas HTTP para importar os múltiplos módulos da aplicação.
- Tamanho final: Os bundlers fazem um trabalho ótimo na minificação e processamento dos arquivos nos projetos.
- Os bundlers permitem que a gente possa trabalhar com vários tipos de módulos ( ESM, CJS..) no mesmo projeto, isso pode ser necessário em alguns casos.
- Melhor desenvolvimento: Hot module replacement e rapidez no start dos projetos ( isso devido também ao ESM ).

Em resumo, os módulos são essenciais para organizar e estruturar o código JavaScript em projetos web complexos. Embora o suporte nativo aos módulos (ESM) esteja disponível na maioria dos navegadores, os bundlers ainda desempenham um papel importante para otimização de desempenho e tamanho final dos pacotes.

#### Referências

- [Why front-end tools are getting overhaul](https://www.youtube.com/watch?v=5F_k9q9HbAc)
- [Javascript Info - Modules](https://javascript.info/modules)
- [https://www.misha.wtf/blog/javascript-modules](https://www.misha.wtf/blog/javascript-modules)
- [Frontend first](https://www.youtube.com/watch?t=1740&v=j1s_3zytAcM&feature=youtu.be)
