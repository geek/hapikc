var Hapi = require('hapi');

var server = new Hapi.Server(8080);

server.plugin.require('../helloplugins/', function (err) {
		
	server.start();
});