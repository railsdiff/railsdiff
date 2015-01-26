import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    this.controllerFor('application')
      .set('sourceVersion', params.source)
      .set('targetVersion', params.target);

    var id = ['v', params.source, '/v', params.target].join('');
    return this.store.find('patch', id);
  }
});
