<script lang="ts">
	import { page } from '$app/state';
	import { tags } from '#lib/posts.ts';
	import NavLink from '#lib/components/NavLink.svelte';
	import Dialog from '#lib/components/Dialog.svelte';
	import PostList from '#lib/components/PostList.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<nav aria-label="Topics" class="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
	<span class="text-stone-400 dark:text-stone-500">Topics</span>
	{#each tags as tag (tag)}
		<NavLink to={['/(blog)/tags/[tag=tag]', { tag }]}>{tag}</NavLink>
	{/each}
</nav>

{@render children()}

{#if page.state.tagPreview}
	<Dialog onclose={() => history.back()}>
		<h2 class="mb-8 text-3xl font-bold tracking-tight">
			Posts tagged “{page.state.tagPreview.tag}”
		</h2>
		<PostList posts={page.state.tagPreview.posts} />
	</Dialog>
{/if}
