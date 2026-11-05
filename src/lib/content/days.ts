import type { Component } from 'svelte';
import { renderSVG } from 'uqr';
import { parseSlots, type Slot } from '#lib/markdown/timetable.js';
import { siteOrigin } from '#lib/data/site.js';

// 当日ページ（/day/01 など）の元データ。src/content/day/<回>.md を追加すると自動でページになる

export type DayMeta = {
	number: string;
	title: string;
	theme: string;
	date: string; // YYYY-MM-DD（日本時間）
	dateLabel: string;
	start: string;
	end: string;
	venue: string;
	closing?: string;
	description?: string;
	links?: DayLink[];
};

export type DayLink = {
	label: string;
	title: string;
	description?: string;
	url: string;
	button?: string; // ボタンの文言（省略時は「ページを開く」）
	id?: string; // 本文から [ページ上部](#id) のようにリンクするためのアンカー
};

export type Day = DayMeta & {
	slots: Slot[];
	content: Component;
	links: (DayLink & { qr: string; display: string })[];
};

// QRコードはこちらで生成したSVG文字列（{@html} で埋め込む）。読み取りやすいよう余白を4マス取る
const toQr = (url: string) =>
	renderSVG(url, { border: 4, pixelSize: 1, whiteColor: '#ffffff', blackColor: '#15181e' });

// このサイト宛てのQRコードにだけUTMを付け、GA4で「当日のQRコードから来た人」を区別できるようにする。
// ボタンや表示用のURLには付けない（ページ内のクリックはQR経由として数えない）。外部サイトは自分のGA4で集計できないため付けない
const qrTarget = (url: string, number: string) => {
	const target = new URL(url);
	if (target.origin !== siteOrigin) return url;
	target.searchParams.set('utm_source', `day${number}`);
	target.searchParams.set('utm_medium', 'qr');
	target.searchParams.set('utm_campaign', `lab${number}`);
	return target.href;
};

const displayUrl = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const modules = import.meta.glob<{ default: Component; metadata: DayMeta }>(
	'/src/content/day/*.md',
	{ eager: true }
);
const sources = import.meta.glob<string>('/src/content/day/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export const days: Day[] = Object.entries(modules)
	.map(([path, mod]) => ({
		...mod.metadata,
		slots: parseSlots(sources[path]),
		links: (mod.metadata.links ?? []).map((link) => ({
			...link,
			qr: toQr(qrTarget(link.url, mod.metadata.number)),
			display: displayUrl(link.url)
		})),
		content: mod.default
	}))
	.sort((a, b) => a.number.localeCompare(b.number));

export const findDay = (number: string) => days.find((d) => d.number === number);
