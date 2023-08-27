import i18n from 'sveltekit-i18n';

const config = {
	loaders: [
		{
			locale: 'en',
			key: 'refs',
			loader: async () => (await import('./en/refs.json')).default
		},
		{
			locale: 'en',
			key: 'home',
			loader: async () => (await import('./en/home.json')).default
		},
		{
			locale: 'pt-br',
			key: 'home',
			loader: async () => (await import('./pt-br/home.json')).default
		},
		{
			locale: 'pt-br',
			key: 'refs',
			loader: async () => (await import('./pt-br/refs.json')).default
		}
	]
};

export const { t, locale, locales, loading, loadTranslations, setLocale } = new i18n(config);
