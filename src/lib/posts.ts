export interface Post {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	author: string;
	tags: string[];
	readingTime: number;
	body: string[];
}

const lorem = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Maecenas faucibus mollis interdum.',
	'Vestibulum id ligula porta felis euismod semper. Nullam quis risus eget urna mollis ornare vel eu leo. Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod.',
	'Sed posuere consectetur est at lobortis. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
	'Donec sed odio dui. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla vitae elit libero, a pharetra augue.',
	'Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean eu leo quam pellentesque ornare sem lacinia quam venenatis vestibulum.'
];

export const posts: Post[] = [
	{
		slug: 'lorem-ipsum-dolor',
		title: 'Lorem ipsum dolor sit amet',
		excerpt:
			'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		date: '2026-10-12',
		author: 'Jane Doe',
		tags: ['design', 'process'],
		readingTime: 4,
		body: lorem
	},
	{
		slug: 'consectetur-adipiscing',
		title: 'Consectetur adipiscing elit',
		excerpt:
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		date: '2026-09-28',
		author: 'John Smith',
		tags: ['engineering'],
		readingTime: 6,
		body: [...lorem].reverse()
	},
	{
		slug: 'sed-do-eiusmod',
		title: 'Sed do eiusmod tempor incididunt',
		excerpt:
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
		date: '2026-09-15',
		author: 'Jane Doe',
		tags: ['notes', 'design'],
		readingTime: 3,
		body: lorem.slice(0, 3)
	},
	{
		slug: 'ut-labore-et-dolore',
		title: 'Ut labore et dolore magna aliqua',
		excerpt:
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		date: '2025-11-30',
		author: 'John Smith',
		tags: ['engineering', 'notes'],
		readingTime: 5,
		body: [...lorem.slice(2), ...lorem.slice(0, 2)]
	}
];

export const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();

export const years = [...new Set(posts.map((post) => post.date.slice(0, 4)))].sort().reverse();

export function getPost(slug: string): Post | undefined {
	return posts.find((post) => post.slug === slug);
}

export async function getRelatedPosts(post: Post): Promise<Post[]> {
	// Stands in for a slow data source so the pending state is visible.
	await new Promise((resolve) => setTimeout(resolve, 1000));
	return posts
		.filter((other) => other.slug !== post.slug && other.tags.some((tag) => post.tags.includes(tag)))
		.slice(0, 2);
}

export function formatDate(date: string): string {
	return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
