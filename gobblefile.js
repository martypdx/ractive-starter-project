var gobble = require( 'gobble' ),
	makeComponent = require( './gobble/make-component' ),
	sass = require( './gobble/sass-file' ),
	join = require( 'path' ).join,
	bundleModules = require( './gobble/bundle-modules' );

console.log( 'gobble_env', gobble.env() );

var isProduction = gobble.env() === 'production';

var env = gobble( 'env/' + gobble.env() )
	.include( 'env.js' );

var js = gobble( 'assets/js' )
	.exclude( 'vendor/*.js' )
	.exclude( 'passthru/*.js' );

js = gobble( [ env, js ] )
	.transform( 'babel' );

var vendor = gobble( 'assets/js/vendor' ).moveTo( 'js' );

var passthru = gobble( 'assets/js/passthru' ).moveTo( 'js' );

var sassIncludes = [ join(process.cwd(), 'assets/scss/include' ) ];

var css = gobble( 'assets/scss' ).transform( 'sass', {
	src: 'main.scss',
	dest: 'min.css',
	includePaths: sassIncludes
});

css = gobble([
	css,
	gobble( 'assets/scss' ).include( 'normalize.css' ),
	gobble( 'assets/scss/fonts' ).moveTo( 'fonts' )
]);

var images = gobble( 'assets/images' ).moveTo( 'images' );

var components = gobble( 'assets/components' )
	.transform( sass, { includePaths: sassIncludes } )
	.transform( 'babel' )
	.transform( makeComponent )
	.transform( 'ractive', { type: 'cjs' } );

var excludeModules = isProduction ? [] : [ 'ractive' /* other modules */ ];

var bundle = gobble( [ components, js, vendor ] )
	.transform( 'browserify', {
		entries: './index.js',
		configure: function ( bundle ) {
			excludeModules.forEach( function( module ) {
				bundle.exclude( module );
			});
		},
		dest: 'bundle.js',
		debug: gobble.env() !== 'production'
	});

if ( isProduction ) {
	bundle = bundle.transform( 'uglifyjs' );
}

var modules = gobble( 'assets/js/passthru' );
if ( !isProduction ) {
	modules = modules.transform( bundleModules, { modules: excludeModules });
}

var index = gobble( 'assets' ).include( 'index.html' );
var favicon = gobble( 'assets' ).include( 'favicon.ico' );

// Include other directories as needed...
// var other = gobble( 'assets/other' ).moveTo( 'other' );

module.exports = gobble( [ bundle, passthru, css, images, index, favicon, modules /* , other */ ] );
