var sass = require('node-sass');
var join = require('path').join

function sassFilter(input, options) {
	return sass.renderSync({
	    data: input
	    // includePaths: [join(process.cwd(),'assets/include')]
	});
}

sassFilter.defaults = {
	accept: ['.scss'],
	ext: '.css'
}

module.exports = sassFilter
