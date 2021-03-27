import { Collection, Response, Server } from "miragejs";
import compare from "rails-diff/helpers/compare";

import AppRegistry from "./registry";

function paginate<T>(
  collection: Collection<T>,
  { number = 1, limit = 25 }
): Collection<T> {
  return collection.slice(limit * (number - 1), limit * number);
}

function normalize(number: number | string) {
  if (typeof number === "string") {
    number = parseInt(number, 10);
  }
  if (isNaN(number) || number < 1) {
    number = 1;
  }
  return number;
}

export default function (this: Server<AppRegistry>) {
  this.get("/repos/:ownerLogin/:repoName/tags", (schema, request) => {
    const repoFullName = `${request.params.ownerLogin}/${request.params.repoName}`;
    const repo = schema.findBy("repo", { name: repoFullName });

    if (!repo) {
      throw new Error(`Could not find repo with name ${repoFullName}`);
    }

    const limit = normalize(request.queryParams["per_page"]);
    const number = normalize(request.queryParams["page"]);
    const tags = paginate(repo.tags, { limit, number });
    const totalPages = Math.ceil(repo.tags.length / limit);
    const links: string[] = [];

    if (number > 1) {
      links.push(
        `</repos/${repo.name}/tags?page=${Math.min(
          number - 1,
          totalPages
        )}>; rel="prev"`
      );
    }

    if (number < totalPages) {
      links.push(
        `</repos/${repo.name}/tags?page=${Math.max(number + 1, 0)}>; rel="next"`
      );
    }

    return new Response(
      200,
      {
        "Content-Type": "application/json; charset=utf-8",
        Link: links.join(", "),
      },
      tags
    );
  });

  this.get(
    "/repos/:ownerLogin/:repoName/compare/:versions",
    async (schema, request) => {
      const [sourceVersion, targetVersion] = request.params.versions.split(
        "...",
        2
      );

      const repoFullName = `${request.params.ownerLogin}/${request.params.repoName}`;
      const repo = schema.findBy("repo", { name: repoFullName });

      if (!repo) {
        throw new Error(`Could not find repo with name ${repoFullName}`);
      }

      const sourceTag = repo.tags.models.find(
        (tag) => tag.name === sourceVersion
      );

      if (!sourceTag) {
        throw new Error(`Could not find source tag with name ${sourceVersion}`);
      }

      const targetTag = repo.tags.models.find(
        (tag) => tag.name === targetVersion
      );

      if (!targetTag) {
        throw new Error(`Could not find target tag with name ${targetVersion}`);
      }

      return new Response(
        200,
        { "Content-Type": "application/json; charset=utf-8" },
        await compare(sourceTag.files, targetTag.files)
      );
    }
  );
}
