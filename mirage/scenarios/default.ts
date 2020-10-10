import { Server } from "miragejs";

import AppRegistry from "../registry";

export default function (server: Server<AppRegistry>) {
  const main = server.create("branch", { name: "main" });
  const v1_0_0 = server.create("branch", { name: "v1.0.0" });
  const v1_0_1 = server.create("branch", { name: "v1.0.1" });
  const v1_1_1 = server.create("branch", { name: "v1.1.1" });
  const v2_0_0 = server.create("branch", { name: "v2.0.0" });

  const repo = server.create("repo", {
    branches: [main, v1_0_0, v1_0_1, v1_1_1, v2_0_0],
    name: "generated",
  });

  server.create("owner", {
    login: "railsdiff",
    repos: [repo],
  });
}
