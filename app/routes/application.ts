import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import { Transition } from "rails-diff";

export default class ApplicationRoute extends Route {
  beforeModel(transition: Transition) {
    this.intl.setLocale(["en-us"]);

    super.beforeModel(transition);
  }

  constructor() {
    super(...arguments);

    this._router.on("routeDidChange", () => {
      const page = this._router.currentURL;
      const title = this._router.currentRouteName || "unknown";

      this._metrics.trackPage({ page, title });
    });
  }

  @service("intl")
  readonly intl!: ServiceRegistry["intl"];

  @service("metrics")
  private readonly _metrics!: ServiceRegistry["metrics"];

  async model() {
    return this.versions.load();
  }

  @service("router")
  private readonly _router!: ServiceRegistry["router"];

  @service("versions")
  readonly versions!: ServiceRegistry["versions"];
}
