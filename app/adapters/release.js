import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../config/environment';

export default Ember.Object.extend({
  findAll: function(store, name) {
    return ajax(config.apiHost + '/versions').
      then(function(result) {
        return result.split('\n').reverse().map(function(version) {
          return store.recordForId(name, version);
        });
      });
  }
});
