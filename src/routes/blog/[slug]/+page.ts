import type { LoadEvent } from '@sveltejs/kit';

export async function load(event: LoadEvent) {
	const locale = event.data?.locale ?? 'pt-BR';

	const post = await import(`../posts/${locale}/${event.params.slug}.md`);

	const { title, date } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date
	};
}
