import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  ajax: Ember.inject.service(),

  find: function(store, name, id) {
    return this.get('ajax').request(config.apiHost + '/' + id, {dataType: 'text'})
      .then(function(result) {
        const record = store.recordForId(name, id);
        record.set('raw', result);
        return record;
      });
  }
});
