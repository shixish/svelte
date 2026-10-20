<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children, onclose }: { children: Snippet; onclose: () => void } = $props();

	let dialog = $state<HTMLDialogElement>();

	$effect(() => {
		dialog?.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	{onclose}
	class="m-auto max-h-[85vh] w-full max-w-2xl rounded-2xl bg-stone-50 p-8 text-stone-900 backdrop:bg-black/50 dark:bg-stone-950 dark:text-stone-100"
>
	<button
		onclick={() => dialog?.close()}
		class="float-right text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
	>
		Close
	</button>
	{@render children()}
</dialog>
