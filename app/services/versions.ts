import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import fetch from "fetch";
import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";
import config from "rails-diff/config/environment";
import Version from "rails-diff/models/version";
import compareVersions from "rails-diff/utils/compare-versions";

const Tag = t.interface({
  name: t.string,
});

const Tags = t.array(Tag);
type Tags = t.TypeOf<typeof Tags>;

const Status = t.intersection([
  t.interface({
    filename: t.string,
    sha: t.string,
    status: t.string,
  }),
  t.partial({
    patch: t.string,
  }),
]);

const Added = t.intersection([
  Status,
  t.interface({ status: t.literal("added") }),
]);

const Modified = t.intersection([
  Status,
  t.interface({ status: t.literal("modified") }),
]);

const Removed = t.intersection([
  Status,
  t.interface({ status: t.literal("removed") }),
]);

const Renamed = t.intersection([
  Status,
  t.interface({ previous_filename: t.string, status: t.literal("renamed") }),
]);

const FileCompare = t.union([Added, Modified, Removed, Renamed]);
export type FileCompare = t.TypeOf<typeof FileCompare>;

const Compare = t.interface({
  files: t.array(FileCompare),
});
export type Compare = t.TypeOf<typeof Compare>;

export default class VersionsService extends Service {
  private _allVersions: Version[] = [];

  private get _all() {
    return this._allVersions.map((version) => version.toString());
  }

  @tracked
  source?: string = this.sources.firstObject?.toString();

  @tracked
  target?: string = this.targets.firstObject?.toString();

  get sources() {
    return this._all.slice(1).map((version) => version.toString());
  }

  get targets() {
    if (!this.source || this._all.length < 2) {
      return [];
    }

    const index = this._all.findIndex(
      (version) => version.toString() === this.source
    );

    return this._all.slice(0, index);
  }

  async loadPatch() {
    const response = await fetch(
      `${config.APP.API_URL}/repos/${config.APP.REPOSITORY}/compare/v${this.source}...v${this.target}`
    );
    const responseBody = await response.json();
    const comparisons = Compare.decode(responseBody);

    if (isLeft(comparisons)) {
      throw new Error("Compare response is invalid");
    }

    return comparisons.right.files;
  }

  private async _loadPage(url: string, data: Tags = []) {
    const response = await fetch(url);
    const responseBody = await response.json();
    const tags = Tags.decode(responseBody);
    let linkHeader: string | null;

    if (isLeft(tags)) {
      throw new Error("Tags response is invalid");
    }

    data = data.concat(tags.right);

    if ((linkHeader = response.headers.get("link"))) {
      let nextUrl: RegExpExecArray | null;
      const next = linkHeader
        .split(",")
        .map((link) => link.trim())
        .find((link) => link.indexOf('rel="next"') > -1);

      if (next && (nextUrl = /<(.+)>/.exec(next))) {
        data = await this._loadPage(nextUrl[1], data);
      }
    }

    return data;
  }

  async load() {
    const tags = await this._loadPage(
      `${config.APP.API_URL}/repos/${config.APP.REPOSITORY}/tags?per_page=100`
    );

    this._allVersions = tags
      .map((tag) => tag.name)
      .filter((name) => name.indexOf("v") === 0)
      .map((name) => name.substring(1))
      .map((name) => {
        return new Version(name);
      })
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
