<script lang="ts">
	import marca2 from '$lib/assets/marcas total-02.png';
	import triviaImage from '$lib/assets/trivia-app.png';
	import Footer from '$lib/components/footer.svelte';
	import LocaleSwitcher from '$lib/components/localeSwitcher.svelte';
	import Icon from '@iconify/svelte';
	import { linear } from 'svelte/easing';
	import { locale } from '$lib/i18n/translations';

	import { blur } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let data;
	let options = { duration: 1000, easing: linear };

	let ready = false;
	onMount(() => (ready = true));

	async function getPosts() {
		if (browser) {
			const response = await fetch('/api/posts');
			const posts = await response.json();
			data.posts = posts || [];
		}
	}

	$: $locale, getPosts();
</script>

<svelte:head>
	<title>edimario jr</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="primary-background presentation-section">
	{#if ready}
		<section class="container presentation-container" transition:blur={options}>
			<section class="presentation">
				<img alt="logo" src={marca2} />
				<h1>Oi, me chamo Edimário e sou desenvolvedor front-end</h1>
				<p>Tenho 3 anos de experiência com Javascript, React, Next.js e Angular.</p>
			</section>

			<nav class="links">
				<a href="https://github.com/EdimarioJr"
					><Icon icon="mdi:github" style="width: 2rem; height: 2rem;" /></a
				>

				<a href="https://www.linkedin.com/in/edimário-silva-moura-júnior-3a88561a5/"
					><Icon icon="mdi:linkedin" style="width: 2rem; height: 2rem;" /></a
				>
				<a href="mailto:edimariojunior.14@gmail.com"
					><Icon icon="mdi:gmail" style="width: 2rem; height: 2rem;" /></a
				>
			</nav>
		</section>
	{/if}
</section>

<section class="container">
	<section class="projects" id="projects">
		<h2>Projetos</h2>
		<div class="projects-list">
			<div class="projects-card">
				<img alt="trivia app print" src={triviaImage} />
				<article>
					<h3>Trivia app</h3>
					<p>
						App de quiz construído com <strong>Next.js, SCSS, Redux</strong> e testado com
						<strong>Jest e React Testing Library</strong>. Aplica conceitos como
						<strong>Server Side Rendering</strong>
						e <strong>refs no React</strong> para manipular o elemento audio do
						<strong>HTML</strong>. Nesse app, o usuário passa por 10 questões aleatórias em inglês,
						e ao final o resultado é mostrado.
					</p>
					<a rel="external" class="codigolink" href="https://github.com/EdimarioJr/trivia-app"
						>Ver o código</a
					>
					<a rel="external" class="sitelink" href="https://trivia-app-inky.vercel.app">Ver o site</a
					>
				</article>
			</div>
		</div>
	</section>
</section>

<section class="primary-background blog-container">
	<section class="container">
		<h2>Blog</h2>
		<div class="blog-list">
			{#if data.posts.length}
				{#each data.posts || [] as blogPost}
					<div class="blog-article">
						<p>{blogPost.meta.date}</p>
						<a href={blogPost.path}>{blogPost.meta.title}</a>
					</div>
				{/each}
			{:else}
				<h1>Não tem blogs</h1>
			{/if}
		</div>
	</section>
</section>
<Footer />

<style>
	.presentation-section {
		height: max(100vh, 100%);
	}

	.presentation-container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.presentation {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		color: var(--secondary);
		text-align: center;
		flex: 1;
	}

	.presentation img {
		width: 31rem;
		margin-bottom: 5rem;
	}

	.presentation h1 {
		font-weight: 700;
		font-size: 2.5rem;
		text-align: center;
		margin-bottom: 2rem;
	}

	.presentation p {
		font-weight: 500;
		font-size: 1.5rem;
	}

	.links {
		display: flex;
		gap: 4rem;
		padding: 2rem 0;
		align-items: center;
		justify-content: center;
	}

	.links a {
		font-size: 1.2rem;
	}

	.projects-list {
		margin-top: 3rem;
	}

	.projects {
		padding-top: 3rem;
	}

	.projects-card {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr;
		grid-gap: 2rem;
		margin-bottom: 4rem;
	}
	.projects-card img {
		width: 100%;
		height: auto;
	}

	article p {
		height: calc(100% - 90px);
	}

	article h3 {
		margin-bottom: 1.3rem;
	}

	.sitelink,
	.codigolink {
		padding: 0.7rem 1.2rem;
		border: 1px solid var(--black);
		margin-right: 1.2rem;
		box-shadow: 5px 5px var(--black);
		font-weight: 500;
		cursor: pointer;
	}

	.sitelink {
		background-color: var(--primary);
	}

	.blog-container {
		padding: 5rem 0;
	}

	.blog-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
		margin-top: 3rem;
	}

	.blog-article {
		display: flex;
		align-items: center;
		gap: 5rem;
		width: 100%;
	}

	.blog-article a {
		text-decoration: underline;
		font-weight: bold;
	}

	@media (max-width: 470px) {
		.presentation-section {
			padding: 2rem 0;
		}

		.presentation-section h1 {
			font-size: 2rem;
		}

		.presentation p {
			font-size: 1.2rem;
		}

		.container {
			width: 95%;
		}

		.presentation img {
			width: 90%;
			height: auto;
		}

		.links {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.links a {
			margin: 0.8rem 0;
			font-size: 1rem;
		}

		.presentation {
			height: calc(100%);
		}

		.projects-card {
			grid-template-columns: 1fr;
		}

		.projects-card article a {
			display: block;
			margin-bottom: 1rem;
		}

		article p {
			height: auto;
			margin-bottom: 2.2rem;
		}

		.blog-article {
			gap: 2rem;
		}
	}

	@media (min-width: 471px) and (max-width: 1000px) {
		.projects-card {
			grid-template-columns: 1fr;
			grid-template-rows: repeat(2, 1fr);
		}

		article p {
			height: auto;
			margin-bottom: 2.1rem;
		}
	}
</style>
