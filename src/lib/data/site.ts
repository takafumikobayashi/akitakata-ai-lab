// 公開サイトのオリジン。当日ページのQRコードでUTMを付けるかどうかの判定に使う
export const siteOrigin = 'https://ailab.akitaka-note.jp';

// Google Analytics 4 の測定ID（例: 'G-XXXXXXXXXX'）。空欄の間は読み込まない
export const gaMeasurementId = 'G-JGJQ2QH7JC';

// 日程・会場・申込方法まで決まった回の情報
export type EventDetails = {
	number: string;
	format: string;
	title: string;
	date: string;
	isoDate: string;
	year: string;
	monthDay: string;
	weekday: string;
	startTime: string;
	endTime: string;
	cleanup: string;
	venue: string;
	address: string;
	mapUrl: string;
	capacity: string;
	fee: string;
	feeNote: string;
	audience: string;
	bring: string;
	bringNote: string;
	deadline: string;
	program: string[];
	registrationUrl: string;
	// src/content/day/<number>.md の当日ページがあるとき true
	hasDayPage?: boolean;
};

// 次回の状態。
// planning: 日程未定（Discordでのお知らせへ誘導）
// open:     申込受付中（申込フォームへ誘導）
// closed:   申込締切後〜開催まで（Discordへ誘導し、日程だけ表示）
// 開催が終わったら pastEvents の先頭に移し、event を次の回の planning にする
export type LabEvent =
	| { status: 'planning'; number: string; note: string; themes: string[] }
	| ({ status: 'open' | 'closed' } & EventDetails);

// 宣言時の値で型が絞り込まれないよう、関数を通して LabEvent 型のまま扱う
const defineEvent = (e: LabEvent): LabEvent => e;

export const event = defineEvent({
	status: 'planning',
	number: '02',
	note: '日程と会場は、決まり次第このサイトとDiscordでお知らせします。',
	// 第1回の振り返りで出た「次にやってみたいこと」など。空の間は表示しない
	themes: [
		'地域イベントの広報を、紙とWebの両方で',
		'ファッション以外のジャンルのデザイン',
		'組み合わせて良いものを作るコツの共有',
		'「AIでこんなこともできる」のアイデア集め'
	]
});

// これまでに開催した回（新しい順）
export const pastEvents: EventDetails[] = [
	{
		number: '01',
		format: '体験ワークショップ',
		title: 'AIって、どんなことができるの？',
		date: '2026年11月8日（日）',
		isoDate: '2026-11-08',
		year: '2026',
		monthDay: '11.08',
		weekday: 'SUN',
		startTime: '14:00',
		endTime: '16:30',
		cleanup: '17:00完全撤収予定',
		venue: '安芸高田市民文化センター 研修室402',
		address: '広島県安芸高田市吉田町吉田761番地',
		mapUrl:
			'https://www.google.com/maps/search/?api=1&query=%E5%AE%89%E8%8A%B8%E9%AB%98%E7%94%B0%E5%B8%82%E6%B0%91%E6%96%87%E5%8C%96%E3%82%BB%E3%83%B3%E3%82%BF%E3%83%BC',
		capacity: '10名程度（先着順）',
		fee: '一般 1,000円程度 ／ 学生 無料〜500円程度',
		feeNote: '会場費・備品・飲み物等の実費相当です。',
		audience: '年齢・職業・AI経験 不問',
		bring: 'ノートパソコン（推奨）',
		bringNote: 'スマートフォンでも参加できますが、パソコンがあるとより楽しめます。',
		deadline: '2026年11月7日（土）',
		program: [
			'ChatGPTなどの生成AIを実際に使ってみる',
			'文章づくり・画像づくりなど、身近な例を体験',
			'仕事・地域活動・暮らしでの使い方を考えてみる',
			'参加者同士でのアイデア共有・交流'
		],
		registrationUrl:
			'https://docs.google.com/forms/d/e/1FAIpQLSfka7pzpEoN9E6muGtRFjmdB6xK48uEpczj6hvJoLDozqRH4A/viewform',
		hasDayPage: true
	}
];

// 「第2回」のような回の呼び方
export const eventOrdinal = (number: string) => `第${Number(number)}回`;

