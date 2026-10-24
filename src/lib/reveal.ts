declare global {
	interface Window {
		__revealReady?: boolean;
	}
}

/**
 * `data-reveal` を持つ要素を、画面に入ったときにフェードインさせる。
 * 属性値はミリ秒の遅延（例: data-reveal="120"）。
 */
export function initReveal(root: ParentNode = document) {
	window.__revealReady = true;
	const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
	for (const el of targets) {
		const delay = Number(el.dataset.reveal);
		if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
	}

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduceMotion || !('IntersectionObserver' in window)) {
		for (const el of targets) el.classList.add('is-visible');
		return () => {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
	);
	for (const el of targets) observer.observe(el);
	return () => observer.disconnect();
}
