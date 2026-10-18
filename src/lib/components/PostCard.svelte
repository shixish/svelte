<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate, type Post } from '#lib/posts.ts';
	import Tag from './Tag.svelte';

	interface Props {
		post: Post;
	}

	let { post }: Props = $props();
</script>

<article>
	<div class="flex items-center gap-2 text-sm text-stone-500">
		<time datetime={post.date}>{formatDate(post.date)}</time>
		<span aria-hidden="true">&middot;</span>
		<span>{post.readingTime} min read</span>
	</div>
	<h2 class="mt-2 text-2xl font-semibold tracking-tight">
		<a href={resolve('/posts/[slug]', { slug: post.slug })} class="hover:text-stone-300">
			{post.title}
		</a>
	</h2>
	<p class="mt-2 text-stone-400">{post.excerpt}</p>
	<ul class="mt-4 flex gap-2">
		{#each post.tags as tag (tag)}
			<Tag label={tag} />
		{/each}
	</ul>
</article>
