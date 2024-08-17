"use strict";
const http = require('http');
const fs = require('fs');

const proto = process.env.HOST || 'http';
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 9000;

/**
 * 簡易ルーター
 * 
 * @param {http.IncomingMessage} req
 * @returns {[Number, {}, Buffer|string]}
 */
const router = (req) => {
    let code = 200;
    let header = {};
    let body = "";

    switch (req.url) {
        case '/foo':
            header = {
                'Content-Type': 'application/json; charset=UTF-8',
            };
            body = JSON.stringify({ data: "foo", data2: "data2" });
            break;

        case '/bar':
            header = {
                'Content-Type': 'text/plain; charset=UTF-8',
            };
            body = JSON.stringify({ data: "bar", data2: "data2" });
            break;

        case '/hoge':
            header = {
                'Content-Type': 'text/html; charset=UTF-8',
            };
            body = JSON.stringify({ data: "hoge", data2: "data2" });
            break;

        case '/image':
            header = {
                'Content-Type': 'image/png',
            };

            // base64エンコードされた画像データ
            const imgDataBase64 = "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OMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAECc4AAA4gQHABAnOACAOMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAECc4AAA4gQHABAnOACAOMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAECc4AAA4gQHABAnOACAOMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAECc4AAA4gQHABAnOACAOMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAECc4AAA4gQHABAnOACAOMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAECc4AAA4gQHABAnOACAOMEBAMQJDgAgTnAAAHGCAwCIExwAQJzgAADiBAcAECc4AIA4wQEAxAkOACBOcAAAcYIDAIgTHABAnOAAAOIEBwAQJzgAgDjBAQDECQ4AIE5wAABxggMAiBMcAEDYTz7+DzWjBbxgZML4AAAAAElFTkSuQmCC";

            body = Buffer.from(imgDataBase64, 'base64'); // base64データをでコード(バイナリに変換)
            break;

        // ----index----
        case '/index':
            header = { 'Content-Type': 'text/html; charset=UTF-8', };
            body = "api index.";
            break;

        default:
            code = 404;
            header = { 'Content-Type': 'text/plain' };
            body = "Undefined route.";
    }

    return [code, header, body];
}

// 簡易HTTPサーバー
const server = http.createServer(function (request, response) {

    // ルーター
    const [code, header, body] = router(request);

    // HTTPヘッダー
    response.writeHead(code, header);

    // access log
    const nowStr = (new Date()).toLocaleString('sv-SE') // HACK: locale: Sweden
    console.log(`[${nowStr}] ${code} ${request.url}`);

    // HTTPボディ
    response.end(body);
})

// HTTPサーバー起動
console.info(`start server : ${proto}://${host}:${port}`);
server.listen(port, host);
