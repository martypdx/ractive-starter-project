import App from './app';
import Ractive from 'ractive';
import Components from './components';

Ractive.defaults.debug = true

window.ractive = new App({
        el: document.body
    })
