import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('model:diff', 'Diff', {
  // Specify the other units that are required for this test.
  needs: ['model:line']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
