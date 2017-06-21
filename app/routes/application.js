import Route from 'ember-route';
import RouteMessaging from '../mixins/route-messaging';
import { once } from 'ember-runloop';

export default Route.extend(RouteMessaging, {
  actions: {
    didTransition: function() {
      once(this, function() {
        window._gaq.push(['_trackPageview', this.router.get('url')]);
      });
      return true;
    }
  },

  modelError: function() {
    this.addMessage('error', 'Could not connect to server to load version data.');
    return {};
  },

  model: function() {
    return this.store.findAll('release')
      .then(null, this.modelError.bind(this));
  },

  title: function(tokens) {
    return tokens.concat('RailsDiff').join(' - ');
  }
});
