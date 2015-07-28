var browserify = require( 'browserify' ),
	fs = require( 'fs' ),
	join = require( 'path' ).join;

module.exports = function bundleModules( inputdir, outputdir, options, callback ) {
	options = options || {};
	var modules = options.modules;
	if ( !modules || !modules.length ) { return; }

	var b = browserify();
	modules.forEach( function( module ) {
		b.require( module );
	});

	var outfile = join( outputdir, options.dest || 'modules.js' );

	var myFile = fs.createWriteStream( outfile );
	b.bundle().pipe( myFile ).on( 'finish', callback );
};
