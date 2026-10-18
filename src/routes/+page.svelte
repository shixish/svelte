<script lang="ts">
	import { posts } from '#lib/posts.ts';
	import PostCard from '#lib/components/PostCard.svelte';
</script>

<section class="mb-12">
	<h1 class="text-4xl font-bold tracking-tight">Lorem ipsum dolor</h1>
	<p class="mt-3 text-lg text-stone-400">
		Notes on design, engineering, and everything in between. Sed ut perspiciatis unde omnis iste
		natus error sit voluptatem.
	</p>
</section>

<ul class="divide-y divide-stone-800">
	{#each posts as post (post.slug)}
		<li class="py-8 first:pt-0">
			<PostCard {post} />
		</li>
	{/each}
</ul>
