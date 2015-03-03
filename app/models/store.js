import Ember from 'ember';

export default Ember.Object.extend({
  buildRecord: function(name) {
    var Model = this.container.lookupFactory('model:' + name);
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

    var adapter = this.container.lookup('adapter:' + name);
    return adapter.find(this, name, id);
  },
  findAll: function(name) {
    var adapter = this.container.lookup('adapter:' + name);
    return adapter.findAll(this, name);
  },
  recordForId: function(name, id) {
    if (this.cache[name] && this.cache[name][id]) {
      return this.cache[name][id];
    }
    var record = this.buildRecord(name);
    record.set('id', id);
    if (!this.cache[name]) {
      this.cache[name] = {};
    }
    this.cache[name][id] = record;
    return record;
  },
});
