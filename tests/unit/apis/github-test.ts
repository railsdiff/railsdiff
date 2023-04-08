import { module, test } from 'qunit';
import { allVersions, patch } from 'rails-diff/api/github';
import { REPOSITORY } from 'rails-diff/utils/environment';

import sample from '../../../mirage/scenarios/sample';
import { setupApplicationTest } from '../../helpers';

module('Unit | APIs | GitHub', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(() => {
    sample(server);
  });

  module('#allVersions', function () {
    test('includes all known versions', async function (assert) {
      const versions = await allVersions(REPOSITORY);

      assert.deepEqual(versions, ['1.0.0', '1.0.1', '1.1.1', '2.0.0']);
    });
  });

  module('#patch', function () {
    test('returns expected results', async function (assert) {
      const result = await patch('1.0.0', '1.0.1', REPOSITORY);

      assert.deepEqual(result, [
        {
          filename: 'Gemfile',
          patch: `@@ -0,0 +1,7 @@
+ruby '2.5.0'
+
+# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
+gem 'rails', '~> 6.1.3'
+# Use sqlite3 as the database for Active Record
+gem 'sqlite3', '~> 1.4'
+# Use Puma as the app server
`,
          sha: 'de3150c01c3a946a6168173c4116741379fe3579',
          status: 'added',
        },
      ]);
    });
  });
});
