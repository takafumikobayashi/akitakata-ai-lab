declare global {
	interface Window {
		dataLayer: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

// gtag.js を非同期で読み込み、ページビューを送信する
export function initAnalytics(measurementId: string) {
	if (!measurementId || window.gtag) return;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function () {
		// gtag.js は arguments オブジェクトのまま受け取る前提のため、残余引数にしない
		// eslint-disable-next-line prefer-rest-params
		window.dataLayer.push(arguments);
	};
	window.gtag('js', new Date());
	window.gtag('config', measurementId);

	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
	document.head.appendChild(script);
}
