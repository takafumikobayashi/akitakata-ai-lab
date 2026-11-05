<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import SiteFooter from '#lib/components/SiteFooter.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const day = $derived(data.day);
	const Content = $derived(day.content);

	const ogImage = $derived(new URL('/images/ogp.jpg', page.url.origin).href);

	// 当日は日本時間に合わせて「いま」の時間枠を強調する
	let nowSlotId = $state<string | null>(null);

	const jstNow = () => {
		// sv-SE は "2026-11-08 14:05" の形式になる
		const [date, time] = new Intl.DateTimeFormat('sv-SE', {
			timeZone: 'Asia/Tokyo',
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23'
		})
			.format(new Date())
			.split(' ');
		return { date, time };
	};

	const pad = (t: string) => t.padStart(5, '0');

	function updateNow() {
		const { date, time } = jstNow();
		const slot =
			date === day.date
				? day.slots.find((s) => pad(s.start) <= time && time < pad(s.end))
				: undefined;
		nowSlotId = slot?.id ?? null;
	}

	onMount(() => {
		updateNow();
		const timer = setInterval(updateNow, 30_000);
		return () => clearInterval(timer);
	});

	// 本文はMarkdownから生成されるため、該当する時間枠の要素へ直接クラスを付ける
	$effect(() => {
		document.querySelectorAll('.day-body .slot').forEach((el) => {
			const active = el.id === nowSlotId;
			el.classList.toggle('is-now', active);
			if (active) el.setAttribute('aria-current', 'time');
			else el.removeAttribute('aria-current');
		});
	});
</script>

<svelte:head>
	<title>#{day.number} 当日のページ | あきたかたAI Lab</title>
	{#if day.description}
		<meta name="description" content={day.description} />
		<meta property="og:description" content={day.description} />
	{/if}
	<meta property="og:title" content="{day.title} | あきたかたAI Lab" />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="あきたかたAI Lab" />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:url" content={page.url.origin + page.url.pathname} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<SiteHeader />
<main id="main" class="day">
	<header class="day-hero">
		<div class="container">
			<p class="sec-label">DAY #{day.number}<span>当日のページ</span></p>
			<p class="event-tag day-tag"><span>#{day.number}</span>当日タイムテーブル</p>
			<h1 class="display">{day.theme}</h1>
			<dl class="day-facts">
				<div>
					<dt>開催日</dt>
					<dd><time datetime={day.date}>{day.dateLabel}</time></dd>
				</div>
				<div>
					<dt>時間</dt>
					<dd>{day.start}〜{day.end}</dd>
				</div>
				<div>
					<dt>会場</dt>
					<dd>{day.venue}</dd>
				</div>
				{#if day.closing}
					<div>
						<dt>退出</dt>
						<dd>{day.closing}までに会場を出ます</dd>
					</div>
				{/if}
			</dl>

			{#if day.links.length}
				<ul class="day-links" aria-label="リンクとQRコード">
					{#each day.links as link (link.url)}
						<li class="day-link" id={link.id}>
							<div class="day-link-qr" role="img" aria-label="{link.title}のQRコード">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -- ビルド時に自前で生成したSVG -->
								{@html link.qr}
							</div>
							<div class="day-link-body">
								<p class="day-link-label">{link.label}</p>
								<h2>{link.title}</h2>
								{#if link.description}<p class="day-link-desc">{link.description}</p>{/if}
								<a
									class="button button-dark button-small"
									href={link.url}
									target="_blank"
									rel="external noopener noreferrer"
								>
									{link.button ?? 'ページを開く'} <span aria-hidden="true">↗</span>
								</a>
								<p class="day-link-url">{link.display}</p>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</header>

	<div class="day-layout container">
		<aside class="day-toc" aria-labelledby="toc-title">
			<h2 id="toc-title" class="day-toc-title">タイムテーブル</h2>
			<ol>
				{#each day.slots as slot (slot.id)}
					<li class:is-now={slot.id === nowSlotId}>
						<a href="#{slot.id}" aria-current={slot.id === nowSlotId ? 'time' : undefined}>
							<span class="toc-time">{slot.start}</span>
							<span class="toc-title">{slot.title}</span>
							{#if slot.id === nowSlotId}<span class="now-badge">いまここ</span>{/if}
						</a>
					</li>
				{/each}
			</ol>
		</aside>

		<article class="day-body">
			<Content />
		</article>
	</div>
</main>
<SiteFooter />
