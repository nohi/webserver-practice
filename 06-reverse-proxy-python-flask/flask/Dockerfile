# ベースイメージ
FROM python:3.12

RUN mkdir -p /var/www/flask
WORKDIR /var/www/flask

# 依存Pythonライブラリ
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

CMD ["uwsgi","--ini","/var/www/flask/uwsgi.ini"]
