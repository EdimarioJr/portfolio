<script lang="ts">
	import { locale, setLocale } from '$lib/i18n/translations';
	import Cookies from 'js-cookie';

	async function handleChange(event: any) {
		const value = event.target.value;
		Cookies.set('locale', value);
		locale.set(value);
	}
</script>

<select bind:value={$locale} on:change={handleChange}>
	<option value="pt-BR">Português</option>
	<option value="en">Inglês</option>
</select>
