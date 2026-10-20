import { defineParams } from '@sveltejs/kit/params';
import { tags } from '#lib/posts.ts';

export const params = defineParams({
	tag: (param) => (tags.includes(param) ? param : undefined),
	year: (param) => (/^\d{4}$/.test(param) ? param : undefined)
});
