import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";

type Params = {
  source: string;
  target: string;
};

export default class PatchRoute extends Route {
  @service("versions")
  versions!: ServiceRegistry["versions"];

  async model(params: Params) {
    this.versions.setSource(params.source);
    this.versions.setTarget(params.target);

    return this.versions.loadDiff();
  }
}
