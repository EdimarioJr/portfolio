import { setLocale } from '$lib/i18n/translations';

export const load = async ({ url, data }) => {
	const currentRoute = url.pathname;

	await setLocale(data.locale);

	return {
		currentRoute
	};
};
