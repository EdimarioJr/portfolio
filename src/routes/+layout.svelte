<script>
	import './styles.css';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#key data.currentRoute}
	<main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
		<slot />
	</main>
{/key}
