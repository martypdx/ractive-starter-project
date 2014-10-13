import upper from './upper-caser';

component.exports = {
	oninit: function() {
		this.on('select', event => {
			alert('selected')
		})
	}
}
