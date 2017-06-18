import patchSplitter from 'rails-diff/utils/patch-splitter';
import { module, test } from 'qunit';
import patch from '../../fixtures/patch';

module('Unit | Utility | patchSplitter');

test('returns object', function(assert) {
  let result = patchSplitter('');
  assert.ok(typeof result === 'object');
});

test('sets file paths', function(assert) {
  let result = patchSplitter(patch);
  let paths = result.diffs.mapBy('filePath');
  assert.deepEqual(paths, ['Gemfile', 'config/routes.rb']);
});

test('sets source paths', function(assert) {
  let result = patchSplitter(patch);
  let paths = result.diffs.mapBy('sourceFilePath');
  assert.deepEqual(paths, ['v3.1.1/Gemfile', 'v3.1.1/config/routes.rb']);
});

test('sets target paths', function(assert) {
  let result = patchSplitter(patch);
  let paths = result.diffs.mapBy('targetFilePath');
  assert.deepEqual(paths, ['v3.2.6/Gemfile', 'v3.2.6/config/routes.rb']);
});

test('sets versions', function(assert) {
  let result = patchSplitter(patch);
  assert.equal(result.sourceVersion, '3.1.1');
  assert.equal(result.targetVersion, '3.2.6');
});
