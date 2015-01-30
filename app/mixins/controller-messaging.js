import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    dismissMessage: function(message) {
      this.get('messages').removeObject(message);
      return this;
    },
  },
  addMessage: function(type, message) {
    this.get('messages').pushObject({type: type, message: message});
    return this;
  },
  init: function() {
    this._super();
    this.set('messages', Ember.A());
  }
});
