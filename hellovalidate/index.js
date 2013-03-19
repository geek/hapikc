var Hapi = require('hapi');


var server = new Hapi.Server(8080);

server.route({ method: 'GET', path: '/name/{lastname*1}', handler: function (request) {

	request.reply('Hello Mr. ' + request.params.lastname);
}, config: { 
	validate: { path: { lastname: Hapi.types.String().max(4).min(2).alphanum() }}
}});

server.start();