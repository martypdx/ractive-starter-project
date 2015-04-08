import App from './app';
import Ractive from 'ractive';
import Components from './components';
import tap from 'ractive-events-tap';


Ractive.events.tap = tap;

// As of 0.7 default for debug is true
// Ractive.defaults.debug = false;

new App({
    el: document.body
});
