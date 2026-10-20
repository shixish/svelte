<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let message = $state('');
	let submitting = $state(false);
	let formElement = $state<HTMLFormElement>();

	$inspect(form);

	$effect(() => {
		if (form?.errors) formElement?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
	});

	const inputClass =
		'mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm aria-[invalid=true]:border-red-500 dark:border-stone-700 dark:bg-stone-900';
	const errorClass = 'mt-1 text-sm text-red-600 dark:text-red-400';
</script>

<svelte:head>
	<title>Contact · Lorem Blog</title>
</svelte:head>

<section class="max-w-xl">
	<h1 class="text-4xl font-bold tracking-tight">Contact</h1>
	<p class="mt-4 text-stone-600 dark:text-stone-400">
		Lorem ipsum dolor sit amet. Send us a note and we'll get back to you.
	</p>

	{#if form?.success}
		<p
			role="status"
			class="mt-8 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800 dark:bg-green-950 dark:text-green-300"
		>
			Thanks, {form.name}! Your message was sent.
		</p>
	{/if}

	<form
		method="POST"
		bind:this={formElement}
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
		class="mt-8 space-y-5"
	>
		<div>
			<label for="name" class="text-sm font-medium">Name</label>
			<input
				id="name"
				name="name"
				value={form?.values?.name ?? ''}
				aria-invalid={form?.errors?.name ? 'true' : undefined}
				aria-describedby={form?.errors?.name ? 'name-error' : undefined}
				class={inputClass}
			/>
			{#if form?.errors?.name}
				<p id="name-error" class={errorClass}>{form.errors.name}</p>
			{/if}
		</div>

		<div>
			<label for="email" class="text-sm font-medium">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				value={form?.values?.email ?? ''}
				aria-invalid={form?.errors?.email ? 'true' : undefined}
				aria-describedby={form?.errors?.email ? 'email-error' : undefined}
				class={inputClass}
			/>
			{#if form?.errors?.email}
				<p id="email-error" class={errorClass}>{form.errors.email}</p>
			{/if}
		</div>

		<div>
			<label for="message" class="text-sm font-medium">Message</label>
			<textarea
				id="message"
				name="message"
				rows="5"
				bind:value={message}
				aria-invalid={form?.errors?.message ? 'true' : undefined}
				aria-describedby={form?.errors?.message ? 'message-error' : 'message-count'}
				class={inputClass}
			></textarea>
			{#if form?.errors?.message}
				<p id="message-error" class={errorClass}>{form.errors.message}</p>
			{:else}
				<p id="message-count" class="mt-1 text-sm text-stone-500 dark:text-stone-400">
					{message.length} characters
				</p>
			{/if}
		</div>

		<button
			disabled={submitting}
			class="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900"
		>
			{submitting ? 'Sending…' : 'Send message'}
		</button>
	</form>
</section>
