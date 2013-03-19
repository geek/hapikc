exports.register = function (pack, options, next) {

	pack.route({ 
		method: 'GET', 
		path: '/{file*}', 
		handler: { directory: { path: './public/' } } 
	});
	
	next();	
};