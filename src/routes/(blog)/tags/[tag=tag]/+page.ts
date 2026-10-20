import { posts } from '#lib/posts.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => ({
	tag: params.tag,
	posts: posts.filter((post) => post.tags.includes(params.tag))
});
