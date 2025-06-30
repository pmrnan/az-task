# 🌐 検証環境アクセス

**以下のURLにアクセスしてください**

```
https://az-task-zeta.vercel.app
```

<br>

# 💻 開発環境

## 🔧 セットアップ手順

1. **環境変数の設定（初回のみ）**

プロジェクトルートの .env ファイルに、Supabase の接続情報を記述してください。設定値はプロジェクトの共有ファイルに記載されています。
<br>

2. **パッケージのインストール**

```
npm install
```

<br>

3. **アプリケーションの起動**

```
npm run dev
```

<br>

4. **Prisma Stadioの起動**

```
npm run db:studio
```

## ✏️ schema.prisma変更時

1. **Prisma クライアントのコード生成**

```
npx prisma generate
```

<br>

2. **マイグレーションの適用**

```
npx prisma migrate dev
```

<br>

# 🚀 アプリケーション構成（Next.js × Supabase × TypeScript）

AzTask は、開発効率・保守性・パフォーマンスを重視した、フルスタック Web アプリケーションです。以下の技術スタックを採用し、型安全でスケーラブルな構成としています。

## 🧱 使用技術

| 技術                  | 役割                                               |
| --------------------- | -------------------------------------------------- |
| Next.js               | フロントエンド + API サーバー                      |
| TypeScript            | 静的型付き JavaScript                              |
| Prisma                | 型安全な ORM（PostgreSQL 用）                      |
| Supabase              | BaaS（認証、DB、ストレージ、リアルタイム）         |
| React Hook Form (RHF) | 高速で軽量なフォームライブラリ                     |
| Zod                   | スキーマバリデーション                             |
| Tailwind CSS          | ユーティリティファーストな CSS フレームワーク      |
| shadcn/ui             | Tailwind ベースの UI コンポーネント集              |
| Vercel                | デプロイ＆CI/CD プラットフォーム                   |
| jest                  | ユニットテスト・コンポーネントテストフレームワーク |
| playwright            | E2E（エンドツーエンド）テストフレームワーク        |

---

## ✅ 技術選定の理由

### 1. **Next.js**

- React ベースのフルスタックFWで最も広く使われており、ドキュメントが豊富
- Vercel との親和性が高い

### 2. **Prisma**

- スキーマ定義による直感的な DB 設計が可能
- 型安全なクエリが自動生成される
- マイグレーションの管理が簡単
- TypeScript との相性👍

### 3. **Supabase**

- 認証、ストレージ、リアルタイム通信まで無料枠内で一括提供されている
- PostgreSQL ベースで信頼性が高い

### 4. **React Hook Form + Zod**

- 軽量でパフォーマンスが高い
- バリデーションは Zod と連携して一元管理が可能
- TypeScript との相性👍

### 5. **Tailwind CSS + shadcn/ui**

- 他ライブラリのようにpropsやテーマに縛られにくく、細かいUIの制御が可能
- ダイアログ・トースト・フォームなどよく使う UI をすぐに組み込める

### 6. **Vercel**

- Next.js 公式ホスティング環境で、FWの機能を最大限活かせる
- GitHubと連携し、プッシュするだけで自動ビルド＆デプロイが可能
- グローバル CDN で高速配信が可能

<br>

# 📚 コーディング規約

## 🛠️ ディレクトリ構成

````az-task/
├── src/
│   ├── app/
│   │   ├── globals.css # Tailwind などのスタイル
│   │   ├── layout.tsx # ルートレイアウト（共通 UI）
│   │   ├── page.tsx # トップページ
│   │   ├── task/
│   │   │   └── page.tsx # タスクページ
│   │   ├── login/
│   │   │   └── page.tsx # ログインページ
│   │   └── api/ # サーバーサイド API
│   │
│   ├── components/ # UI コンポーネント
│   │   ├── ui/ # shadcn/ui ベースのパーツ
│   │   ├── shared/ # この階層での共通コンポーネント
│   │   ├── task/ # タスクページで使用するコンポーネント
│   │   └── login/ # ログインページで使用するコンポーネント
│   │
│   ├── constansts/ # 定数定義
│   │
│   ├── context/ # グローバルな状態管理定義
│   │
│   ├── generated/ # Prisma クライアントコード（コマンドで自動生成される）
│   │
│   ├── hook/ # カスタムフック
│   │
│   ├── lib/ # ユーティリティ・設定系
│   │   ├── api/ # API 関連
│   │   ├── schema/ # zod のスキーマ定義
│   │   └── utils.ts # 汎用関数
│   │
│   └── types/ # 型定義
├──  .env # 環境変数（Supabase など）
└── tailwind.config.ts # Tailwind 設定```
````

## 📁 app配下とcomponents配下のディレクトリ構造概要

```az-task/
├── app/
│   ├── pageA
│   ├── pageB
│   ├── ...
│
├── components/
│   ├── pageA
│   │   ├── featureA
│   │   ├── ...
│   │   │   ├── featureB
│   │   │   ├── ...
│   │   │   └── shared
│   │   │   │   ├── ...
│   ├── pageB
│   │   │   ├── ButtonB.tsx
│   ├── shared
│   │   ├── ButtonA.tsx

```

## 📌 ルール・指針

- components/ は、「どの画面で利用されるか」 を軸に構造化されており、app/配下のようにpageA/やpageB/がある

- 利用スコープが狭いものほど深い階層に、広いものほど浅く共有ディレクトリに置く

- 機能単位（featureA / featureB）でのネストは、依存関係と変更影響範囲を明確に保つための設計思想
  - featureA/がcomponents/pageA/の配下に置かれることは以下の意味を持つ
    - featureAという機能はpageAでしか使われない
    - featureAの修正はpageAまでしか影響しない
  - featureB/がfeatureA/の配下に置かれることは以下の意味を持つ
    - featureBという機能はfeatureAでしか使われない
    - featureBの修正はfeatureAまでしか影響しない

- app/ はページルーティングとビジネスロジックの入口を担い、UIの構成はすべて components/ に分離する

## ✅ 利点

- 影響範囲が明確になることで、安心してリファクタリングや機能追加が可能

- 再利用性が高く、適切な責務分離により、保守性が向上

- チーム開発でも「このコード、どこに置くべきか？」に迷いづらくなる

## 📝 その他規約

- コードフォーマット
  - コミット前に以下を実行し、エラーが発生した場合修正すること

```
npm run lint
```

```
npm run format
```

<br>

- コミットメッセージ
  - 以下に沿ってコミットすること
    - `[add]〇〇`・・・機能追加
    - `[fix]〇〇`・・・機能修正
    - `[refactor]〇〇`・・・リファクタリング
