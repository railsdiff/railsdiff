import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { allVersions } from 'rails-diff/api/github';
import Version from 'rails-diff/models/version';
import compareVersions from 'rails-diff/utils/compare-versions';

export default class VersionsService extends Service {
  private _allVersions: Version[] = [];

  get all(): string[] {
    return this._allVersions.map((version) => version.toString());
  }

  @tracked
  source?: string = this.sources[0]?.toString();

  @tracked
  target?: string = this.targets[0]?.toString();

  get sources() {
    return this.all.slice(1).map((version) => version.toString());
  }

  get targets() {
    if (!this.source || this.all.length < 2) {
      return [];
    }

    const index = this.all.findIndex(
      (version) => version.toString() === this.source
    );

    return this.all.slice(0, index);
  }

  async load() {
    const tags = await allVersions();

    this.setVersions(
      tags
        .map((name) => {
          return new Version(name);
        })
        .sort(compareVersions)
        .reverse()
    );

    return this.all;
  }

  setSource(source: string) {
    if (!this.sources.includes(source)) {
      throw new Error('Given source version is unrecognized');
    }

    this.source = source;

    if (this.target && !this.targets.includes(this.target)) {
      const newTarget = this.targets[this.targets.length - 1];
      this.setTarget(newTarget);
    }
  }

  setTarget(target: string) {
    if (!this.targets.includes(target)) {
      throw new Error('Given target version is unrecognized');
    }
    this.target = target;
  }

  setVersions(versions: Version[]) {
    this._allVersions = versions;
  }
}

declare module '@ember/service' {
  interface Registry {
    versions: VersionsService;
  }
}
