import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import { patch as GitHubPatch } from "rails-diff/api/github";
import Patch from "rails-diff/models/patch";
import { REPOSITORY } from "rails-diff/utils/environment";

interface CompareRouteParams {
  sourceVersion: string;
  targetVersion: string;
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

  async model({
    sourceVersion,
    targetVersion,
  }: CompareRouteParams): Promise<CompareRouteModel> {
    this._versions.setSource(sourceVersion);
    this._versions.setTarget(targetVersion);

    const files = await GitHubPatch(sourceVersion, targetVersion, REPOSITORY);
    const patch = new Patch(files);

    return {
      patch,
      sourceVersion,
      targetVersion,
    };
  }
}
