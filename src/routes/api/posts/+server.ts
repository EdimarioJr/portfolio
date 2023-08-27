import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const locale = cookies.get('locale');
	let allPostFiles = null;

	switch (locale) {
		case 'en':
			allPostFiles = import.meta.glob('/src/routes/blog/posts/en/*.md');
			break;
		case 'pt-BR':
			allPostFiles = import.meta.glob('/src/routes/blog/posts/pt-BR/*.md');
			break;
		default:
			allPostFiles = import.meta.glob('/src/routes/blog/posts/pt-BR/*.md');
	}

	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([_, resolver]) => {
			const { metadata } = (await resolver()) as {
				metadata: { date: Date; title: string; slug: string };
			};

			return {
				meta: metadata,
				path: `/blog/${metadata.slug}`
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getMilliseconds() - new Date(a.meta.date).getMilliseconds();
	});

	return json(sortedPosts);
};
