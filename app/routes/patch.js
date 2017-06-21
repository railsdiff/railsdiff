import Route from 'ember-route';
import RouteMessaging from '../mixins/route-messaging';

export default Route.extend(RouteMessaging, {
  modelError: function() {
    this.addMessage('error',
        'Could not connect to server to download diff data. Perhaps try again later.');
    return {};
  },

  model: function(params) {
    const controller = this.controllerFor('application');
    controller.set('sourceVersion', params.source);
    controller.set('targetVersion', params.target);

    const id = ['v', params.source, '/v', params.target].join('');
    return this.store.find('patch', id)
      .then(null, this.modelError.bind(this));
  },

  titleToken: function() {
    const application = this.controllerFor('application');
    const source = application.get('sourceVersion');
    const target = application.get('targetVersion');

    return ['Rails', source, '-', target, 'diff'].join(' ');
  }
});
