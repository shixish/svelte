import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const prerender = false;

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const values = {
			name: String(data.get('name') ?? '').trim(),
			email: String(data.get('email') ?? '').trim(),
			message: String(data.get('message') ?? '').trim()
		};

		const errors: Partial<Record<keyof typeof values, string>> = {};
		if (!values.name) errors.name = 'Please enter your name.';
		if (!values.email.includes('@')) errors.email = 'Please enter a valid email address.';
		if (values.message.length < 10) errors.message = 'Please write at least 10 characters.';

		if (Object.keys(errors).length > 0) return fail(400, { values, errors });

		console.log('Contact form submission', values);
		return { success: true, name: values.name };
	}
} satisfies Actions;
