import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import Patch from "rails-diff/models/patch";

interface CompareRouteParams {
  source: string;
  target: string;
}

type CompareRouteModel = {
  patch: Patch;
  sourceVersion: string;
  targetVersion: string;
};

export default class CompareRoute extends Route<
  CompareRouteModel,
  CompareRouteParams
> {
  @service("versions")
  private readonly _versions!: ServiceRegistry["versions"];

  async model(params: CompareRouteParams): Promise<CompareRouteModel> {
    this._versions.setSource(params.source);
    this._versions.setTarget(params.target);

    const files = await this._versions.loadPatch();
    const patch = new Patch(files);

    return {
      patch,
      sourceVersion: params.source,
      targetVersion: params.target,
    };
  }
}
