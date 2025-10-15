# ConoHa WING へのアップロード

## FTP 接続によるアップロード

### 推奨 FTP ソフト：

- FileZilla（無料・Windows/Mac 対応）
- https://filezilla-project.org/

### 手順:

1. FTP 接続情報を確認

   ConoHa コントロールパネルで：

   - 「サイト管理」→「FTP アカウント」
   - または「サーバー管理」→「FTP」

   必要な情報：

```bash
	FTP ホスト名： あなたのサーバー名.conoha.ne.jp
	FTP ユーザー名： 表示されているユーザー名
	FTP パスワード： 設定したパスワード
	ポート番号： 21（通常）または 990（FTPS）
```

2. FileZilla で接続

   FileZilla 起動後：

   - 「ファイル」→「サイトマネージャー」
   - 「新しいサイト」をクリック
   - 接続情報を入力：

     - プロトコル： FTP - ファイル転送プロトコル
     - ホスト： （FTP ホスト名）
     - ポート： 21
     - ログオンタイプ： 通常
     - ユーザー： （FTP ユーザー名）
     - パスワード： （FTP パスワード）

   - 「接続」をクリック

3. ファイルをアップロード
   左側（ローカル）： あなたの PC
   右側（リモート）： ConoHa サーバー

- 右側でディレクトリに移動：

```
/public_html/www.verdex.com/
```

- 左側でファイルを選択
- 右クリック → アップロード
  またはドラッグ&ドロップでも OK

---

## アップロード後の構成：

```bash
/home/アカウント名/public_html/www.verdex.com/
│
├── index.html
├── contact.html
├── privacy.html
├── tokushoho.html
├── thanks.html
│
├── css/
│   └── style.css
│
├── js/
│   └── main.js
│
└── images/
    ├── hero-bg.jpg
    ├── service-01.jpg
    ├── service-02.jpg
    ├── service-03.jpg
    └── philosophy.jpg
```

---

## 重要な設定

### 1. ドメイン設定の確認

ConoHa コントロールパネルで：

- 「サイト管理」→「ドメイン」
  - www.verdex.comが追加されているか確認
  - ドキュメントルートが正しいか確認
- ドキュメントルート：
  /public_html/www.verdex.com/

### 2. SSL 設定（HTTPS 化）

無料 SSL 証明書の設定：

- 「サイト管理」→「サイト設定」
- 対象ドメイン（www.verdex.com）を選択
- 「SSL」タブをクリック
- 「無料独自 SSL」の「利用設定」を ON に
- 数分待つ

SSL 設定完了後：https://www.verdex.comでアクセス可能

---

## .htaccess の設定（推奨）

### HTTPS リダイレクト設定

/public_html/www.verdex.com/.htaccessを作成：

```apache
# HTTP から HTTPS へリダイレクト
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.\*)$ https://%{HTTP_HOST}%{REQUEST_URI} [R=301,L]

# www なし → www ありへリダイレクト（必要な場合）
RewriteCond %{HTTP_HOST} ^verdex\.com$ [NC]
RewriteRule ^(.\*)$ https://www.verdex.com/$1 [R=301,L]
```

---

## アップロード後の確認

チェックリスト：

- [ ] 1.  ブラウザでアクセス https://www.verdex.com
- [ ] 2.  全ページが表示されるか確認

  - トップページ
  - お問い合わせページ（contact.html）
  - プライバシーポリシー（privacy.html）
  - 特定商取引法（tokushoho.html）

- [ ] 3.  画像が表示されるか確認
- [ ] 4.  リンクが正しく動くか確認
- [ ] 5.  スマホ表示を確認

  - ブラウザのデベロッパーツール（F12）でモバイル表示

- [ ] 6.  SSL（HTTPS）が有効か確認
  - URL が https://になっているか
  - 鍵マークが表示されているか

---

## トラブルシューティング

問題：ページが表示されない
原因 1：ファイル名の間違い - index.html（小文字） - Index.html（大文字）

原因 2：ディレクトリが間違っている - 正しい場所：/public_html/www.verdex.com/ - 間違い：/public_html/verdex.com/

原因 3：ドメイン設定が未完了 - DNS 設定に時間がかかる（最大 24-48 時間）

問題：画像が表示されない
原因 1：パスが間違っている

```html
html<!-- ❌ 間違い -->
<img src="/images/hero-bg.jpg" />

<!-- ✅ 正しい -->
<img src="images/hero-bg.jpg" />
```

原因 2：ファイル名の大文字・小文字 - HTML：hero-bg.jpg - 実際：Hero-BG.JPG ← 一致しない

問題：SSL が有効にならない
対処法： - ConoHa コントロールパネルで再度 SSL 設定を確認 - 数時間待つ - それでもダメならサポートに問い合わせ
