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


server.start(function () {

    console.log(server.settings.uri);
});


function popHandler (request) {

    request.reply(request.pre.pop);
};