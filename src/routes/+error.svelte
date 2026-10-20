<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{page.status} · Lorem Blog</title>
</svelte:head>

<section class="py-16 text-center">
	<p class="text-sm font-semibold text-stone-500 dark:text-stone-400">{page.status}</p>
	<h1 class="mt-2 text-4xl font-bold tracking-tight">{page.error?.message}</h1>
	<a
		href={resolve('/(blog)')}
		class="mt-8 inline-block text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>
		&larr; Back to the blog
	</a>
</section>
