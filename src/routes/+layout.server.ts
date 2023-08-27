import { locales, loadTranslations } from '$lib/i18n/translations';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ url, cookies, request }) => {
	const { pathname } = url;

	// Try to get the locale from cookie
	let locale = cookies.get('locale');

	// Get user preferred locale
	if (!locale) {
		locale = `${`${request.headers.get('accept-language')}`.match(/[a-zA-Z]+?(?=-|_|,|;)/)}`;
	}

	// Get defined locales
	const supportedLocales = locales.get();

	// Use default locale if current locale is not supported
	if (!supportedLocales.includes(locale)) {
		locale = 'pt-BR';
	}

	await loadTranslations(locale, pathname);

	return {
		locale
	};
};
