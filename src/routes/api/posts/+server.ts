import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allPostFiles = import.meta.glob('/src/routes/blog/*.md');
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const { metadata } = (await resolver()) as { metadata: { date: Date; title: string } };
			const postPath = path.slice(11, -3);

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date).getMilliseconds() - new Date(a.meta.date).getMilliseconds();
	});

	return json(sortedPosts);
};
