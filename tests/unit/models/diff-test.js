import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('model:diff', 'Diff', {
});

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('it raw lines into model instances', function(assert) {
  var rawLines = [
    '-deleted',
    '+inserted',
  ];
  var lines = this.subject({rawLines: rawLines}).get('lines');
  assert.equal(lines[0].get('type'), 'deleted');
  assert.equal(lines[1].get('type'), 'inserted');
});

test('it marks lines as context', function(assert) {
  var rawLines = [
    ' not context',
    ' context 1',
    ' context 2',
    ' context 3',
    '+inserted',
    ' context 3',
    ' context 2',
    ' context 1',
    ' not context',
  ];
  var lines = this.subject({rawLines: rawLines}).get('lines');
  assert.equal(lines[0].get('type'), 'unchanged');
  assert.equal(lines[1].get('type'), 'context');
  assert.equal(lines[2].get('type'), 'context');
  assert.equal(lines[3].get('type'), 'context');
  assert.equal(lines[4].get('type'), 'inserted');
  assert.equal(lines[5].get('type'), 'context');
  assert.equal(lines[6].get('type'), 'context');
  assert.equal(lines[7].get('type'), 'context');
  assert.equal(lines[8].get('type'), 'unchanged');
});
