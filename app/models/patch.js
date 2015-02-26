import Ember from 'ember';
import patchSplitter from '../utils/patch-splitter';

export default Ember.Object.extend({
  diffs: Ember.computed('raw', function() {
    var Diff = this.container.lookupFactory('model:diff');
    return patchSplitter(this.get('raw')).map(function(diff) {
      return Diff.create(diff);
    });
  })
});
