import Ember from 'ember';

export default Ember.Route.extend({
  versionError: function() {
    this.controllerFor('application')
      .set('errorMessage', 'Could not connect to server to load version data.');

    return {};
  },

  model: function() {
    return this.store.find('version')
      .then(null, this.versionError.bind(this));
  }
});
