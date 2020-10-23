import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import Patch from "rails-diff/models/patch";

interface Params {
  source: string;
  target: string;
}

export default class PatchRoute extends Route {
  @service("versions")
  versions!: ServiceRegistry["versions"];

  async model(params: Params) {
    this.versions.setSource(params.source);
    this.versions.setTarget(params.target);

    const files = await this.versions.loadPatch();
    const patch = new Patch(files);

    return {
      patch,
      sourceVersion: params.source,
      targetVersion: params.target,
    };
  }
}
