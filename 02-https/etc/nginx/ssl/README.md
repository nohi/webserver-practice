SSL証明書(自己証明)の作成コマンドを記載している。
(OpenSSLコマンドがインストールされている前提)

```bash
# SSL(TLS)秘密鍵作成
openssl genrsa -out server-01.key 2048

# SSL秘密鍵からCSR(Certificate Signing Request)の作成.
# CSRにはSSL認証局に対してSSL証明書の署名を申請するためのファイルで、公開鍵と組織名やドメイン情報などが含まれる. SSLを購入する場合このファイルを認証局に提出する
openssl req -new -key server-01.key -out server-01.csr
# 組織情報の入力を求められる、練習や開発環境用であれば適当に入力しておけばよい
# Country Name (2 letter code) [AU]: JA
# State or Province Name (full name) [Some-State]:
# ...

# デジタル証明書(crt)の作成. 署名済みの公開鍵と組織情報が格納されている.
# 本来はCSRを元に認証局が作成する(お金がかかる).
# 開発用ではこれを自分で作って利用することも多い(自己証明書)
openssl x509 -days 3650 -req -signkey server-01.key -in server-01.csr -out server-01.crt
```