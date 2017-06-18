import { moduleFor, test } from 'ember-qunit';

moduleFor('model:patch', 'Unit | Model | patch', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('gets versions from splitted patch', function(assert) {
  let patch = this.subject({
    _splittedPatch: {
      sourceVersion: '3.1.1',
      targetVersion: '3.2.6'
    }
  });
  assert.equal(patch.get('sourceVersion'), '3.1.1');
  assert.equal(patch.get('targetVersion'), '3.2.6');
});
