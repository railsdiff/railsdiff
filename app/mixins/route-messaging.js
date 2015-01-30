import Ember from 'ember';

export default Ember.Mixin.create({
  addMessage: function(type, message) {
    this.controllerFor('application').addMessage(type, message);
    return this;
  }
});
