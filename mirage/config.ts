import { Response, Server } from "miragejs";

import AppRegistry from "./registry";

export default function (this: Server<AppRegistry>) {
  this.get("/repos/:ownerLogin/:repoName/branches", (schema, request) => {
    const owner = schema.findBy("owner", { login: request.params.ownerLogin });

    if (!owner) {
      throw new Error(
        `Could not find owner with login ${request.params.ownerLogin}`
      );
    }

    const repo = owner.repos.models.find(
      (repo) => repo.name === request.params.repoName
    );

    if (!repo) {
      throw new Error(
        `Could not find repo with name ${request.params.repoName}`
      );
    }

    return repo.branches;
  });

  this.get("/:ownerLogin/:repoName/compare/:versions", (schema, request) => {
    const [sourceVersion, targetVersion] = request.params.versions
      .substring(0, request.params.versions.indexOf(".diff"))
      .split("...", 2);

    const owner = schema.findBy("owner", {
      login: request.params.ownerLogin,
    });

    if (!owner) {
      throw new Error(
        `Could not find owner with login ${request.params.ownerLogin}`
      );
    }

    const repo = owner.repos.models.find(
      (repo) => repo.name === request.params.repoName
    );

    if (!repo) {
      throw new Error(
        `Could not find repo with name ${request.params.repoName}`
      );
    }

    const sourceBranch = repo.branches.models.find(
      (branch) => branch.name === sourceVersion
    );

    if (!sourceBranch) {
      throw new Error(
        `Could not find source branch with name ${sourceVersion}`
      );
    }

    const targetBranch = repo.branches.models.find(
      (branch) => branch.name === targetVersion
    );

    if (!targetBranch) {
      throw new Error(
        `Could not find target branch with name ${targetVersion}`
      );
    }

    const diff = `
diff --git a/spec/my/gem_spec.rb b/spec/my/gem_spec.rb
index 1012309..7744ae3 100644
--- a/spec/my/gem_spec.rb
+++ b/spec/my/gem_spec.rb
@@ -1,3 +1,5 @@
+# frozen_string_literal: true
+
  RSpec.describe My::Gem do
    it "has a version number" do
      expect(My::Gem::VERSION).not_to be nil
diff --git a/spec/spec_helper.rb b/spec/spec_helper.rb
index 3212e9e..711f9f1 100644
--- a/spec/spec_helper.rb
+++ b/spec/spec_helper.rb
@@ -1,4 +1,5 @@
-require "bundler/setup"
+# frozen_string_literal: true
+
  require "my/gem"

  RSpec.configure do |config|
`;
    return new Response(
      200,
      { "Content-Type": "text/plain; charset=utf-8" },
      diff
    );
  });
}
