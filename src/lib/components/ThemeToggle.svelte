<script lang="ts">
	import { getSettings } from '#lib/settings.svelte.ts';
	import type { Theme } from '#lib/theme.ts';

	const settings = getSettings();

	const options: { value: Theme; label: string }[] = [
		{ value: 'light', label: 'Light' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'system', label: 'System' }
	];
</script>

<div
	role="group"
	aria-label="Color theme"
	class="flex rounded-full border border-stone-200 p-0.5 text-xs dark:border-stone-800"
>
	{#each options as option (option.value)}
		<button
			type="button"
			data-option={option.value}
			aria-pressed={settings.theme === option.value}
			onclick={() => (settings.theme = option.value)}
			class={[
				'rounded-full px-2.5 py-1 transition-colors',
				'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100',
				'theme-selected:bg-stone-900 theme-selected:text-white dark:theme-selected:bg-stone-100 dark:theme-selected:text-stone-900'
			]}
		>
			{option.label}
		</button>
	{/each}
</div>
