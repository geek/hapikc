var Hapi = require('hapi');


var server = new Hapi.Server(8080, {
	views: { path: __dirname + '/views' }
});

server.route({ method: 'GET', path: '/name/{lastname*1}', config: {
	handler: handler,
	validate: { path: { lastname: Hapi.types.String().max(4).min(2).alphanum() }}
}});

server.start();

function handler () {

	this.reply.view('index', this.params).send();
}