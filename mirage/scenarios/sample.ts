import { Server } from "miragejs";
import config from "rails-diff/config/environment";

import AppRegistry from "../registry";

export default function (server: Server<AppRegistry>) {
  const main = server.create("tag", { name: "main" });
  const v1_0_0 = server.create("tag", { name: "v1.0.0" });
  const v1_0_1 = server.create("tag", {
    files: {
      Gemfile: `ruby '2.5.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.3'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
# Use Puma as the app server
`,
    },
    name: "v1.0.1",
  });
  const v1_1_1 = server.create("tag", {
    files: {
      Gemfile: `ruby '2.5.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails', branch: 'main'
gem 'rails', '~> 6.1.3', '>= 6.1.3.1'
# Use sqlite3 as the database for Active Record
gem 'sqlite3', '~> 1.4'
# Use Puma as the app server
`,
      "README.markdown": `# Welcome to RailsDiff
`,
    },
    name: "v1.1.1",
  });
  const v2_0_0 = server.create("tag", {
    files: {
      "README.markdown": `# Welcome to RailsDiff 👋

If you'd like to contribute, see https://github.com/railsdiff/railsdiff. 😍
`,
    },
    name: "v2.0.0",
  });

  const repo = server.create("repo", {
    tags: [main, v1_0_0, v1_0_1, v1_1_1, v2_0_0],
    name: config.APP.GITHUB_REPOSITORY,
  });

  server.create("owner", {
    login: config.APP.GITHUB_OWNER,
    repos: [repo],
  });
}