export const ideas = [
	{
		number: '01',
		label: '地域のこと',
		title: 'まちのお知らせを、わかりやすく。',
		body: 'チラシや回覧板、SNS投稿など、地域の情報をAIと一緒に伝わる形にしてみる。',
		illustration: '/images/idea-notice.svg'
	},
	{
		number: '02',
		label: '写真・画像',
		title: '写真や画像で、表現してみる。',
		body: '身近な風景やアイデアから、画像づくりの可能性を試してみる。',
		illustration: '/images/idea-photo.svg'
	},
	{
		number: '03',
		label: '安芸高田を発信',
		title: '神楽や地域の魅力を、外へ。',
		body: '神楽・観光・地域の魅力を、AIと一緒に紹介する方法を考える。',
		illustration: '/images/idea-kagura.svg'
	},
	{
		number: '04',
		label: '仕事・暮らし',
		title: 'いつもの作業を、少し楽に。',
		body: '文書・資料・Excelなど、身近な仕事でAIを使う方法を試してみる。',
		illustration: '/images/idea-work.svg'
	},
	{
		number: '05',
		label: 'つくる',
		title: 'Webやアプリを形にする。',
		body: '「こんなのがあったらいいな」を、小さな仕組みや道具にしてみる。',
		illustration: '/images/idea-build.svg'
	},
	{
		number: '06',
		label: 'AIを知る',
		title: '最新のAIに、まず触れてみる。',
		body: '新しく登場したAIや技術を、みんなで実験してみる。',
		illustration: '/images/idea-ai.svg'
	}
];

export const values = [
	{
		number: '01',
		title: 'まず、触ってみる',
		text: '詳しくなくても大丈夫。話を聞くだけで終わらず、まず自分の手でAIを使ってみる。',
		tone: 'coral'
	},
	{
		number: '02',
		title: '一緒に、作ってみる',
		text: '先生と生徒ではなく、知っている人も初めての人も一緒に手を動かす。',
		tone: 'green'
	},
	{
		number: '03',
		title: '新しいものを、面白がる',
		text: '「これ何に使えるだろう？」から実験を始める。',
		tone: 'blue'
	},
	{
		number: '04',
		title: '地域で、活かしてみる',
		text: '仕事・商売・教育・地域活動・暮らしにつなげてみる。',
		tone: 'orange'
	},
	{
		number: '05',
		title: '外へ、発信する',
		text: '安芸高田での実験や成果を共有し、地域の外ともつながる。',
		tone: 'violet'
	}
];

// 主催者のSNS。url が空のものはページに表示しない
// コミュニティのDiscordサーバー（申請制）
export const discord = {
	url: 'https://discord.gg/Ep2z8kcucX',
	uses: [
		{
			title: '情報交換',
			body: '気になったAIのツールやニュース、使い方のコツを気軽に共有します。'
		},
		{
			title: '「やってみた」の共有',
			body: '試したこと、できたもの、うまくいかなかったことも、見せ合える場所です。'
		},
		{
			title: '質問・相談',
			body: '「これってAIでできる？」「ここで詰まった」を、みんなで考えます。'
		},
		{
			title: '次のLabのお知らせ',
			body: '開催のご案内や、次にやってみたいテーマの相談をします。'
		}
	]
};

// ヘッダー・ヒーロー・ページ末尾などの主ボタン。
// 受付中は申込フォーム、それ以外は次回のお知らせを受け取れるDiscordへ
export const cta =
	event.status === 'open'
		? {
				href: event.registrationUrl,
				label: `${eventOrdinal(event.number)}に申し込む`,
				shortPrefix: `${event.isoDate.slice(5).split('-').map(Number).join('/')}に`,
				short: '参加する',
				isRegistration: true
			}
		: {
				href: discord.url,
				label: 'Discordで次回のお知らせを受け取る',
				shortPrefix: 'Discordで',
				short: 'お知らせを受け取る',
				isRegistration: false
			};

// ヒーローのバッジやナビに出す、次回の状態の短い表示
export const eventBadge = {
	number: `#${event.number}`,
	when: event.status === 'planning' ? '準備中' : `${event.monthDay} ${event.weekday}`,
	status: { planning: '日程調整中', open: '参加受付中', closed: '受付終了' }[event.status]
};

export const organizerLinks = [
	{ label: 'X', url: 'https://x.com/kobatch_tk' },
	{ label: 'LinkedIn', url: 'https://www.linkedin.com/in/tariki-code/' },
	{ label: 'note', url: 'https://note.com/vertrek_kobatch' },
	{ label: 'GitHub', url: 'https://github.com/takafumikobayashi' }
].filter((link) => link.url);

