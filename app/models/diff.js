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
      let typeChar = line.substring(0, 1)
      let content = line.substr(1);
      if (comment.test(line)) {
        return Line.create({
          content: content,
          type: 'comment',
          typeChar: typeChar,
        });
      } else if (deleted.test(line)) {
        return Line.create({
          content: content,
          deletedLineNum: deletedLineNum++,
          type: 'deleted',
          typeChar: typeChar,
        });
      } else if (inserted.test(line)) {
        return Line.create({
          content: content,
          insertedLineNum: insertedLineNum++,
          type: 'inserted',
          typeChar: typeChar,
        });
      } else {
        return Line.create({
          content: content,
          deletedLineNum: deletedLineNum++,
          insertedLineNum: insertedLineNum++,
          type: 'unchanged',
          typeChar: typeChar,
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
