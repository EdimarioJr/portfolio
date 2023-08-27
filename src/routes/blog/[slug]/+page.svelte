<script>
	import Footer from '$lib/components/footer.svelte';
	import Header from '$lib/components/header.svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta property="og:title" content={data.title} />
</svelte:head>

<section class="primary-background page">
	<Header />
	<article class=" article-container">
		<section class="container">
			<h1>{data.title}</h1>
			<p>Publicado: {data.date}</p>
			<section class="post-content">
				<svelte:component this={data.content} />
			</section>
		</section>
	</article>
	<Footer class="footer-override" />
</section>

<style>
	@import url('$lib/styles/code-highlight');
	.page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		min-height: 100%;
		background-color: var(--secondary);
		color: white;
	}

	.article-container {
		flex: 1;
		padding: 2rem 0;
	}

	h1 {
		font-size: 3rem;
		color: var(--primary);
	}

	.post-content {
		margin: 4rem 0;
		font-size: 1.2rem;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.post-content :global(a) {
		color: var(--primary);
		text-decoration: underline;
	}

	.page :global(.footer-override) {
		background-color: var(--secondary);
		color: var(--primary);
		border-top: 2px solid var(--primary);
	}

	@media (max-width: 470px) {
		h1 {
			font-size: 2rem;
		}

		.post-content {
			font-size: 1rem;
		}
	}
</style>
