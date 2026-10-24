<script lang="ts">
	import type { Slide } from '#lib/data/site.js';

	let { slides, ratio, title }: { slides: Slide[]; ratio: string; title: string } = $props();

	let index = $state(0);
	let isFullscreen = $state(false);
	let root = $state<HTMLElement>();
	let thumbStrip = $state<HTMLElement>();
	let pointerStartX: number | null = null;

	const total = $derived(slides.length);
	const current = $derived(slides[index]);

	function go(i: number) {
		index = Math.max(0, Math.min(total - 1, i));
	}

	// 前後のスライドを先読みし、サムネイル列を現在位置までスクロールする
	$effect(() => {
		for (const i of [index + 1, index - 1]) {
			const slide = slides[i];
			if (slide) new Image().src = slide.src;
		}
		const thumb = thumbStrip?.querySelector<HTMLElement>(`[data-index="${index}"]`);
		if (thumbStrip && thumb) {
			const left = thumb.offsetLeft - thumbStrip.clientWidth / 2 + thumb.clientWidth / 2;
			thumbStrip.scrollTo({ left, behavior: 'smooth' });
		}
	});

	function onKeydown(event: KeyboardEvent) {
		if (event.target instanceof HTMLInputElement) return;
		const actions: Record<string, () => void> = {
			ArrowRight: () => go(index + 1),
			ArrowLeft: () => go(index - 1),
			Home: () => go(0),
			End: () => go(total - 1)
		};
		const action = actions[event.key];
		if (!action) return;
		event.preventDefault();
		action();
	}

	function onPointerDown(event: PointerEvent) {
		pointerStartX = event.clientX;
	}

	// スワイプで前後へ。スワイプでないクリックは左1/3なら前へ、それ以外は次へ
	function onPointerUp(event: PointerEvent) {
		if (pointerStartX === null) return;
		const dx = event.clientX - pointerStartX;
		pointerStartX = null;
		if (Math.abs(dx) > 40) {
			go(dx < 0 ? index + 1 : index - 1);
			return;
		}
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		go(event.clientX - rect.left < rect.width / 3 ? index - 1 : index + 1);
	}

	function toggleFullscreen() {
		if (document.fullscreenElement) document.exitFullscreen();
		else root?.requestFullscreen?.();
	}
</script>

<svelte:document onfullscreenchange={() => (isFullscreen = document.fullscreenElement === root)} />

<!-- キーボード操作を受けるカルーセル領域のため、フォーカス可能なsectionにしている -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<section
	class="viewer"
	class:is-fullscreen={isFullscreen}
	bind:this={root}
	style:--ratio={ratio}
	aria-roledescription="スライド"
	aria-label={title}
	tabindex="0"
	onkeydown={onKeydown}
>
	<div class="viewer-stage">
		<button
			type="button"
			class="viewer-frame"
			aria-label="次のスライドへ（左側をクリックすると前へ）"
			onpointerdown={onPointerDown}
			onpointerup={onPointerUp}
		>
			{#key index}
				<img
					src={current.src}
					srcset={current.srcSmall ? `${current.srcSmall} 960w, ${current.src} 1920w` : undefined}
					sizes={current.srcSmall ? '(max-width: 1000px) 100vw, 1440px' : undefined}
					alt={current.alt}
					draggable="false"
				/>
			{/key}
		</button>
	</div>

	<div class="viewer-progress" aria-hidden="true">
		<span style:width={`${((index + 1) / total) * 100}%`}></span>
	</div>

	<div class="viewer-controls">
		<button
			type="button"
			class="viewer-btn"
			onclick={() => go(index - 1)}
			disabled={index === 0}
			aria-label="前のスライド">←</button
		>
		<p class="viewer-count" aria-live="polite">
			<strong>{index + 1}</strong><span>/</span>{total}
		</p>
		<button
			type="button"
			class="viewer-btn"
			onclick={() => go(index + 1)}
			disabled={index === total - 1}
			aria-label="次のスライド">→</button
		>
		<input
			class="viewer-scrub"
			type="range"
			min="1"
			max={total}
			value={index + 1}
			oninput={(e) => go(Number(e.currentTarget.value) - 1)}
			aria-label="スライドの位置"
		/>
		<button
			type="button"
			class="viewer-btn viewer-btn-wide"
			onclick={toggleFullscreen}
			aria-pressed={isFullscreen}
		>
			{isFullscreen ? '閉じる' : '全画面'}
		</button>
	</div>

	{#if total > 1}
		<ol class="viewer-thumbs" bind:this={thumbStrip}>
			{#each slides as slide, i (slide.src)}
				<li>
					<button
						type="button"
						data-index={i}
						class:is-current={i === index}
						aria-current={i === index ? 'true' : undefined}
						aria-label={`${i + 1}枚目を表示`}
						onclick={() => go(i)}
					>
						<img src={slide.thumb} alt="" loading="lazy" />
						<span>{i + 1}</span>
					</button>
				</li>
			{/each}
		</ol>
	{/if}
</section>