// 関連リンク集。image は各サイトのOGP画像を static/images/links/ に保存したもの
export const relatedLinks = [
	{
		label: '主催者のサイト',
		title: '他力code(tariki-code)',
		description: '一緒に創る、明日のためのcode。',
		url: 'https://tariki-code.tokyo/',
		image: '/images/links/tariki-code.webp'
	},
	{
		label: '主催者のプロジェクト',
		title: 'AI業務レシピ β',
		description:
			'AIに詳しくなくても、プロンプトをコピーして資料を貼るだけ。普段の仕事を短時間で終わらせるための手順集。',
		url: 'https://ai-work-recipes.tariki-code.tokyo/',
		image: '/images/links/ai-work-recipes.webp'
	},
	{
		label: '主催者のプロジェクト',
		title: 'Signals Japan Insight',
		description:
			'OpenAI Signals の公開データをもとに、日本の ChatGPT の仕事利用を読み解く非公式ダッシュボード。',
		url: 'https://signals.tariki-code.tokyo/',
		image: '/images/links/signals-japan-insight.webp'
	}
];

export const organizerHistory = [
	'民間企業でのIT・デジタル事業（金融・通信・ITサービスなど）',
	'国の行政機関でのプロジェクト推進',
	'NPO・地域のIT伴走支援（補助金事業におけるAIアプリ開発受託）',
	'安芸高田市に単身赴任（2026年3月〜）'
];

export type Slide = { src: string; srcSmall?: string; thumb: string; alt: string };

const conceptAlts = [
	'表紙：（仮称）あきたかたAI Lab 企画案。地域でAIを「知る・触る・つくる」コミュニティの設立。完成した事業計画ではなく、地域の皆さんの助言をもとに小さく試すための企画案であることを付箋で説明',
	'背景・問題意識：地域社会のニーズ（人口減少の中でのデジタル・AI活用、実際に触って試す場の必要性）と個人的な想いが重なり、「新しい技術を気軽に試すことのできる場所」をつくりたい',
	'そこで考えていること：講師が一方的に教える講座ではなく、AIに興味のある地域の人が世代や所属を越えて集まり、知る・触る・つくる・活かすを一緒に試す場所',
	'Mission / Vision / Values：Mission「AIを、地域の誰もが使える力にする。」Vision「安芸高田を、AIを試す・作る・活かすが日常にあるまちへ。」と5つのValues',
	'どんなことをするのか：身近なことからAIを使ってみる、AIでものづくり・改善をしてみる、新しい技術の可能性を探る、の3つの柱と具体例',
	'誰でも参加できる場所に：中高生からシニアまで年齢・職業不問。初心者歓迎、PC持参推奨など、初心者と経験者が同じテーマをそれぞれのレベルで楽しむ',
	'まずは小さく始める＆お金の考え方：場所、開催頻度（土日中心・月1〜2回）、規模（1回10名程度）、非営利・実費負担の運営方針、参加費の目安、持続性',
	'まずは「0期」として：最初の3回を参加者と一緒にAI Labそのものを試す期間とし、ニーズ調査と実証実験と位置づける',
	'続けることで起きたら面白いこと：10人が集まり、使える人が増え、誰かが次の先生になり、地域で新しい活動が生まれ、「安芸高田って、AIで面白いことをやっているよね」と言われる状態へ',
	'最初のゴール：「10人くらい集まって、休日にみんなでAIを触ってみたら、思った以上に面白かった」という声。まずは小さく、一緒に始めてみませんか'
];

export const decks: { id: string; label: string; title: string; ratio: string; slides: Slide[] }[] =
	[
		{
			id: 'concept',
			label: 'コンセプトスライド',
			title: 'あきたかたAI Lab 企画案（概要スライド）',
			ratio: '1920 / 1072',
			slides: conceptAlts.map((alt, i) => {
				const n = String(i + 1).padStart(2, '0');
				return {
					src: `/images/slides/concept-${n}.webp`,
					srcSmall: `/images/slides/concept-${n}-960.webp`,
					thumb: `/images/slides/concept-${n}-thumb.webp`,
					alt
				};
			})
		},
		{
			id: 'flyer',
			label: 'チラシ',
			title: '第1回 体験ワークショップのチラシ',
			ratio: '1054 / 1492',
			slides: [
				{
					src: '/images/flyer/flyer-back.webp',
					thumb: '/images/flyer/flyer-back-thumb.webp',
					alt: 'チラシ裏面：はじめまして。あきたかたAI Labを始めます。主催者紹介、なぜあきたかたでAI Labか、大切にしたいこと、一緒にやってみたいことの例、こんな人におすすめ'
				}
			]
		}
	];
