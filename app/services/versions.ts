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
  @tracked
  all: string[] = [];

  @tracked
  source?: string = this.sources.firstObject;

  @tracked
  target?: string = this.targets.firstObject;

  get sources() {
    return this.all.slice(1);
  }

  get targets() {
    if (!this.source || this.all.length < 2) {
      return [];
    }

    return this.all.slice(0, this.all.indexOf(this.source));
  }

  async load() {
    const response = await fetch("/repos/railsdiff/generated/branches");
    const responseBody = await response.json();
    const branches = Branches.decode(responseBody);

    if (isLeft(branches)) {
      throw new Error("Branches response is invalid");
    }

    this.all = branches.right
      .map((branch) => branch.name)
      .filter((name) => name.indexOf("v") === 0)
      .map((name) => name.substring(1))
      .sort(compareVersions)
      .reverse();

    return this.all;
  }
}

declare module "@ember/service" {
  interface Registry {
    versions: VersionsService;
  }
}
