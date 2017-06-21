import EmberObject from 'ember-object';
import RSVP from 'rsvp';
import getOwner from 'ember-owner/get';

export default EmberObject.extend({
  buildRecord: function(name) {
    const Model = getOwner(this).factoryFor('model:' + name);
    return Model.create();
  },
  init: function() {
    this._super();
    this.cache = {};
  },
  find: function(name, id) {
    if (this.cache[name] && this.cache[name][id]) {
      return RSVP.resolve(this.cache[name][id]);
    }

    const adapter = getOwner(this).lookup('adapter:' + name);
    return adapter.find(this, name, id);
  },
  findAll: function(name) {
    const adapter = getOwner(this).lookup('adapter:' + name);
    return adapter.findAll(this, name);
  },
  recordForId: function(name, id) {
    if (this.cache[name] && this.cache[name][id]) {
      return this.cache[name][id];
    }
    const record = this.buildRecord(name);
    record.set('id', id);
    if (!this.cache[name]) {
      this.cache[name] = {};
    }
    this.cache[name][id] = record;
    return record;
  },
});
