var gobble = require('gobble'),
	makeComponent = require('./gobble/make-component'),
	sass = require('./gobble/sass-filter')

var js = gobble( 'assets/js' )
	.exclude('vendor/*.js')
	.transform( 'esperanto', { type: 'cjs', defaultOnly: true })
	.transform( 'es6-transpiler')

var vendor = gobble('assets/js/vendor').moveTo('js');

var css = gobble('assets/scss')
	.transform( 'sass', { src: 'main.scss', dest: 'min.css' })

var components = gobble('assets/components')
	.transform(sass)
	.transform( 'esperanto', { type: 'cjs', defaultOnly: true })
	.transform( 'es6-transpiler', { globals: {
		component: true,
		alert: true
	}})
	.transform(makeComponent)
	.transform( 'ractive', { type: 'cjs' } )

var bundle = gobble([components, js])
	.transform( 'browserify', {
	  entries: './index.js',
	  dest: 'bundle.js',
	  debug: gobble.env() !== 'production'
	})

var index = gobble('assets')
	.include('index.html')

module.exports = gobble( [ bundle, css, vendor, index ] );
