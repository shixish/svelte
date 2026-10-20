<script lang="ts">
	import { goto, preloadData, pushState } from '$app/navigation';
	import { resolve } from '$app/paths';

	interface Props {
		label: string;
	}

	let { label }: Props = $props();

	async function preview(event: MouseEvent) {
		if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
		event.preventDefault();

		const href = resolve('/(blog)/tags/[tag=tag]', { tag: label });
		const result = await preloadData(href);
		if (result.type === 'loaded' && result.status === 200) {
			pushState(href, { tagPreview: result.data as App.PageState['tagPreview'] });
		} else {
			goto(href);
		}
	}
</script>

<li>
	<a
		href={resolve('/(blog)/tags/[tag=tag]', { tag: label })}
		onclick={preview}
		class="block rounded-full bg-stone-200/70 px-3 py-1 text-xs font-medium text-stone-700 hover:bg-stone-300/70 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700"
	>
		{label}
	</a>
</li>
