import EmberObject from 'ember-object';
import config from '../config/environment';
import injectService from 'ember-service/inject';

export default EmberObject.extend({
  ajax: injectService(),

  find: function(store, name, id) {
    return this.get('ajax').request(`${config.APP.apiHost}/${id}`, {dataType: 'text'})
      .then(function(result) {
        const record = store.recordForId(name, id);
        record.set('raw', result);
        return record;
      });
  }
});
