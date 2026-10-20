<script lang="ts">
	import { invalidate } from '$app/navigation';
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
	<a
		href={resolve('/(blog)')}
		class="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>
		&larr; All posts
	</a>

	<header class="mt-6 mb-10">
		<h1 class="text-4xl font-bold tracking-tight">{post.title}</h1>
		<div class="mt-4 flex items-center gap-2 text-sm text-stone-500">
			<span class="font-medium text-stone-700 dark:text-stone-300">{post.author}</span>
			<span aria-hidden="true">&middot;</span>
			<time datetime={post.date}>{formatDate(post.date)}</time>
			<span aria-hidden="true">&middot;</span>
			<span>{post.readingTime} min read</span>
		</div>
	</header>

	<div class="prose prose-stone prose-lg dark:prose-invert max-w-none">
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

<aside class="mt-16 border-t border-stone-200 pt-8 dark:border-stone-800">
	<div class="flex items-center justify-between">
		<h2 class="text-sm font-semibold tracking-wide text-stone-500 uppercase dark:text-stone-400">
			Related posts
		</h2>
		<button
			onclick={() => invalidate('app:related')}
			class="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
		>
			Refresh
		</button>
	</div>
	{#await data.related}
		<p class="mt-4 text-sm text-stone-500 dark:text-stone-400">Loading related posts…</p>
	{:then related}
		<ul class="mt-4 space-y-2">
			{#each related as other (other.slug)}
				<li>
					<a
						href={resolve('/(blog)/posts/[slug]', { slug: other.slug })}
						class="font-medium hover:text-stone-600 dark:hover:text-stone-300"
					>
						{other.title}
					</a>
				</li>
			{/each}
		</ul>
	{:catch}
		<p class="mt-4 text-sm text-red-600 dark:text-red-400">Couldn't load related posts.</p>
	{/await}
</aside>
