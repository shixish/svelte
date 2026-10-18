<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { PageRouteId } from '$app/types';

	type RouteArgs = { [R in PageRouteId]: Parameters<typeof resolve<R>> }[PageRouteId];

	let { to, children }: { to: RouteArgs; children: Snippet } = $props();

	const active = $derived(
		page.route.id === to[0] &&
			Object.entries(to[1] ?? {}).every(
				([key, value]) => (page.params as Record<string, string | undefined>)[key] === value
			)
	);
</script>

<a
	href={resolve(...to)}
	aria-current={active ? 'page' : undefined}
	class={[
		'transition-colors hover:text-stone-100',
		active ? 'font-medium text-stone-100' : 'text-stone-400'
	]}
>
	{@render children()}
</a>
