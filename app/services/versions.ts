import Service from "@ember/service";
import { tracked } from "@glimmer/tracking";
import compareVersions from "compare-versions";
import fetch from "fetch";
import { isLeft } from "fp-ts/lib/Either";
import * as t from "io-ts";

const Branch = t.interface({
  name: t.string,
});

const Branches = t.array(Branch);

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
      `/railsdiff/generated/compare/v${this.source}...v${this.target}.diff`
    );
    return response.text();
  }

  async load() {
    const response = await fetch("/repos/railsdiff/generated/branches");
    const responseBody = await response.json();
    const branches = Branches.decode(responseBody);

    if (isLeft(branches)) {
      throw new Error("Branches response is invalid");
    }

    this._all = branches.right
      .map((branch) => branch.name)
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
