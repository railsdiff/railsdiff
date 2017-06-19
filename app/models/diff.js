import Ember from 'ember';
import Line from './line';
import config from '../config/environment';

const { computed } = Ember;
const { APP: { rawFileBaseUrl } } = config;

const comment = /^\\/;
const deleted = /^\-/;
const inserted = /^\+/;

export default Ember.Object.extend({
  lines: computed('rawLines', function() {
    let deletedLineNum = 1;
    let insertedLineNum = 1;

    return this.get('rawLines').map(function(line) {
      if (comment.test(line)) {
        return Line.create({
          content: line,
          type: 'comment',
        });
      } else if (deleted.test(line)) {
        return Line.create({
          content: line,
          deletedLineNum: deletedLineNum++,
          type: 'deleted',
        });
      } else if (inserted.test(line)) {
        return Line.create({
          content: line,
          insertedLineNum: insertedLineNum++,
          type: 'inserted',
        });
      } else {
        return Line.create({
          content: line,
          deletedLineNum: deletedLineNum++,
          insertedLineNum: insertedLineNum++,
          type: 'unchanged',
        });
      }
    });
  }),
  sourceFileUrl: computed('filePath', 'sourceVersion', function() {
    const { filePath, sourceVersion } = this.getProperties('filePath', 'sourceVersion');
    return `${rawFileBaseUrl}v${sourceVersion}/${filePath}`;
  }),
  targetFileUrl: computed('filePath', 'targetVersion', function() {
    const { filePath, targetVersion } = this.getProperties('filePath', 'targetVersion');
    return `${rawFileBaseUrl}v${targetVersion}/${filePath}`;
  }),
});
