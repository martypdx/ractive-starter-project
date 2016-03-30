import Ractive from 'ractive';
import Components from './components';
import tap from 'ractive-events-tap';

Ractive.DEBUG = /unminified/.test(function(){/*unminified*/});

Ractive.events.tap = tap;
