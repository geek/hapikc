exports.getCollection = function (request, next) {

    request.server.helpers.db(function (db) {

    	db.collection('zips', function (err, collection) {

	        next(err ||collection)
	    });
    });
};

exports.getPop = function (request, next) {

    request.pre.collection.findOne({ _id: request.params.zip }, function (err, result) {

        next(err || result.pop);
    });
};