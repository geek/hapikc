var Mongo = require('mongodb');

var _db = new Mongo.Db('nodekc', new Mongo.Server('127.0.0.1', 27017, { auto_reconnect: true, poolSize: 4 }), { safe: false });


exports.getCollection = function (request, next) {

    _db.open(function (err, db) {

        db.collection('zips', function (err, collection) {

            next(err || collection)
        });
    });
};

exports.getPop = function (request, next) {

    request.pre.collection.findOne({ _id: request.params.zip }, function (err, result) {

        next(err || result.pop);
    });
};