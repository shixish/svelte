<script lang="ts">
	import PostList from '#lib/components/PostList.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.tag} · Lorem Blog</title>
</svelte:head>

<h1 class="mb-8 text-3xl font-bold tracking-tight">Posts tagged “{data.tag}”</h1>
<PostList posts={data.posts} />
