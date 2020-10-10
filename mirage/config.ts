import { Server } from "miragejs";

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
}
