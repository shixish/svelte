<script lang="ts">
	import type { Post } from '#lib/posts.ts';
	import PostCard from './PostCard.svelte';

	let { posts }: { posts: Post[] } = $props();
</script>

<ul class="divide-y divide-stone-200 dark:divide-stone-800">
	{#each posts as post (post.slug)}
		<li class="py-8 first:pt-0">
			<PostCard {post} />
		</li>
	{/each}
</ul>
