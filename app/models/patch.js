import Diff from './diff';
import EmberObject from 'ember-object';
import computed from 'ember-computed';
import patchSplitter from '../utils/patch-splitter';

const diffSorter = function(a, b) {
  const aPath = a.get('filePath');
  const bPath = b.get('filePath');

  if (aPath > bPath) { return 1; }
  if (aPath < bPath) { return -1; }
  return 0;
};

export default EmberObject.extend({
  diffs: computed('raw', function() {
    return patchSplitter(this.get('raw')).map(function(diff) {
      return Diff.create(diff);
    }).sort(diffSorter);
  }),
});
