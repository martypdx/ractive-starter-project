import upper from './upper-caser';
import fade from 'ractive-transitions-fade';

component.exports = {
	data: {
		upper: upper
	},
	oninit: function() {
		this.on('select', event => {
			alert('selected');
		})
	},
	transitions: {
		fade: fade
	}
}
