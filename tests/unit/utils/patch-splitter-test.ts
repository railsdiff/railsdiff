import { module, test } from "qunit";
import patchSplitter from "rails-diff/utils/patch-splitter";

const patch = `diff -ur generated/v3.1.1/Gemfile generated/v3.2.6/Gemfile
index 0a5b233..0ace91f 100644
--- a/Gemfile
+++ b/Gemfile
@@ -1,9 +1,9 @@
-source 'http://rubygems.org'
+source 'https://rubygems.org'
-gem 'rails', '3.1.2'
+gem 'rails', '3.2.6'
@@ -11,8 +11,12 @@ gem 'sqlite3'
-  gem 'sass-rails',   '~> 3.1.5.rc.2'
-  gem 'coffee-rails', '~> 3.1.1'
+  gem 'sass-rails',   '~> 3.2.3'
+  gem 'coffee-rails', '~> 3.2.1'
diff -ur generated/v3.1.1/config/routes.rb generated/v3.2.6/config/routes.rb
index 2c8e7db..f01137d 100644
--- a/config/routes.rb
+++ b/config/routes.rb
@@ -54,5 +54,5 @@ App::Application.routes.draw do
-  # match ':controller(/:action(/:id(.:format)))'
+  # match ':controller(/:action(/:id))(.:format)'
`;

module("Unit | Utils | patchSplitter", () => {
  test("returns array", function (assert) {
    const result = patchSplitter("");
    assert.ok(result instanceof Array);
  });

  test("sets file paths", function (assert) {
    const result = patchSplitter(patch);
    const paths = result.mapBy("filePath");
    assert.deepEqual(paths, ["Gemfile", "config/routes.rb"]);
  });

  test("sets source versions", function (assert) {
    const result = patchSplitter(patch);
    const versions = result.mapBy("sourceVersion");
    assert.deepEqual(versions, ["3.1.1", "3.1.1"]);
  });

  test("sets target versions", function (assert) {
    const result = patchSplitter(patch);
    const versions = result.mapBy("targetVersion");
    assert.deepEqual(versions, ["3.2.6", "3.2.6"]);
  });
});
