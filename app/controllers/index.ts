import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";

export default class IndexController extends Controller {
  @service("versions")
  versions!: ServiceRegistry["versions"];

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
    this.transitionToRoute(`/${this.versions.source}/${this.versions.target}`);
  }
}
