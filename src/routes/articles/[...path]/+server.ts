import { error, redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import { getPost } from '#lib/posts.ts';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = ({ params }) => {
	const slug = params.path.split('/').at(-1) ?? '';
	if (!getPost(slug)) error(404, 'Post not found');
	redirect(301, resolve('/(blog)/posts/[slug]', { slug }));
};
