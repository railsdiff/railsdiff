import { moduleFor, test } from 'ember-qunit';

moduleFor('model:diff', 'Unit | Model | diff');

test('it returns generated urls', function(assert) {
  const model = this.subject({
    sourceFilePath: 'v3.1.1/Gemfile',
    targetFilePath: 'v3.2.6/Gemfile'
  });
  assert.equal(model.get('sourceFileUrl'), 'https://github.com/railsdiff/api/raw/master/generated/v3.1.1/Gemfile');
  assert.equal(model.get('targetFileUrl'), 'https://github.com/railsdiff/api/raw/master/generated/v3.2.6/Gemfile');
});
