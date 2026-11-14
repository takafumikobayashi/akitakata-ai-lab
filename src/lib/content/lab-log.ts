import type { Component } from 'svelte';

// Lab Log（活動の記録）の元データ。src/content/lab-log/<slug>.md を追加すると /log/<slug> のページになる

export type LabLogMeta = {
	title: string;
	date: string; // YYYY-MM-DD（日本時間）
	summary: string;
	tags?: string[];
	event?: string; // 開催回の記録なら回番号（'01' など）。トップの「これまでのLab」からリンクする
};

export type LabLog = LabLogMeta & {
	slug: string;
	dateLabel: string;
	content: Component;
};

// '2026-11-08' → '2026年11月8日'
const toDateLabel = (date: string) => {
	const [y, m, d] = date.split('-').map(Number);
	return `${y}年${m}月${d}日`;
};

const modules = import.meta.glob<{ default: Component; metadata: LabLogMeta }>(
	['/src/content/lab-log/*.md', '!/src/content/lab-log/README.md'],
	{ eager: true }
);

// 新しい順
export const labLogs: LabLog[] = Object.entries(modules)
	.map(([path, mod]) => ({
		...mod.metadata,
		slug: path.split('/').pop()!.replace(/\.md$/, ''),
		dateLabel: toDateLabel(mod.metadata.date),
		content: mod.default
	}))
	.sort((a, b) => b.date.localeCompare(a.date));

export const findLabLog = (slug: string) => labLogs.find((log) => log.slug === slug);

export const findEventLog = (number: string) => labLogs.find((log) => log.event === number);
