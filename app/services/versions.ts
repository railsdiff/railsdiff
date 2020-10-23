import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import fetch from "fetch";
import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import config from "rails-diff/config/environment";
import compareVersions from "rails-diff/utils/compare-versions";

const Tag = t.interface({
  name: t.string,
});

const Tags = t.array(Tag);

const FileCompare = t.interface({
  filename: t.string,
  patch: t.string,
});

const Compare = t.interface({
  files: t.array(FileCompare),
});

export type FileCompare = t.TypeOf<typeof FileCompare>;

export default class VersionsService extends Service {
  private _all: string[] = [];

  @tracked
  source?: string = this.sources.firstObject;

  @tracked
  target?: string = this.targets.firstObject;

  get sources() {
    return this._all.slice(1);
  }

  get targets() {
    if (!this.source || this._all.length < 2) {
      return [];
    }

    return this._all.slice(0, this._all.indexOf(this.source));
  }

  async loadPatch() {
    const response = await fetch(
      `${config.APP.API_URL}/repos/${config.APP.GITHUB_OWNER}/${config.APP.GITHUB_REPOSITORY}/compare/v${this.source}...v${this.target}`
    );
    const responseBody = await response.json();
    const comparisons = Compare.decode(responseBody);

    if (isLeft(comparisons)) {
      throw new Error("Compare response is invalid");
    }

    return comparisons.right.files;
  }

  async load() {
    const response = await fetch(
      `${config.APP.API_URL}/repos/${config.APP.GITHUB_OWNER}/${config.APP.GITHUB_REPOSITORY}/tags`
    );
    const responseBody = await response.json();
    const tags = Tags.decode(responseBody);

    if (isLeft(tags)) {
      throw new Error("Tags response is invalid");
    }

    this._all = tags.right
      .map((tag) => tag.name)
      .filter((name) => name.indexOf("v") === 0)
      .map((name) => name.substring(1))
      .sort(compareVersions)
      .reverse();

    return this._all;
  }

  setSource(source: string) {
    if (!this.sources.includes(source)) {
      throw new Error("Given source version is unrecognized");
    }
    this.source = source;
  }

  setTarget(target: string) {
    if (!this.targets.includes(target)) {
      throw new Error("Given target version is unrecognized");
    }
    this.target = target;
  }
}

declare module "@ember/service" {
  interface Registry {
    versions: VersionsService;
  }
}
