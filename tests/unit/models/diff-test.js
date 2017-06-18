import { moduleFor, test } from 'ember-qunit';

moduleFor('model:diff', 'Unit | Model | diff', {
  // Specify the other units that are required for this test.
  // needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  assert.ok(!!model);
});

test('it returns generated urls', function(assert) {
  let model = this.subject({
    sourceFilePath: 'v3.1.1/Gemfile',
    targetFilePath: 'v3.2.6/Gemfile'
  });
  assert.equal(model.get('sourceFileUrl'), 'https://github.com/railsdiff/api/raw/master/generated/v3.1.1/Gemfile');
  assert.equal(model.get('targetFileUrl'), 'https://github.com/railsdiff/api/raw/master/generated/v3.2.6/Gemfile');
});
