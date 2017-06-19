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
  let paths = result.mapBy('filePath');
  assert.deepEqual(paths, ['Gemfile', 'config/routes.rb']);
});

test('sets source paths', function(assert) {
  let result = patchSplitter(patch);
  let paths = result.mapBy('sourceFilePath');
  assert.deepEqual(paths, ['v3.1.1/Gemfile', 'v3.1.1/config/routes.rb']);
});

test('sets target paths', function(assert) {
  let result = patchSplitter(patch);
  let paths = result.mapBy('targetFilePath');
  assert.deepEqual(paths, ['v3.2.6/Gemfile', 'v3.2.6/config/routes.rb']);
});

test('sets source versions', function(assert) {
  let result = patchSplitter(patch);
  let versions = result.mapBy('sourceVersion');
  assert.deepEqual(versions, ['3.1.1', '3.1.1']);
});

test('sets target versions', function(assert) {
  let result = patchSplitter(patch);
  let versions = result.mapBy('targetVersion');
  assert.deepEqual(versions, ['3.2.6', '3.2.6']);
});
