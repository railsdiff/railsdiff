import Ember from 'ember';
import RouteMessaging from '../mixins/route-messaging';

export default Ember.Route.extend(RouteMessaging, {
  modelError: function() {
    this.addMessage('error',
        'Could not connect to server to download diff data. Perhaps try again later.');
    return {};
  },

  model: function(params) {
    this.controllerFor('application')
      .set('sourceVersion', params.source)
      .set('targetVersion', params.target);

    var id = ['v', params.source, '/v', params.target].join('');
    return this.store.find('patch', id)
      .then(null, this.modelError.bind(this));
  }
});
