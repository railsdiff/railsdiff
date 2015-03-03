/* globals _gaq */
import Ember from 'ember';
import RouteMessaging from '../mixins/route-messaging';

export default Ember.Route.extend(RouteMessaging, {
  actions: {
    didTransition: function() {
      Ember.run.once(this, function() {
        _gaq.push(['_trackPageview', this.router.get('url')]);
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
