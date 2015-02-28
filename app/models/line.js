import Ember from 'ember';

var Line = Ember.Object.extend({
  markAsContext: function() {
    if (this.get('type') === 'unchanged') {
      this.set('type', 'context');
    }
  }
});

Line.createComment = function(content) {
  return Line.create({
    content: content,
    type: 'comment',
  });
};

Line.createDeleted = function(content, deletedLineNum) {
  return Line.create({
    content: content,
    deletedLineNum: deletedLineNum,
    type: 'deleted',
  });
};

Line.createInserted = function(content, insertedLineNum) {
  return Line.create({
    content: content,
    insertedLineNum: insertedLineNum,
    type: 'inserted',
  });
};

Line.createUnchanged = function(content, deletedLineNum, insertedLineNum) {
  return Line.create({
    content: content,
    deletedLineNum: deletedLineNum,
    insertedLineNum: insertedLineNum,
    type: 'unchanged',
  });
};

export default Line;
