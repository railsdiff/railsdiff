import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('model:line');

test('it exists', function(assert) {
  var model = this.subject();
  assert.ok(!!model);
});

test('it returns content without prefix', function(assert) {
  var model = this.subject({
    content: ' foo'
  });
  assert.equal(model.get('contentWithoutPrefix'), 'foo');
});
