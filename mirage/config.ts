import { Collection, Response, Server } from "miragejs";
import compare from "rails-diff/helpers/compare";

import AppRegistry from "./registry";

function paginate<T>(
  collection: Collection<T>,
  { number = 1, limit = 25 }
): Collection<T> {
  return collection.slice(limit * (number - 1), limit * number);
}

function normalize(
  number: unknown,
  options: { default: number } = { default: 1 }
): number {
  if (typeof number === "string") {
    const parsedNumber = parseInt(number, 10);
    if (isNaN(parsedNumber) || parsedNumber < 1) {
      return options.default;
    }
    return parsedNumber;
  } else if (typeof number === "number") {
    if (number < 1) {
      return options.default;
    }
    return number;
  }
  return options.default;
}

export default function (this: Server<AppRegistry>) {
  this.get("/repos/:ownerLogin/:repoName/tags", (schema, request) => {
    // eslint-disable-next-line ember/no-array-prototype-extensions
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

    const limit = normalize(request.queryParams?.per_page, { default: 25 });
    const number = normalize(request.queryParams?.page, { default: 1 });
    const tags = paginate(repo.tags, { limit, number });
    const totalPages = Math.ceil(repo.tags.length / limit);
    const links: string[] = [];

    if (number > 1) {
      links.push(
        `</repos/${owner.login}/${repo.name}/tags?page=${Math.min(
          number - 1,
          totalPages
        )}>; rel="prev"`
      );
    }

    if (number < totalPages) {
      links.push(
        `</repos/${owner.login}/${repo.name}/tags?page=${Math.max(
          number + 1,
          0
        )}>; rel="next"`
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

      // eslint-disable-next-line ember/no-array-prototype-extensions
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
