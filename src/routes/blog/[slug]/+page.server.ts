import type { ServerLoadEvent } from '@sveltejs/kit';

export async function load({ cookies }: ServerLoadEvent) {
	const locale = cookies.get('locale');

	return { locale };
}
