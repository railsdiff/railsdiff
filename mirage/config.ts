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

    const diff = `diff -ur generated/${sourceVersion}/Gemfile generated/${targetVersion}/Gemfile
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
diff -ur generated/${sourceVersion}/config/routes.rb generated/${targetVersion}/config/routes.rb
index 2c8e7db..f01137d 100644
--- a/config/routes.rb
+++ b/config/routes.rb
@@ -54,5 +54,5 @@ App::Application.routes.draw do
-  # match ':controller(/:action(/:id(.:format)))'
+  # match ':controller(/:action(/:id))(.:format)'`;

    return new Response(
      200,
      { "Content-Type": "text/plain; charset=utf-8" },
      diff
    );
  });
}
