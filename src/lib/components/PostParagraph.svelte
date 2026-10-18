<script lang="ts">
	interface Props {
		text: string;
		heading?: string;
		quote?: string;
	}

	let { text, heading, quote }: Props = $props();
</script>

{#if heading}
	<h2>{heading}</h2>
{/if}
<p>{text}</p>
{#if quote}
	<blockquote>
		<p>{quote}</p>
	</blockquote>
{/if}
