---
title: Introdução a refs no react
date: '21-08-2023'
slug: 'react-refs'
---

O useRef é um hook do react que recebe um initialValue como argumento e retorna uma referência, que é simplesmente um objeto com uma propriedade current. Quando se passa esse
initialValue para o hook, a propriedade current já vem preenchida com esse valor. Abaixo está um exemplo desse uso simples:

```js
import { useRef } from 'react';

function MyComponent() {
	const initialValue = 0;
	const reference = useRef(initialValue);

	const someHandler = () => {
		// Acessa o valor current
		const value = reference.current;

		// Atualiza o valor current
		reference.current = newValue;
	};

	// ...
}
```

Tem 2 pontos importantes sobre essa referência:

1. O valor current é persistido durante as renderizações dos componentes. Ou seja, se você coloca o valor 2 no ref e o componente re-renderiza, o valor continua 2. Se você muda para 3 e o componente renderiza novamente, o valor continua 3.

2. Mudanças no current NÃO DISPARAM RENDERIZAÇÕES NOS COMPONENTES.

Por essas características, podemos usar o ref para persistir valores entre renderizações mas com o objetivo de que a mudança nesses valores não dispare nenhuma renderização desnecessária no componente.

Um exemplo prático para esse uso é na implementação de um timer:

```javascript
function Stopwatch() {
	const timerIdRef = useRef(0);
	const [count, setCount] = useState(0);

	const startHandler = () => {
		if (timerIdRef.current) {
			return;
		}
		timerIdRef.current = setInterval(() => setCount((c) => c + 1), 1000);
	};

	const stopHandler = () => {
		clearInterval(timerIdRef.current);
		timerIdRef.current = 0;
	};

	useEffect(() => {
		return () => clearInterval(timerIdRef.current);
	}, []);

	return (
		<div>
			<div>Timer: {count}s</div>
			<div>
				<button onClick={startHandler}>Start</button>
				<button onClick={stopHandler}>Stop</button>
			</div>
		</div>
	);
}
```

Usamos timerIdRef para armazenar o setInterval. Percebamos também que não precisamos renderizar o componente toda vez que paramos ou começamos o timer, ou seja, toda vez que trocamos o setInterval. Com o ref, isso é possível. Se usássemos useState para armazenar o setInterval, todo start e stop causaria uma renderização no componente.

### Manipulando DOM

Agora iremos para o caso mais comum para o dev front-end: A manipulação direta de elementos no DOM usando o useRef. Quando passamos o useRef num elemento, o React coloca a referência daquele elemento no current do ref, assim que o elemento é montado. Através dessa referência, podemos mudar o value, dar focus, dar play imperativamente em qualquer nó do DOM. Essa é a maneira correta de se manipular diretamente o DOM usando o React.

Usar métodos da api do DOM diretamente ( como o document.getElementById, document.getAlgo...) atrapalha na renderização do React, pois em alguns momentos a api do browser não notifica o React sobre as mudanças ocorridas, causando uma imprevisibilidade que não queremos! Vamos para um exemplo do useRef num elemento DOM:

```javascript
import { useRef, useEffect } from 'react';

function InputFocus() {
	const inputRef = useRef();

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return <input ref={inputRef} type="text" />;
}
```

No exemplo acima, estamos dando focus no input assim que o componente é renderizado pela primeira vez. Perceba que acessamos a api do input através do useRef. Você também pode usar a mesma ref para pegar o valor atual do input, acessando inputRef.current.value.

Podemos acessar o value do input com o ref por que os elementos de form do HTML tem um diferencial: Eles tem estado interno próprio. Por isso que não precisamos setar o value dele em nenhum momento, só pegar. Essa abordagem tem essa vantagem de performance e simplicidade, porém fica mais difícil monitorar mudanças nesse estado para aplicar validações, por exemplo. A título de curiosidade, essa abordagem é usada pela lib [React hook form](https://www.react-hook-form.com).

Os refs são a maneira correta de manipular elementos no DOM de maneira IMPERATIVA, mas lembre-se que o React por natureza é DECLARATIVO. Ou seja, devemos sempre tentar
resolver o problema através do estado e declarando o que acontece quando ele muda.

### Typescript

No typescript sempre devemos declarar o tipo do elemento que queremos manipular. Isso vai evitar reclamações do TS e o Intellisense vai fornecer todos os
métodos possíveis daquele elemento:

```typescript
const focusNewCommentaryInputRef = useRef<HTMLInputElement | null>(null);
```

Uma ref apontada para o DOM sempre começa com null ou undefined, porque o React só a preenche depois de montar o componente. Portanto, é importante especificar isso no tipo para evitar erros.

#### Referências

- [https://bobbyhadz.com/blog/react-ref-returns-undefined-or-null](https://bobbyhadz.com/blog/react-ref-returns-undefined-or-null)
- [https://ui.dev/useref](https://ui.dev/useref)
- [https://dmitripavlutin.com/react-useref/](https://dmitripavlutin.com/react-useref/)
