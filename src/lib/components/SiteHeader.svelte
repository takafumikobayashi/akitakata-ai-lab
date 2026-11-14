<script lang="ts">
	import { cta, event, eventOrdinal } from '#lib/data/site.js';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import BrandMark from '#lib/components/BrandMark.svelte';

	let menuOpen = $state(false);
	const close = () => (menuOpen = false);

	const sections = [
		{ id: 'about', label: 'Labについて' },
		{
			id: 'next-event',
			label: event.status === 'planning' ? '次回のLab' : eventOrdinal(event.number)
		},
		{ id: 'try-it', label: 'やってみたいこと' },
		{ id: 'values', label: '大切にしたいこと' },
		{ id: 'profile', label: '主催者' },
		{ id: 'materials', label: '資料' },
		{ id: 'community', label: 'コミュニティ' }
	];

	// トップページ以外（当日ページなど）からはトップの各セクションへ移動する
	const home = resolve('/');
	const base = $derived(page.url.pathname === home ? '' : home);
</script>

<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header" class:is-open={menuOpen}>
	<div class="header-inner container">
		<a class="brand" href={base ? home : '#top'} aria-label="あきたかたAI Lab ホーム">
			<BrandMark />
			<span class="brand-name"><span>あきたかた</span><strong><em>AI</em> Lab</strong></span>
		</a>

		<nav class="site-nav" id="site-nav" aria-label="メインナビゲーション">
			<ul>
				{#each sections as section (section.id)}
					<li>
						<!-- トップページ以外では resolve('/') を前置した base でトップのセクションへ移動する -->
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
						<a href="{base}#{section.id}" onclick={close}>{section.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="header-actions">
			<a
				class="button button-dark button-small"
				href={cta.href}
				target="_blank"
				rel="external noopener noreferrer"
			>
				<span><span class="hide-xs">{cta.shortPrefix}</span>{cta.short}</span>
				<span aria-hidden="true">↗</span>
			</a>
			<button
				class="menu-toggle"
				type="button"
				aria-expanded={menuOpen}
				aria-controls="site-nav"
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span class="menu-icon" aria-hidden="true"><i></i><i></i></span>
				<span class="sr-only">{menuOpen ? 'メニューを閉じる' : 'メニューを開く'}</span>
			</button>
		</div>
	</div>
</header>
