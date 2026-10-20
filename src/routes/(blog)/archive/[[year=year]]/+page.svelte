<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { years } from '#lib/posts.ts';
	import PostList from '#lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.year ?? 'Archive'} · Lorem Blog</title>
</svelte:head>

<div class="mb-8 flex items-center justify-between gap-4">
	<h1 class="text-3xl font-bold tracking-tight">{data.year ?? 'All posts'}</h1>
	<select
		aria-label="Filter by year"
		value={data.year ?? ''}
		onchange={(event) =>
			goto(
				resolve('/(blog)/archive/[[year=year]]', { year: event.currentTarget.value || undefined })
			)}
		class="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm dark:border-stone-700 dark:bg-stone-900"
	>
		<option value="">All years</option>
		{#each years as year (year)}
			<option value={year}>{year}</option>
		{/each}
	</select>
</div>

<PostList posts={data.posts} />
