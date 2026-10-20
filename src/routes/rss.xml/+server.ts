import { posts } from '#lib/posts.ts';
import type { RequestHandler } from './$types';

export const prerender = false;

function escapeXml(text: string) {
	return text
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export const GET: RequestHandler = ({ url }) => {
	const items = posts
		.map((post) => {
			const link = `${url.origin}/posts/${post.slug}`;
			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${link}</link>
			<guid>${link}</guid>
			<description>${escapeXml(post.excerpt)}</description>
			<pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
	<channel>
		<title>Lorem Blog</title>
		<link>${url.origin}</link>
		<description>Notes on design, engineering, and everything in between.</description>${items}
	</channel>
</rss>`;

	return new Response(xml, {
		headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
	});
};
