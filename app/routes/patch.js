import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(e) {
      if (e && e.jqXHR && e.jqXHR.status === 404) {
        this.transitionTo('notFound', 'not-found');
      } else {
        return true;
      }
    }
  },

  model: function(params) {
    this.controllerFor('application')
      .set('sourceVersion', params.source)
      .set('targetVersion', params.target);

    var id = ['v', params.source, '/v', params.target].join('');
    return this.store.find('patch', id);
  }
});
