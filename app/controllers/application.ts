import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import ApplicationRoute from "rails-diff/routes/application";

export default class ApplicationController extends Controller {
  declare model: Awaited<ReturnType<ApplicationRoute["model"]>>;

  @service("router")
  private readonly _router!: ServiceRegistry["router"];

  @action
  setSource(source: string) {
    this.versions.setSource(source);
  }

  @action
  setTarget(target: string) {
    this.versions.setTarget(target);
  }

  @action
  showDiff(event: Event) {
    event.preventDefault();
    this._router.transitionTo(
      `/${this.versions.source}/${this.versions.target}`
    );
  }

  @service("versions")
  readonly versions!: ServiceRegistry["versions"];
}

declare module "@ember/controller" {
  interface Registry {
    application: ApplicationController;
  }
}
