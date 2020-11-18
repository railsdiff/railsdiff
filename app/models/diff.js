import EmberObject from 'ember-object';
import Line from './line';
import computed from 'ember-computed';
import config from '../config/environment';

const { APP: { rawFileBaseUrl } } = config;

const comment = /^\\/;
const deleted = /^\-/;
const inserted = /^\+/;

export default EmberObject.extend({
  lines: computed('rawLines', function() {
    let deletedLineNum = 1;
    let insertedLineNum = 1;

    return this.get('rawLines').map(function(line) {
      const content = line.slice(1);
      const prefix = line.slice(0, 1);

      if (comment.test(prefix)) {
        return Line.create({
          content,
          prefix,
          type: 'comment',
        });
      } else if (deleted.test(prefix)) {
        return Line.create({
          content,
          deletedLineNum: deletedLineNum++,
          prefix,
          type: 'deleted',
        });
      } else if (inserted.test(prefix)) {
        return Line.create({
          content,
          insertedLineNum: insertedLineNum++,
          prefix,
          type: 'inserted',
        });
      } else {
        return Line.create({
          content,
          deletedLineNum: deletedLineNum++,
          insertedLineNum: insertedLineNum++,
          prefix,
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
