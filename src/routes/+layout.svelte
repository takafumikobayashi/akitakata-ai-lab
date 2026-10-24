<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { gaMeasurementId } from '#lib/data/site.js';
	import { initAnalytics } from '#lib/analytics.js';
	import favicon from '#lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	// 開発中のアクセスは計測しない
	onMount(() => {
		if (!import.meta.env.DEV) initAnalytics(gaMeasurementId);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#fafaf8" />
</svelte:head>

{@render children()}
