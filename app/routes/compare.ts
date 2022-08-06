import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import { patch } from "rails-diff/api/github";
import Comparison from "rails-diff/models/comparison";
import Patch from "rails-diff/models/patch";
import { REPOSITORY } from "rails-diff/utils/environment";

interface CompareRouteParams {
  sourceVersion: string;
  targetVersion: string;
}

export default class CompareRoute extends Route<
  Comparison,
  CompareRouteParams
> {
  @service("router")
  private readonly _router!: ServiceRegistry["router"];

  @service("versions")
  private readonly _versions!: ServiceRegistry["versions"];

  afterModel(model: Comparison): void {
    this._versions.setSource(model.sourceVersion);
    this._versions.setTarget(model.targetVersion);
  }

  async model({
    sourceVersion,
    targetVersion,
  }: CompareRouteParams): Promise<Comparison> {
    if (
      !this._versions.all.includes(sourceVersion) ||
      !this._versions.all.includes(targetVersion)
    ) {
      this._router.replaceWith("index");
    }

    return new Comparison(
      sourceVersion,
      targetVersion,
      new Patch(await patch(sourceVersion, targetVersion, REPOSITORY))
    );
  }

  serialize(model: Comparison): CompareRouteParams {
    return {
      sourceVersion: model.sourceVersion,
      targetVersion: model.targetVersion,
    };
  }
}
