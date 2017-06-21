import Mixin from 'ember-metal/mixin';

export default Mixin.create({
  addMessage: function(type, message) {
    this.controllerFor('application').addMessage(type, message);
    return this;
  }
});
