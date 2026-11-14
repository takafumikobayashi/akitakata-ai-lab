import { error } from '@sveltejs/kit';
import { findLabLog, labLogs } from '#lib/content/lab-log.js';
import type { EntryGenerator, PageLoad } from './$types';

// Markdownから作る静的なページなので、ビルド時にHTMLとして書き出す
export const prerender = true;

export const entries: EntryGenerator = () => labLogs.map((log) => ({ slug: log.slug }));

export const load: PageLoad = ({ params }) => {
	const log = findLabLog(params.slug);
	if (!log) error(404, 'ページが見つかりません');
	return { log };
};
