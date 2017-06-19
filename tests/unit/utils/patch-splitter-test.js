import patch from '../../fixtures/patch';
import patchSplitter from 'rails-diff/utils/patch-splitter';
import { module, test } from 'qunit';

module('Unit | Utility | patchSplitter');

test('returns object', function(assert) {
  const result = patchSplitter('');
  assert.ok(typeof result === 'object');
});

test('sets file paths', function(assert) {
  const result = patchSplitter(patch);
  const paths = result.mapBy('filePath');
  assert.deepEqual(paths, ['Gemfile', 'config/routes.rb']);
});

test('sets source paths', function(assert) {
  const result = patchSplitter(patch);
  const paths = result.mapBy('sourceFilePath');
  assert.deepEqual(paths, ['v3.1.1/Gemfile', 'v3.1.1/config/routes.rb']);
});

test('sets target paths', function(assert) {
  const result = patchSplitter(patch);
  const paths = result.mapBy('targetFilePath');
  assert.deepEqual(paths, ['v3.2.6/Gemfile', 'v3.2.6/config/routes.rb']);
});

test('sets source versions', function(assert) {
  const result = patchSplitter(patch);
  const versions = result.mapBy('sourceVersion');
  assert.deepEqual(versions, ['3.1.1', '3.1.1']);
});

test('sets target versions', function(assert) {
  const result = patchSplitter(patch);
  const versions = result.mapBy('targetVersion');
  assert.deepEqual(versions, ['3.2.6', '3.2.6']);
});
