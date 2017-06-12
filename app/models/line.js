import Ember from 'ember';

export default Ember.Object.extend({
  contentWithoutPrefix: Ember.computed('content', function() {
    return this.get('content').slice(1);
  })
});
