# nginx (Docker)

## Usage

```
# 1. Docker(Docker Desktop)サービスを起動しておく

# 2. Nginxコンテナを起動する
cd <このフォルダ>
docker compose up -d

# 3. Nginxのログを監視
docker compose logs -f

# x. Nginxコンテナを停止+削除 (コンテナを残したい場合はdownではなくstop/startを利用)
docker compose down
```


## アクセス

### hostを書き換えてアクセス

hostsファイルに`foo.com`, `bar.com`の静的名前解決設定を書く。
http://foo.com:60003/
http://bar.com:60003/

### curlコマンドでアクセス

または、curlコマンドで`--resolve` or `Host`ヘッダーをつけてアクセスする。

```
# 名前解決ver (勝手にURLと同じHostヘッダーがつけられる)
curl -v --resolve foo.com:60003:127.0.0.1 "http://foo.com:60003/"

# Hostヘッダー指定 (URLが異なっていても、Hostヘッダーがfoo.comであれば、foo.comへのアクセスとして扱われる)
curl -v -H 'Host: foo.com' "http://localhost:60003/"
curl -v -H 'Host: bar.com' "http://127.0.0.1:60003/"
```
