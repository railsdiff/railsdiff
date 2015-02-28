import Ember from 'ember';
import Line from './line';

var comment = /^\\/,
    deleted = /^\-/,
    inserted = /^\+/;

export default Ember.Object.extend({
  lines: Ember.computed('rawLines', function() {
    var deletedLineNum = 1,
        insertedLineNum = 1,
        previous = Ember.A([
            Line.create(),
            Line.create(),
            Line.create()
        ]);

    return this.get('rawLines').map(function(content) {
        var line;
        if (comment.test(content)) {
          return Line.createComment(content);
        } else if (deleted.test(content)) {
          line = Line.createDeleted(content, deletedLineNum++);
          previous.invoke('markAsContext');
          previous.shift();
          previous.push(line);
          return line;
        } else if (inserted.test(content)) {
          line = Line.createInserted(content, insertedLineNum++);
          previous.invoke('markAsContext');
          previous.shift();
          previous.push(line);
          return line;
        } else {
          line = Line.createUnchanged(content, deletedLineNum++, insertedLineNum++);
          if (previous.isAny('type', 'deleted') || previous.isAny('type', 'inserted')) {
            line.markAsContext();
          }
          previous.shift();
          previous.push(line);
          return line;
        }
      });
  })
});
