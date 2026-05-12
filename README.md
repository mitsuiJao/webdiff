# WebDiff

GitHub Primer UI を使ったテキスト比較ツールです。2つのテキストを貼り付けて差分を視覚的に確認できます。

このリポジトリは一般公開しています
https://diff.nishima-tech.com/

## 機能

- **行単位の差分表示** — 追加（緑）・削除（赤）を色分け表示
- **Split / Unified ビュー切り替え** — 左右並列表示と統合表示をトグル
- **ダーク / ライトモード** — ヘッダーのアイコンで切り替え
- **Cloudflare Pages 対応** — 静的ビルドで即デプロイ可能

## 開発

```bash
npm install
npm run dev
```

`http://localhost:5173` でアクセスできます。

## ビルド

```bash
npm run build
```

`dist/` ディレクトリに静的ファイルが生成されます。

## Cloudflare Pages へのデプロイ

| 設定項目 | 値 |
|---|---|
| ビルドコマンド | `npm run build` |
| 出力ディレクトリ | `dist` |
| Node.js バージョン | 18 以上 |

## 技術スタック

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [GitHub Primer](https://primer.style/react/) — UI コンポーネント
- [diff](https://www.npmjs.com/package/diff) — テキスト差分エンジン
