import { error } from '@sveltejs/kit';
import { getPost, getRelatedPosts } from '#lib/posts.ts';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params, depends }) => {
	depends('app:related');
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { post, related: getRelatedPosts(post) };
};
