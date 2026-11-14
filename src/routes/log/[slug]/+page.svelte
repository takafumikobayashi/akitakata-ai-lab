<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const log = $derived(data.log);
	const Content = $derived(log.content);

	const ogImage = $derived(new URL('/images/ogp.jpg', page.url.origin).href);
</script>

<svelte:head>
	<title>{log.title} | あきたかたAI Lab</title>
	<meta name="description" content={log.summary} />
	<meta property="og:title" content="{log.title} | あきたかたAI Lab" />
	<meta property="og:description" content={log.summary} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="あきたかたAI Lab" />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:url" content={page.url.origin + page.url.pathname} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<SiteHeader />
<main id="main" class="log">
	<header class="day-hero">
		<div class="log-container container">
			<p class="sec-label">LAB LOG<span>活動の記録</span></p>
			<p class="event-tag day-tag">
				{#if log.event}<span>#{log.event}</span>{/if}<time datetime={log.date}>{log.dateLabel}</time
				>
			</p>
			<h1 class="display log-title">{log.title}</h1>
			<p class="log-summary">{log.summary}</p>
			{#if log.tags?.length}
				<ul class="log-tags" aria-label="タグ">
					{#each log.tags as tag (tag)}
						<li>{tag}</li>
					{/each}
				</ul>
			{/if}
		</div>
	</header>

	<div class="log-container container">
		<article class="day-body log-body">
			<Content />
		</article>
		<p class="log-back">
			<a class="line-link" href="{resolve('/')}#lab-log"
				><span aria-hidden="true">←</span> トップページへ戻る</a
			>
		</p>
	</div>
</main>
<SiteFooter />
