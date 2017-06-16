import Ember from 'ember';

export default Ember.Component.extend({
  change(event) {
    this.sendAction('didChange', event.target.value);
  },
  tagName: 'select',
});
