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

http://localhost:60005/
