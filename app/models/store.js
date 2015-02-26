import Ember from 'ember';

var cache = {};

export default Ember.Object.extend({
  find: function(name, id) {
    if (cache[name] && cache[name][id]) {
      return Ember.RSVP.resolve(cache[name][id]);
    }

    var Model = this.container.lookupFactory('model:' + name),
        adapter = this.container.lookup('adapter:' + name),
        model;
    return adapter.find(name, id).then(function(record) {
      cache[name] = cache[name] || {};
      model = cache[name][id] = Model && Model.create(record) || record;
      return model;
    });
  }
});
