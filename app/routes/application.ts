import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import { Transition } from "rails-diff";

type ApplicationRouteModel = string[];

export default class ApplicationRoute extends Route<ApplicationRouteModel> {
  beforeModel(transition: Transition) {
    this._intl.setLocale(["en-us"]);

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
  private readonly _intl!: ServiceRegistry["intl"];

  @service("metrics")
  private readonly _metrics!: ServiceRegistry["metrics"];

  async model(): Promise<ApplicationRouteModel> {
    return this._versions.load();
  }

  @service("router")
  private readonly _router!: ServiceRegistry["router"];

  @service("versions")
  private readonly _versions!: ServiceRegistry["versions"];
}
