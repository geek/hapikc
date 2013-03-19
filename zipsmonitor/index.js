var Hapi = require('hapi');
var Zips = require('./zips');

var server = new Hapi.Server(8080);

server.route({
    method: 'GET',
    path: '/pop/{zip}',
    handler: popHandler,
    config: {
        pre: [
            { method: Zips.getCollection, assign: 'collection' },
            { method: Zips.getPop, assign: 'pop' }
        ]
    }
});


server.plugin.require('../node_modules/good', {
    subscribers: {
        console: ['ops', 'request', 'log'],
        'http://localhost/logs': ['log']
    }
}, function () {

    server.start(function () {

        console.log(server.settings.uri);
    });
});


function popHandler (request) {

    request.reply(request.pre.pop);
};