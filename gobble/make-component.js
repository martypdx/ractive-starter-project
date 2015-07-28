var fs = require( 'fs' ),
	path = require( 'path' ),
	join = path.join;

module.exports = function makeComponent ( src, outputdir, options, callback ) {

	function isDirectory( dir, f ){
		return fs.lstatSync( join( dir, f ) ).isDirectory();
	}

	function readFile( dir, name, ext ){
		var p = join( dir, name + '.' + ext );
		return  fs.existsSync(p) ? fs.readFileSync( p, 'utf8' ) : '';
	}

	function wrapFile( tag, file ){
		return file ? '\n\n<' + tag + '>\n' + file + '\n\n</'+ tag + '>\n' : '';
	}

	function writeComponent ( src, c, list) {
		var dir = join( src, c );
		var file = readFile( dir, c, 'html' );
		file += wrapFile( 'style', readFile( dir, c, 'css' ) );
		file += wrapFile( 'script', readFile( dir, c, 'js' ) );
		if ( file ) {
			var write = join( outputdir, c + '.html' );
			fs.writeFileSync( write, file );
			list.push( c );
		}
	}

	function writeDirectory ( dir, list ) {
		var cdir = fs.readdirSync(dir);

		var components = cdir.filter(function(each){
			return isDirectory( dir, each );
		});

		var childpath;

		components.forEach(function(c){
			writeComponent( dir, c, list);
			childpath = join( dir, c );
			writeDirectory( childpath, list );
		});
	}

	try {
		var list = [];

		writeDirectory( src, list );

		var listFile = "var Ractive = require( 'ractive' );\n\n";
		list.forEach( function(c) {
			listFile += "Ractive.components['" + c + "'] = require( './" + c + "' );\n";
		});

		fs.writeFileSync( join ( outputdir, 'components.js' ), listFile);

		callback();
	} catch(err){
		callback(err);
	}
};
