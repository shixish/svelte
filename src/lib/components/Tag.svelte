<script lang="ts">
	interface Props {
		label: string;
	}

	let { label }: Props = $props();
</script>

<li
	class="rounded-full bg-stone-200/70 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300"
>
	{label}
</li>
