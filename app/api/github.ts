import { components } from "@octokit/openapi-types";
import { Octokit } from "octokit";
import { REPOSITORY } from "rails-diff/utils/environment";

type TagName = components["schemas"]["tag"]["name"];

export type PatchFile = Pick<
  components["schemas"]["diff-entry"],
  "filename" | "patch" | "previous_filename" | "sha" | "status"
>;

const octokit = new Octokit();

async function allTags(repository: string = REPOSITORY): Promise<TagName[]> {
  const [owner, repo] = repository.split("/", 2);
  let tagNames: TagName[] = [];

  for await (const response of octokit.paginate.iterator(
    octokit.rest.repos.listTags,
    { owner, per_page: 100, repo }
  )) {
    tagNames = tagNames.concat(response.data.map((data) => data.name));
  }

  return tagNames;
}

export async function allVersions(
  repository: string = REPOSITORY
): Promise<string[]> {
  const tagNames = await allTags(repository);

  return tagNames
    .filter((name) => name.indexOf("v") === 0)
    .map((name) => name.substring(1));
}

export async function patch(
  sourceVersion: string,
  targetVersion: string,
  repository: string = REPOSITORY
): Promise<PatchFile[]> {
  const [owner, repo] = repository.split("/", 2);
  let files: PatchFile[] = [];

  for await (const response of octokit.paginate.iterator(
    octokit.rest.repos.compareCommitsWithBasehead,
    {
      basehead: `v${sourceVersion}...v${targetVersion}`,
      owner,
      per_page: 100,
      repo,
    }
  )) {
    if (response.data.files) {
      files = files.concat(response.data.files);
    }
  }

  return files;
}
