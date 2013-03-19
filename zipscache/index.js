var Hapi = require('hapi');
var Mongo = require('mongodb');
var Zips = require('./zips');

var server = new Hapi.Server(8080, {
    cache: 'redis'
});

var _db = new Mongo.Db('nodekc', new Mongo.Server('127.0.0.1', 27017, { auto_reconnect: true, poolSize: 4 }), { safe: false });
var db = function (next) {

    _db.open(function (err, opened) {

        next (err || opened);
    });
};

server.addHelper('db', db);

server.route({
    method: 'GET',
    path: '/pop/{zip}',
    handler: popHandler,
    config: {
        pre: [
            { method: Zips.getCollection, assign: 'collection' },
            { method: Zips.getPop, assign: 'pop' }
        ],
        cache: {
            expiresIn: 120000,                   // 2 minutes
            mode: 'server+client'
        }
    }
});


server.start(function () {

    console.log(server.settings.uri);
});


function popHandler (request) {

    request.reply(request.pre.pop);
};