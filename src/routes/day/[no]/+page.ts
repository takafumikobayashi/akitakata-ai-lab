import { error } from '@sveltejs/kit';
import { days, findDay } from '#lib/content/days.js';
import type { EntryGenerator, PageLoad } from './$types';

// Markdownから作る静的なページなので、ビルド時にHTMLとして書き出す
export const prerender = true;

export const entries: EntryGenerator = () => days.map((d) => ({ no: d.number }));

export const load: PageLoad = ({ params }) => {
	const day = findDay(params.no);
	if (!day) error(404, 'ページが見つかりません');
	return { day };
};
