import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    this.replaceWith('3.1.4', '3.1.5');
  },
});
