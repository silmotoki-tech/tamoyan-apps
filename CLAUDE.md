# tamoyan-apps

タモやん個人用アプリの置き場。GitHub Pages で公開している。

```
index.html            ポータル（アプリ一覧）。全アプリ共有
sw.js                 Service Worker
icon-192.png
calorie-calculator/   宮崎敏郎のカロリー計算
```

## 最重要：index.html は共有ファイル

**`index.html` のアプリ一覧には、このリポジトリの外にあるアプリも登録されている。**
別々のプロジェクトから、それぞれ別の作業セッションで追記される。

そのため、以下を必ず守ること。

- **`index.html` を全体から作り直さない。** 追加・修正するカードの箇所だけを編集する
- 作業を始める前に、下の「登録済みアプリ」と実際の `index.html` を突き合わせる
- 編集後、**登録済みアプリが全部残っているかを必ず確認してから** commit する
- カードを1件も減らしていないことを `git diff` で確認する。意図せず消えていたら戻す

過去に、カロリー計算アプリの作業中に `index.html` を書き直して、
英会話アプリのカードを消してしまったことがある。同じことを繰り返さない。

## 登録済みアプリ（これが正）

| アプリ | URL |
|---|---|
| 宮崎敏郎のカロリー計算 | https://silmotoki-tech.github.io/tamoyan-apps/calorie-calculator/ |
| 英会話台本トレーナー | https://silmotoki-tech.github.io/Tamoyan-English/ |

**アプリを追加したら、この表にも必ず追記すること。** この表が次の作業セッションへの引き継ぎになる。

## 他のアプリのフォルダを触らない

各アプリのフォルダは独立している。自分が担当しているアプリ以外の
フォルダには手を入れない。共通で触ってよいのは `index.html` のカード部分だけ。

## デプロイの確認

push しただけでは確認にならない。GitHub Pages は CDN が
`max-age=600` を返すうえ、ビルドに1〜3分かかる。

- 反映確認は **git 側の中身**（`gh api repos/silmotoki-tech/tamoyan-apps/contents/index.html`）で行う
- 画面で見るときはキャッシュ回避のクエリを付ける（`?v=` など）
- push 直後のレンダリング結果だけを見て「反映された」と判断しない
