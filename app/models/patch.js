import Diff from './diff';
import Ember from 'ember';
import patchSplitter from '../utils/patch-splitter';

const { computed } = Ember;

const diffSorter = function(a, b) {
  const aPath = a.get('filePath');
  const bPath = b.get('filePath');

  if (aPath > bPath) { return 1; }
  if (aPath < bPath) { return -1; }
  return 0;
};

export default Ember.Object.extend({
  diffs: computed('raw', function() {
    return patchSplitter(this.get('raw')).map(function(diff) {
      return Diff.create(diff);
    }).sort(diffSorter);
  }),
});
