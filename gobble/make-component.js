var fs = require('fs'),
	join = require('path').join

module.exports = function makeComponent ( src, outputdir, options, callback ) {


	function isDirectory(f){
		return fs.lstatSync(join(src,f)).isDirectory()
	}

	function readFile(name, ext){
		var p = join(src, name, name + '.' + ext)
		return  fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : ''
	}

	function wrapFile(tag, file){
		return file ? '\n\n<' + tag + '>\n' + file + '\n\n</'+ tag + '>\n' : ''
	}

	try {
		var components = fs.readdirSync(src).filter(isDirectory)

		components.forEach(function(c){
			var file = readFile(c, 'html')
			file += wrapFile('style', readFile(c, 'css') )
			file += wrapFile('script', readFile(c, 'js') )
			var write = join(outputdir, c + '.html')
			fs.writeFileSync(write, file)
		})
		callback()
	} catch(err){
		callback(err)
	}

}
