'use strict';

var express = require('express'),
    server = express(),
    port = parseInt(process.argv[2]) || 3030;

server.use(express.static('../dist/')).listen(port);
console.log('\x1b[32mHTTP Server starts listening on http://localhost:%d ...\nCtrl-C to stop.\x1b[0m', port);

server.get('/api/getBiz', function (request, response) {
    response.json({
        metadata: {},
        data: [
            {
                id: 1,
                name: 'Souel hotpot',
            },
            {
                id: 2,
                name: 'Ding Tai Feng',
            },
        ]
    });
});
