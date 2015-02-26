import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('model:patch', 'Patch', {
  // Specify the other units that are required for this test.
  needs: ['model:diff']
});

test('it exists', function(assert) {
  var model = this.subject();
  // var store = this.store();
  assert.ok(!!model);
});
