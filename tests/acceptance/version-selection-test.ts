import { visit } from '@ember/test-helpers';
import { findControl, select } from 'ember-semantic-test-helpers/test-support';
import { module, test } from 'qunit';

import sample from '../../mirage/scenarios/sample';
import { setupApplicationTest } from '../helpers';

function getVersions(label: string) {
  const control = findControl(label) as HTMLSelectElement;
  if (!control) {
    throw new Error(`Control labelled ${label} could not be found`);
  }
  return [...control.options].map((option) => option.label);
}

module('Acceptance | version selection', (hooks) => {
  setupApplicationTest(hooks);

  hooks.beforeEach(() => {
    sample(server);
  });

  test("source versions include only branch names beginning with 'v'", async function (assert) {
    await visit('/');

    const sourceVersions = getVersions('Source');
    assert.notOk(sourceVersions.includes('main'));
  });

  test('source versions do not include the latest version', async function (assert) {
    await visit('/');

    assert.notOk(getVersions('Source').includes('2.0.0'));
  });

  test('source versions are listed in descending order', async function (assert) {
    await visit('/');

    assert.deepEqual(getVersions('Source'), ['1.1.1', '1.0.1', '1.0.0']);
  });

  test('target versions include only versions greater than the selected source version', async function (assert) {
    await visit('/');

    assert.deepEqual(getVersions('Target'), ['2.0.0']);

    await select('Source', '1.0.1');

    assert.deepEqual(getVersions('Target'), ['2.0.0', '1.1.1']);
  });

  test('target versions are listed in descending order', async function (assert) {
    await visit('/');
    await select('Source', '1.0.0');

    assert.deepEqual(getVersions('Target'), ['2.0.0', '1.1.1', '1.0.1']);
  });

  test('header selection and landing page selection are bound together', async function (assert) {
    await visit('/');
    await select('Source', '1.0.0');
    await select('Target', '2.0.0');

    const sourceSelect = findControl(
      'What version of Rails are you currently using?'
    ) as HTMLSelectElement | undefined;

    const targetSelect = findControl(
      'What version of Rails do you want to upgrade to?'
    ) as HTMLSelectElement | undefined;

    assert.strictEqual(sourceSelect?.selectedOptions[0].text, '1.0.0');
    assert.strictEqual(targetSelect?.selectedOptions[0].text, '2.0.0');

    await select('Source', '1.0.1');
    await select('Target', '1.1.1');

    assert.strictEqual(sourceSelect?.selectedOptions[0].text, '1.0.1');
    assert.strictEqual(targetSelect?.selectedOptions[0].text, '1.1.1');
  });
});
