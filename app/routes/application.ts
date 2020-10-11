import Route from "@ember/routing/route";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";
import compareVersions from "compare-versions";
import fetch from "fetch";
import { Transition } from "rails-diff";

interface Branch {
  name: string;
}

export default class ApplicationRoute extends Route {
  @service("intl")
  intl!: ServiceRegistry["intl"];

  beforeModel(transition: Transition) {
    this.intl.setLocale(["en-us"]);

    super.beforeModel(transition);
  }

  async model() {
    const response = await fetch("/repos/railsdiff/generated/branches");
    const branches = await (response.json() as Promise<Branch[]>);
    const branchNames = branches
      .map((branch) => branch.name)
      .filter((name) => name.indexOf("v") === 0)
      .map((name) => name.substring(1))
      .sort(compareVersions)
      .reverse();
    return branchNames;
  }
}
