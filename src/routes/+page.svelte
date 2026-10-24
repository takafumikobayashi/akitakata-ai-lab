<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import BrandMark from '#lib/components/BrandMark.svelte';
	import SlideViewer from '#lib/components/SlideViewer.svelte';
	import SocialLinks from '#lib/components/SocialLinks.svelte';
	import {
		decks,
		event,
		ideas,
		organizerHistory,
		registrationUrl,
		relatedLinks,
		values
	} from '#lib/data/site.js';
	import { initReveal } from '#lib/reveal.js';

	let deckId = $state(decks[0].id);
	const deck = $derived(decks.find((d) => d.id === deckId) ?? decks[0]);

	// OGP画像は絶対URLが必要なため、公開先のドメインから組み立てる
	const ogImage = $derived(new URL('/images/ogp.jpg', page.url.origin).href);

	onMount(() => initReveal());
</script>

<svelte:head>
	<title>あきたかたAI Lab | AIを、地域の誰もが使える力にする。</title>
	<meta
		name="description"
		content="安芸高田でAIを知る・触る・つくる。地域の人たちと一緒に試して育てる、個人主催の非営利コミュニティです。第1回は2026年11月8日。"
	/>
	<meta property="og:title" content="あきたかたAI Lab" />
	<meta
		property="og:description"
		content="AIを、地域の誰もが使える力にする。安芸高田で、みんなで試してみるコミュニティ。"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="あきたかたAI Lab" />
	<meta property="og:locale" content="ja_JP" />
	<meta property="og:url" content={page.url.origin + page.url.pathname} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta
		property="og:image:alt"
		content="あきたかたAI Lab。AIを、地域の誰もが使える力にする。田園風景のスケッチに点と線のネットワーク"
	/>
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<SiteHeader />
<main id="main">
	<!-- Hero -->
	<section id="top" class="hero">
		<div class="container">
			<div class="hero-grid">
				<h1 class="hero-wordmark" data-reveal="80">
					<span class="wordmark-ja">あきたかた</span>
					<span class="wordmark-en"><em>AI</em> Lab</span>
				</h1>
				<div class="hero-copy">
					<p class="hero-statement" data-reveal="200">
						AIを、地域の<wbr />誰もが<wbr />使える力に<wbr />する。
					</p>
					<p class="hero-sub" data-reveal="280">
						地域でAIを「知る・触る・つくる」コミュニティ。<br class="pc-only" />
						詳しくなくても大丈夫。まずは小さく、一緒に試してみましょう。
					</p>
					<div class="hero-actions" data-reveal="360">
						<a
							class="button button-dark"
							href={registrationUrl}
							target="_blank"
							rel="external noopener noreferrer"
						>
							第1回に申し込む <span aria-hidden="true">↗</span>
						</a>
						<a class="line-link" href="#about">もっと詳しく <span aria-hidden="true">↓</span></a>
					</div>
				</div>
			</div>

			<figure class="hero-visual" data-reveal="120">
				<img
					src="/images/hero-sketch-2048.webp"
					srcset="/images/hero-sketch-1024.webp 1024w, /images/hero-sketch-2048.webp 2048w"
					sizes="(max-width: 1520px) 100vw, 1440px"
					width="2048"
					height="768"
					alt="水彩スケッチ：夏の青空と入道雲の下、山のふもとに瓦屋根の家並みと青々とした田んぼが広がる里山の風景"
					fetchpriority="high"
				/>
				<span class="visual-label" aria-hidden="true">EST. 2026</span>
				<a class="hero-badge" href="#next-event">
					<strong>#01</strong>
					<span>11.08 SUN</span>
					<small>参加受付中</small>
				</a>
				<figcaption>安芸高田の山あいから、AIをみんなで試す。</figcaption>
			</figure>

			<div class="meta-row hero-foot">
				<span class="hero-steps"
					>知る<i aria-hidden="true"></i>触る<i aria-hidden="true"></i>つくる</span
				>
				<a href="#about" class="scroll-cue">Scroll <span aria-hidden="true">↓</span></a>
			</div>
		</div>
	</section>

	<!-- About -->
	<section id="about" class="section" aria-labelledby="about-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">ABOUT<span>Labについて</span></p>
			</div>
			<div class="split">
				<div>
					<h2 id="about-title" class="display" data-reveal>
						AIは、一部の<wbr />詳しい人だけの<wbr />ものでは<wbr /><span class="marker"
							>ありません。</span
						>
					</h2>
				</div>
				<div class="body-copy" data-reveal="120">
					<p class="lead">
						あきたかたAI
						Labは、AIに興味のある地域の人が集まり、実際に触りながら「こんなことできる？」「これを試してみたい！」を一緒にやってみる場です。
					</p>
					<p>
						完成した講座やスクールではありません。まずは10人くらいから始めて、参加する皆さんの「やってみたい」を聞きながら、一緒に育てていきます。うまくいったことも、つまずいたことも持ち寄りながら、このまちに合うAIの使い方を探します。
					</p>
					<dl class="stats">
						<div>
							<dt>はじまり</dt>
							<dd>2026<small>.11</small></dd>
						</div>
						<div>
							<dt>まずは</dt>
							<dd>10<small>人くらい</small></dd>
						</div>
						<div>
							<dt>参加条件</dt>
							<dd>不問<small>年齢・職業・AI経験</small></dd>
						</div>
					</dl>
					<p class="notice">
						<span aria-hidden="true">✳</span>
						<span
							><strong>個人主催・非営利の活動です。</strong
							>安芸高田市の公式事業・イベントではありません。</span
						>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Event -->
	<section id="next-event" class="section section-dark" aria-labelledby="event-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">FIRST LAB<span>第1回のご案内</span></p>
			</div>
			<div class="event-grid">
				<div class="event-main">
					<p class="event-tag" data-reveal><span>#01</span>体験ワークショップ</p>
					<h2 id="event-title" class="display" data-reveal="80">
						AIって、<wbr />どんなことが<wbr />できるの？
					</h2>
					<div class="event-date" data-reveal="160">
						<time datetime={event.isoDate}>
							<span class="date-year">{event.year}</span>
							<strong>{event.monthDay}</strong>
							<span class="date-week">{event.weekday}</span>
						</time>
						<p>{event.startTime}<span>—</span>{event.endTime}<small>{event.cleanup}</small></p>
					</div>
					<div class="event-program" data-reveal="220">
						<h3>今回の内容（予定）</h3>
						<ul>
							{#each event.program as item (item)}
								<li>{item}</li>
							{/each}
						</ul>
					</div>
				</div>

				<div class="event-side" data-reveal="140">
					<dl class="event-details">
						<div>
							<dt>会場</dt>
							<dd>
								{event.venue}
								<small
									>{event.address}
									<a href={event.mapUrl} target="_blank" rel="external noopener noreferrer"
										>地図 ↗</a
									></small
								>
							</dd>
						</div>
						<div>
							<dt>参加費</dt>
							<dd>{event.fee}<small>{event.feeNote}</small></dd>
						</div>
						<div>
							<dt>定員</dt>
							<dd>{event.capacity}</dd>
						</div>
						<div>
							<dt>対象</dt>
							<dd>{event.audience}<small>どなたでも参加できます。</small></dd>
						</div>
						<div>
							<dt>持ち物</dt>
							<dd>{event.bring}<small>{event.bringNote}</small></dd>
						</div>
						<div>
							<dt>申込締切</dt>
							<dd>{event.deadline}</dd>
						</div>
					</dl>
					<a
						class="button button-yellow button-block"
						href={registrationUrl}
						target="_blank"
						rel="external noopener noreferrer"
					>
						参加を申し込む（Googleフォーム） <span aria-hidden="true">↗</span>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Ideas -->
	<section id="try-it" class="section" aria-labelledby="ideas-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">THINGS TO TRY<span>やってみたいこと</span></p>
			</div>
			<div class="split split-head">
				<h2 id="ideas-title" class="display" data-reveal>
					こんなことを、<wbr />一緒に<wbr />やってみませんか？
				</h2>
				<p class="sec-aside" data-reveal="100">
					ここにあるのはアイデアの一例です。第1回ですべてを行うわけではありません。参加した人の「これやってみたい」から、次のLabのテーマが生まれます。
				</p>
			</div>
			<div class="ideas-grid">
				{#each ideas as idea, i (idea.number)}
					<article class="idea" data-reveal={(i % 3) * 90}>
						<img class="idea-icon" src={idea.illustration} alt="" loading="lazy" />
						<p class="idea-label"><span>{idea.number}</span>{idea.label}</p>
						<h3>{idea.title}</h3>
						<p class="idea-body">{idea.body}</p>
					</article>
				{/each}
			</div>
		</div>
	</section>

	<!-- Values -->
	<section id="values" class="section section-tint" aria-labelledby="values-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">OUR VALUES<span>大切にしたいこと</span></p>
			</div>
			<div class="split split-head">
				<h2 id="values-title" class="display" data-reveal>
					正解を教わる場所ではなく、<wbr />一緒に<wbr />発見していく場所。
				</h2>
				<p class="sec-aside" data-reveal="100">
					あきたかたAI
					Labで大切にしたい、5つの姿勢です。教える人・教わる人に分かれず、全員が試す側として参加します。
				</p>
			</div>
			<ol class="values-list">
				{#each values as value, i (value.number)}
					<li class={`value tone-${value.tone}`} data-reveal={i * 70}>
						<span class="value-num">{value.number}</span>
						<h3>{value.title}</h3>
						<p>{value.text}</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- Organizer -->
	<section id="profile" class="section" aria-labelledby="profile-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">ORGANIZER<span>主催者について</span></p>
			</div>
			<div class="profile-grid">
				<figure class="profile-visual" data-reveal>
					<img
						src="/images/organizer.webp"
						width="357"
						height="357"
						alt="小林崇文。ノートパソコンを前に、頬に手を当てて笑顔で座っている"
						loading="lazy"
					/>
					<figcaption>
						AIを、地域でもっと身近に、<br />もっと面白く。<br /><span class="marker"
							>一緒にやってみましょう！</span
						>
					</figcaption>
				</figure>
				<div class="profile-copy" data-reveal="120">
					<h2 id="profile-title" class="profile-name">
						小林 崇文<small>こばやし たかふみ</small>
					</h2>
					<p class="profile-role">あきたかたAI Lab 主催</p>
					<SocialLinks class="profile-links" />
					<div class="body-copy">
						<p>
							これまで民間企業でのIT・デジタル分野の仕事や、国の行政機関でのプロジェクト推進に携わってきました。個人でもNPOなどのIT活用支援を行ってきました。2026年3月から安芸高田市に単身赴任し、この町でのご縁をきっかけに、このLabを始めます。
						</p>
						<p>
							AIの先生として教えるというより、私自身も皆さんと一緒に試して、発見していきたいと思っています。
						</p>
					</div>
					<ul class="history">
						{#each organizerHistory as item (item)}
							<li>{item}</li>
						{/each}
					</ul>
					<p class="notice notice-quiet">
						<span aria-hidden="true">i</span>
						<span
							>あきたかたAI Labは個人活動であり、安芸高田市の公式事業・イベントではありません。</span
						>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Materials -->
	<section id="materials" class="section section-tint" aria-labelledby="materials-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">MATERIALS<span>資料</span></p>
			</div>
			<div class="split split-head">
				<h2 id="materials-title" class="display" data-reveal>
					Labの構想を、<wbr />スライドで<wbr />見てみる。
				</h2>
				<p class="sec-aside" data-reveal="100">
					あきたかたAI
					Labを始めるにあたってまとめた企画案と、第1回のチラシです。矢印キーやスワイプでめくれます。
				</p>
			</div>
			<div class="deck-tabs" role="tablist" aria-label="資料の切り替え" data-reveal>
				{#each decks as d (d.id)}
					<button
						type="button"
						role="tab"
						id={`deck-tab-${d.id}`}
						aria-selected={d.id === deckId}
						aria-controls="deck-panel"
						onclick={() => (deckId = d.id)}
					>
						{d.label}<span>{d.slides.length}</span>
					</button>
				{/each}
			</div>
			<div id="deck-panel" role="tabpanel" aria-labelledby={`deck-tab-${deck.id}`} data-reveal="80">
				{#key deck.id}
					<SlideViewer slides={deck.slides} ratio={deck.ratio} title={deck.title} />
				{/key}
			</div>
		</div>
	</section>

	<!-- Links -->
	<section id="links" class="section" aria-labelledby="links-title">
		<div class="container">
			<div class="sec-head" data-reveal>
				<p class="sec-label">LINKS<span>関連リンク</span></p>
			</div>
			<div class="split split-head">
				<h2 id="links-title" class="display" data-reveal>もっと知りたい人へ。</h2>
				<p class="sec-aside" data-reveal="100">
					AIやITの活用について、主催者が発信しているサイトです。Labで試すことのヒントにもなれば。
				</p>
			</div>
			<ul class="link-cards">
				{#each relatedLinks as link, i (link.url)}
					<li data-reveal={(i % 3) * 90}>
						<a href={link.url} target="_blank" rel="external noopener noreferrer">
							<div class="link-card-media">
								<img src={link.image} alt="" width="800" height="420" loading="lazy" />
							</div>
							<div class="link-card-body">
								<p class="link-card-label">{link.label}</p>
								<h3>{link.title}</h3>
								<p class="link-card-desc">{link.description}</p>
								<p class="link-card-url">
									{new URL(link.url).hostname}<span aria-hidden="true">↗</span>
								</p>
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Archive -->
	<section class="section section-compact" aria-label="活動の記録とナレッジ">
		<div class="container">
			<div class="archive-grid">
				<article id="lab-log" class="archive" data-reveal>
					<p class="sec-label">LAB LOG<span>活動の記録</span></p>
					<h2>試したことを、記録する。</h2>
					<p>
						やったこと、使ったAI、分かったこと、次に試したいこと。成功も失敗も、地域の実験ノートとして残していきます。
					</p>
					<span class="archive-status">第1回の開催後から公開します</span>
				</article>
				<article id="knowledge" class="archive" data-reveal="100">
					<p class="sec-label">KNOWLEDGE<span>ナレッジ</span></p>
					<h2>分かったことを、次の人へ。</h2>
					<p>
						AIの使い方やプロンプト、地域で気づいたことを、初めての人にも伝わる形で少しずつまとめます。
					</p>
					<span class="archive-status">記事は活動に合わせて追加します</span>
				</article>
			</div>
		</div>
	</section>

	<!-- Join -->
	<section id="join" class="join" aria-labelledby="join-title">
		<div class="join-inner container">
			<p class="sec-label" data-reveal>YOUR IDEA MAKES THE NEXT LAB</p>
			<h2 id="join-title" data-reveal="80">
				あなたなら、AIで<br /><span class="marker">何をやってみたい</span>ですか？
			</h2>
			<p class="join-lead" data-reveal="160">
				「ちょっと気になる」くらいからで大丈夫。<br />第1回のLabで、一緒に話してみませんか。
			</p>
			<div class="join-actions" data-reveal="220">
				<a
					class="button button-dark button-large"
					href={registrationUrl}
					target="_blank"
					rel="external noopener noreferrer"
				>
					第1回に参加する <span aria-hidden="true">↗</span>
				</a>
				<p>{event.date} {event.startTime}–{event.endTime} ／ {event.venue}</p>
			</div>
		</div>
		<img
			class="join-photo"
			src="/images/school-sketch-2048.webp"
			srcset="/images/school-sketch-1024.webp 1024w, /images/school-sketch-2048.webp 2048w"
			sizes="100vw"
			width="2048"
			height="768"
			alt="水彩スケッチ：緑の山々を背に、赤い屋根の木造校舎と広い校庭、手前にラベンダーが咲く風景"
			loading="lazy"
		/>
	</section>
</main>

<footer class="site-footer">
	<div class="footer-inner container">
		<a class="brand" href="#top" aria-label="ページの先頭へ">
			<BrandMark />
			<span class="brand-name"><span>あきたかた</span><strong><em>AI</em> Lab</strong></span>
		</a>
		<p>地域でAIを「知る・触る・つくる」コミュニティ</p>
		<SocialLinks class="footer-links" />
		<a
			class="line-link line-link-light"
			href={registrationUrl}
			target="_blank"
			rel="external noopener noreferrer">参加フォーム <span aria-hidden="true">↗</span></a
		>
		<div class="footer-bottom">
			<small>個人主催・非営利の地域コミュニティ ｜ 安芸高田市の公式事業ではありません</small>
			<small>Copyright © tariki-code All rights reserved.</small>
		</div>
	</div>
</footer>
