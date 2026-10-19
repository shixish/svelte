import type { Handle } from '@sveltejs/kit/hooks';
import { themeScript } from '#lib/theme.ts';

export const handle: Handle = ({ event, resolve }) =>
	resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%theme.script%', themeScript)
	});
