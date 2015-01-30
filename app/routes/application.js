import Ember from 'ember';
import RouteMessaging from '../mixins/route-messaging';

export default Ember.Route.extend(RouteMessaging, {
  modelError: function() {
    this.addMessage('error', 'Could not connect to server to load version data.');
    return {};
  },

  model: function() {
    return this.store.find('version')
      .then(null, this.modelError.bind(this));
  }
});
