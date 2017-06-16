import Ember from 'ember';
import Line from './line';

var comment = /^\\/,
    deleted = /^\-/,
    inserted = /^\+/;

export default Ember.Object.extend({
  lines: Ember.computed('rawLines', function() {
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
  })
});
