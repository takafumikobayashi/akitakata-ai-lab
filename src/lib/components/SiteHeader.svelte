<script lang="ts">
	import { registrationUrl } from '#lib/data/site.js';
	import BrandMark from '#lib/components/BrandMark.svelte';

	let menuOpen = $state(false);
	const close = () => (menuOpen = false);
</script>

<a class="skip-link" href="#main">本文へスキップ</a>
<header class="site-header" class:is-open={menuOpen}>
	<div class="header-inner container">
		<a class="brand" href="#top" aria-label="あきたかたAI Lab ホーム">
			<BrandMark />
			<span class="brand-name"><span>あきたかた</span><strong><em>AI</em> Lab</strong></span>
		</a>

		<nav class="site-nav" id="site-nav" aria-label="メインナビゲーション">
			<ul>
				<li><a href="#about" onclick={close}>Labについて</a></li>
				<li><a href="#next-event" onclick={close}>第1回</a></li>
				<li><a href="#try-it" onclick={close}>やってみたいこと</a></li>
				<li><a href="#values" onclick={close}>大切にしたいこと</a></li>
				<li><a href="#profile" onclick={close}>主催者</a></li>
				<li><a href="#materials" onclick={close}>資料</a></li>
			</ul>
		</nav>

		<div class="header-actions">
			<a
				class="button button-dark button-small"
				href={registrationUrl}
				target="_blank"
				rel="external noopener noreferrer"
			>
				<span><span class="hide-xs">11/8に</span>参加する</span> <span aria-hidden="true">↗</span>
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
