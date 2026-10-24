# あきたかたAI Lab

安芸高田で、AIを「知る・触る・つくる」ことを地域の人たちと一緒に楽しむ、個人主催・非営利の地域コミュニティです。市の公式事業ではありません。

このリポジトリは、活動紹介と参加案内を入口に、イベント、Lab Log、Knowledgeを少しずつ蓄積していくWebサイトです。設計の背景とロードマップは [`docs/project.md`](docs/project.md)、Markdown記事の書き方は [`docs/content-authoring.md`](docs/content-authoring.md) を参照してください。

## 開発

```sh
npm install
npm run dev
```

確認コマンド:

```sh
npm run check
npm run lint
npm run build
```

## Cloudflare Workers

SvelteKitの`adapter-cloudflare`とWorkers Assetsを使います。ローカルでCloudflare環境を含めて確認する場合は`npm run preview`を使います。

公開コマンドは`npm run deploy`です。CloudflareへのログインとWorker名・独自ドメイン等の本番設定は、公開前に運営者が確認してください。このリポジトリには認証情報を保存しません。
