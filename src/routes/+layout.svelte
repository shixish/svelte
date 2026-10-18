<script lang="ts">
	import './layout.css';
	import favicon from '#lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import NavLink from '#lib/components/NavLink.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	const links = [
		{ route: '/', label: 'Blog' },
		{ route: '/about', label: 'About' }
	] as const;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Lorem Blog</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-stone-950 text-stone-100">
	<header class="border-b border-stone-800 bg-stone-950/80 backdrop-blur">
		<div class="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
			<a href={resolve('/')} class="text-lg font-semibold tracking-tight">Lorem Blog</a>
			<nav class="flex gap-6 text-sm">
				{#each links as link (link.route)}
					<NavLink to={[link.route]}>{link.label}</NavLink>
				{/each}
			</nav>
		</div>
	</header>

	<main class="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
		{@render children()}
	</main>

	<footer class="border-t border-stone-800">
		<div
			class="mx-auto flex max-w-3xl items-center justify-between px-6 py-6 text-sm text-stone-400"
		>
			<p>&copy; {new Date().getFullYear()} Lorem Blog</p>
			<p>Built with SvelteKit</p>
		</div>
	</footer>
</div>
