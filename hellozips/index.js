var Hapi = require('hapi');
var Mongo = require('mongodb');


var server = new Hapi.Server(8080);

server.route({
    method: 'GET',
    path: '/pop/{zip}',
    handler: popHandler,
});

server.start();


var _db = new Mongo.Db('nodekc', new Mongo.Server('127.0.0.1', 27017, { auto_reconnect: true, poolSize: 4 }), { safe: false });

function popHandler (request) {

    _db.open(function (err, db) {

        db.collection('zips', function (err, collection) {

            collection.findOne({ _id: request.params.zip }, function (err, result) {

                request.reply(result.pop);
            });
        });
    });
};