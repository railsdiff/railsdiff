import Ember from 'ember';

export default Ember.Object.extend({
  version: Ember.computed.alias('id')
});
