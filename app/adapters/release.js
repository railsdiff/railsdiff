import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  ajax: Ember.inject.service(),

  findAll: function(store, name) {
    return this.get('ajax').request(`${config.APP.apiHost}/versions`, {dataType: 'text'})
      .then(function(result) {
        return result.split('\n').reverse().map(function(version) {
          return store.recordForId(name, version);
        });
      });
  }
});
