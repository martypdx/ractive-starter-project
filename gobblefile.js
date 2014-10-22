var gobble = require('gobble'),
	makeComponent = require('./gobble/make-component'),
	sass = require('./gobble/sass-file'),
	join = require('path').join

var js = gobble( 'assets/js' )
	.exclude('vendor/*.js')
	.exclude('passthru/*.js')
	.transform( 'esperanto', { type: 'cjs', defaultOnly: true })
	.transform( 'es6-transpiler')

var vendor = gobble('assets/js/vendor').moveTo('js');

var passthru = gobble('assets/js/passthru').moveTo('js');

var css = gobble('assets/scss')
	.transform( 'sass', { src: 'main.scss', dest: 'min.css' })
css = gobble([css, gobble('assets/scss/fonts').moveTo('fonts')])

var images = gobble('assets/images').moveTo('images')

var components = gobble('assets/components')
	.transform(sass, { includePaths: [ join(process.cwd(), 'assets/scss/include') ] })
	.transform( 'esperanto', { type: 'cjs', defaultOnly: true })
	.transform( 'es6-transpiler', { globals: {
		component: true,
		alert: true
	}})
	.transform(makeComponent)
	.transform( 'ractive', { type: 'cjs' } )

var bundle = gobble([components, js, vendor])
	.transform( 'browserify', {
	  entries: './index.js',
	  dest: 'bundle.js',
	  debug: gobble.env() !== 'production'
	})

var index = gobble('assets')
	.include('index.html')

var shows = gobble('assets/shows').moveTo('shows')

module.exports = gobble( [ bundle, passthru, css, images, index, shows ] );
