import Ember from 'ember';

export default Ember.Object.extend({
  buildRecord: function(name) {
    const Model = Ember.getOwner(this).factoryFor('model:' + name);
    return Model.create();
  },
  init: function() {
    this._super();
    this.cache = {};
  },
  find: function(name, id) {
    if (this.cache[name] && this.cache[name][id]) {
      return Ember.RSVP.resolve(this.cache[name][id]);
    }

    const adapter = Ember.getOwner(this).lookup('adapter:' + name);
    return adapter.find(this, name, id);
  },
  findAll: function(name) {
    const adapter = Ember.getOwner(this).lookup('adapter:' + name);
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
