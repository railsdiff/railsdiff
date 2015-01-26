import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    transition: function() {
      this.transitionToRoute('patch', this.get('sourceVersion'), this.get('targetVersion'));
    }
  },
  sourceVersion: null,
  sources: Ember.computed('model', function() {
    return Ember.keys(this.get('model')).reverse();
  }),
  targetVersion: null,
  targets: Ember.computed('model', 'sourceVersion', function() {
    var sourceVersion = this.get('sourceVersion');
    if (!sourceVersion) { return []; }
    return this.get('model')[sourceVersion].reverse();
  })
});
