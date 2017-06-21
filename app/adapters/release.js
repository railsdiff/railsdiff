import EmberObject from 'ember-object';
import config from '../config/environment';
import injectService from 'ember-service/inject';

export default EmberObject.extend({
  ajax: injectService(),

  findAll: function(store, name) {
    return this.get('ajax').request(`${config.APP.apiHost}/versions`, {dataType: 'text'})
      .then(function(result) {
        return result.split('\n').reverse().map(function(version) {
          return store.recordForId(name, version);
        });
      });
  },
});
