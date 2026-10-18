<script lang="ts">
	import { resolve } from '$app/paths';
	import { formatDate } from '#lib/posts.ts';
	import PostParagraph from '#lib/components/PostParagraph.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} · Lorem Blog</title>
	<meta name="description" content={post.excerpt} />
</svelte:head>

<article>
	<a href={resolve('/')} class="text-sm text-stone-400 hover:text-stone-100">&larr; All posts</a>

	<header class="mt-6 mb-10">
		<h1 class="text-4xl font-bold tracking-tight">{post.title}</h1>
		<div class="mt-4 flex items-center gap-2 text-sm text-stone-500">
			<span class="font-medium text-stone-300">{post.author}</span>
			<span aria-hidden="true">&middot;</span>
			<time datetime={post.date}>{formatDate(post.date)}</time>
			<span aria-hidden="true">&middot;</span>
			<span>{post.readingTime} min read</span>
		</div>
	</header>

	<div class="prose prose-stone prose-lg prose-invert max-w-none">
		<p class="lead">{post.excerpt}</p>
		{#each post.body as paragraph, i (i)}
			<PostParagraph
				text={paragraph}
				heading={i === 2 ? 'Vestibulum id ligula' : undefined}
				quote={i === 1
					? 'Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in.'
					: undefined}
			/>
		{/each}
	</div>
</article>
