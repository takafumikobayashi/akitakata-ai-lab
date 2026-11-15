<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { cta } from '#lib/data/site.js';
	import BrandMark from '#lib/components/BrandMark.svelte';
	import SocialLinks from '#lib/components/SocialLinks.svelte';

	const isHome = $derived(page.url.pathname === resolve('/'));

	// 開始年から今年までを表示する（例：© 2026 / © 2026–2027）。
	// プリレンダーするページ（/day, /log）ではビルド時の年になる
	const startYear = 2026;
	const currentYear = new Date().getFullYear();
	const copyright = `© ${startYear}${currentYear > startYear ? `–${currentYear}` : ''} tariki-code`;
</script>

<footer class="site-footer">
	<div class="footer-inner container">
		<a
			class="brand"
			href={isHome ? '#top' : resolve('/')}
			aria-label={isHome ? 'ページの先頭へ' : 'あきたかたAI Lab ホーム'}
		>
			<BrandMark />
			<span class="brand-name"><span>あきたかた</span><strong><em>AI</em> Lab</strong></span>
		</a>
		<p>地域でAIを「知る・触る・つくる」コミュニティ</p>
		<SocialLinks class="footer-links" community />
		<!-- 申込受付中だけ参加フォームへのリンクを出す（それ以外はDiscordがSNS欄にある） -->
		{#if cta.isRegistration}
			<a
				class="line-link line-link-light"
				href={cta.href}
				target="_blank"
				rel="external noopener noreferrer">参加フォーム <span aria-hidden="true">↗</span></a
			>
		{/if}
		<div class="footer-bottom">
			<small>個人主催・非営利の地域コミュニティ ｜ 安芸高田市の公式事業ではありません</small>
			<small>{copyright}</small>
		</div>
	</div>
</footer>
