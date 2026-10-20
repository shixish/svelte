import { error } from '@sveltejs/kit';
import { posts, years } from '#lib/posts.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => years.map((year) => ({ year }));

export const load: PageLoad = ({ params }) => {
	const { year } = params;
	const matching = year ? posts.filter((post) => post.date.startsWith(year)) : posts;
	if (matching.length === 0) error(404, `No posts from ${year}`);
	return { year, posts: matching };
};
