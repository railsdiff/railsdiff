import Ember from 'ember';

var cache = {};

export default Ember.Object.extend({
  find: function(name, id) {
    if (cache[name] && cache[name][id]) {
      return cache[name][id];
    }

    var adapter = this.container.lookup('adapter:' + name),
        modelConstructor = this.container.lookupFactory('model:' + name),
        model;
    return adapter.find(name, id).then(function(record) {
      cache[name] = cache[name] || {};
      model = cache[name][id] = modelConstructor && modelConstructor.create(record) || record;
      return model;
    });
  }
});
