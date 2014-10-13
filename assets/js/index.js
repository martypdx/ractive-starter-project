import App from './app';
import Ractive from 'ractive';

Ractive.components.widget = require('./widget');

var ractive = new App({
        el: document.body,
        data: []
    })
