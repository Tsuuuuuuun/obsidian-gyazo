# Image Uploader for Obsidian

Scrapboxのような使い勝手で、ObsidianとGyazoをシームレスに連携し、画像のアップロードと共有を簡単に行えるプラグインです。

## 機能

- クリップボードからGyazoへの直接アップロード
- ノートへのMarkdown画像リンクの自動挿入
- リボンアイコンとコマンドパレットによる直感的な操作
- 設定画面でのAPIトークン管理

## インストール方法

1. Obsidianの設定を開く
2. コミュニティプラグインでセーフモードをオフにする
3. ブラウズをクリックし、"Obsidian Gyazo"を検索
4. インストールをクリック
5. プラグインを有効化

## セットアップ

1. Gyazo APIアクセストークンの取得:
   - Gyazoアカウントにログイン
   - [Gyazo Developer Settings](https://gyazo.com/oauth/applications)にアクセス
   - 新規アプリケーションを作成するか、既存のものを使用
   - アクセストークンをコピー

2. プラグインの設定:
   - Obsidianの設定を開く
   - コミュニティプラグイン > Obsidian Gyazo
   - 設定画面でGyazoアクセストークンを貼り付け

## 使用方法

### クリップボードからのアップロード

1. 画像をクリップボードにコピー
2. 以下のいずれかの方法でアップロード:
   - 左側のリボンにある画像アイコンをクリック
   - コマンドパレット（Ctrl/Cmd + P）を開き、"Upload to Gyazo"を検索
3. プラグインが自動的にカーソル位置にMarkdown画像リンクを挿入

![demo](demo.gif)

### 画像リンクの形式

プラグインは以下の形式で画像を挿入します：
```markdown
![image_id](https://i.gyazo.com/image_id.png)
```

## API仕様

プラグインはGyazo APIを使用して画像をアップロードします。以下がAPIエンドポイントの仕様です：

```bash
$ curl -i https://upload.gyazo.com/api/upload -F "access_token=YOUR_ACCESS_TOKEN" \
  -F "imagedata=@/path/to/image.png"

HTTP/1.1 200 OK

{
    "image_id" : "8980c52421e452ac3355ca3e5cfe7a0c",
    "permalink_url": "http://gyazo.com/8980c52421e452ac3355ca3e5cfe7a0c",
    "thumb_url" : "https://i.gyazo.com/thumb/180/afaiefnaf.png",
    "url" : "https://i.gyazo.com/8980c52421e452ac3355ca3e5cfe7a0c.png",
    "type": "png"
}
```

## エラー処理

プラグインは以下の一般的な問題に対して明確なフィードバックを提供します：
- APIトークンが未設定
- クリップボードに画像がない
- アップロード失敗
- ネットワークエラー

## サポート

問題が発生した場合や改善提案がある場合は：
1. [GitHub Issues](https://github.com/tsuuuuuuun/obsidian-gyazo/issues)を確認
2. 問題が報告されていない場合は新規Issueを作成

## ライセンス

このプロジェクトは0BSDライセンスの下で公開されています - 詳細は[LICENSE](LICENSE)ファイルを参照してください。 