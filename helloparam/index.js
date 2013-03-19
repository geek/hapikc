var Hapi = require('hapi');


var server = new Hapi.Server(8080);

server.route({ method: 'GET', path: '/{p*}', handler: function (request) {

	request.reply('Hello ' + request.params.p);
}});

server.route({ method: 'GET', path: '/{name*2}', handler: function (request) {

	request.reply('Hello Mr. ' + request.params.name.split('/')[1]);
}});

server.start();