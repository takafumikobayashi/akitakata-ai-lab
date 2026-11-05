// 当日ページのMarkdownで「## 14:00〜14:20｜はじめに」の形の見出しを時間枠として扱う。
// rehypeプラグイン（ビルド時）と目次の生成（ページ側）の両方で同じ規則を使う。

export const SLOT_HEADING = /^(\d{1,2}:\d{2})\s*[〜~–-]\s*(\d{1,2}:\d{2})\s*[｜|]\s*(.+)$/;

export type Slot = { id: string; start: string; end: string; title: string };

export const slotId = (start: string) => `t${start.replace(':', '').padStart(4, '0')}`;

/** Markdown本文から時間枠の見出しを順に取り出す */
export function parseSlots(markdown: string): Slot[] {
	return markdown
		.split('\n')
		.filter((line) => line.startsWith('## '))
		.map((line) => line.slice(3).trim().match(SLOT_HEADING))
		.filter((m): m is RegExpMatchArray => m !== null)
		.map(([, start, end, title]) => ({ id: slotId(start), start, end, title: title.trim() }));
}

// ---- rehype プラグイン ----
// 時間枠の見出しから次の区切り（--- または時間枠でない ## 見出し）までを
// <section class="slot" id="t1400" data-start data-end> で囲み、
// 見出しの時刻とタイトルを別々の要素に分けて装飾しやすくする。

type HastNode = {
	type: string;
	tagName?: string;
	value?: string;
	properties?: Record<string, unknown>;
	children?: HastNode[];
};

const textOf = (node: HastNode): string =>
	node.type === 'text' ? (node.value ?? '') : (node.children ?? []).map(textOf).join('');

const el = (
	tagName: string,
	properties: Record<string, unknown>,
	children: HastNode[]
): HastNode => ({ type: 'element', tagName, properties, children });

const text = (value: string): HastNode => ({ type: 'text', value });

export function rehypeTimetable() {
	return (tree: HastNode) => {
		const out: HastNode[] = [];
		let slot: HastNode | null = null;

		for (const node of tree.children ?? []) {
			const isH2 = node.type === 'element' && node.tagName === 'h2';
			const isHr = node.type === 'element' && node.tagName === 'hr';
			const match = isH2 ? textOf(node).trim().match(SLOT_HEADING) : null;

			if (match) {
				const [, start, end, title] = match;
				slot = el(
					'section',
					{ className: ['slot'], id: slotId(start), dataStart: start, dataEnd: end },
					[
						el('h2', { className: ['slot-heading'] }, [
							el('span', { className: ['slot-time'] }, [
								el('time', {}, [text(start)]),
								el('span', { className: ['slot-sep'], ariaHidden: 'true' }, [text('–')]),
								el('time', {}, [text(end)])
							]),
							el('span', { className: ['slot-title'] }, [text(title.trim())])
						])
					]
				);
				out.push(slot);
				continue;
			}
			if (slot && (isH2 || isHr)) {
				slot = null;
				if (isHr) continue; // 時間枠の区切り線は枠の罫線で表現する
			}
			(slot?.children ?? out).push(node);
		}
		tree.children = out;
	};
}
