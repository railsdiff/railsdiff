/* global Prism */
import Ember from 'ember';

var grammar = {
  'deleted': /^\-.*$/m,
  'inserted': /^\+.*$/m,
};

export default Ember.Object.extend({
  lines: Ember.computed('tokens', function() {
    var deletedLineNum = 1,
        insertedLineNum = 1,
        lineConstructor = this.container.lookupFactory('model:line');

    return this.get('tokens').map(function(token) {
      if (Ember.typeOf(token) === 'string') {
        return lineConstructor.create({
          deletedLineNum: deletedLineNum++,
          insertedLineNum: insertedLineNum++,
          content: token,
          type: 'unchanged',
        });
      } else if (token.type === 'deleted') {
        return lineConstructor.create({
          content: token.content,
          deletedLineNum: deletedLineNum++,
          type: token.type,
        });
      } else {
        return lineConstructor.create({
          content: token.content,
          insertedLineNum: insertedLineNum++,
          type: token.type,
        });
      }
    });
  }),
  tokens: Ember.computed('content', function() {
    return Prism.tokenize(this.get('content'), grammar)
      .reduce(function(array, token) {
        if (Ember.typeOf(token) === 'string') {
          token.split('\n')
            .filter(function(string) { return string !== ''; })
            .forEach(function(string) { array.pushObject(string); });
        } else {
          array.pushObject(token);
        }
        return array;
      }, Ember.A());
  })
});
