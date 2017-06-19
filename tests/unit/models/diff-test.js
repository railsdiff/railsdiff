import { moduleFor, test } from 'ember-qunit';

moduleFor('model:diff', 'Unit | Model | diff');

test('it returns generated urls', function(assert) {
  const model = this.subject({
    filePath: 'Gemfile',
    sourceVersion: '3.1.1',
    targetVersion: '3.2.6',
  });
  assert.equal(model.get('sourceFileUrl'), 'https://github.com/railsdiff/api/raw/master/generated/v3.1.1/Gemfile');
  assert.equal(model.get('targetFileUrl'), 'https://github.com/railsdiff/api/raw/master/generated/v3.2.6/Gemfile');
});
