import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import { Transition } from "rails-diff";

export default class ApplicationRoute extends Route {
  @service("intl")
  intl!: ServiceRegistry["intl"];

  beforeModel(transition: Transition) {
    this.intl.setLocale(["en-us"]);

    super.beforeModel(transition);
  }
}
