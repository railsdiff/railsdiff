import Ember from 'ember';
import ajax from 'ic-ajax';
import config from '../config/environment';

export default Ember.Object.extend({
  find: function(store, name, id) {
    return ajax(config.apiHost + '/' + id)
      .then(function(result) {
        var record = store.recordForId(name, id);
        record.set('raw', result);
        return record;
      });
  }
});
