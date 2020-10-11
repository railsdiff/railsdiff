import Controller from "@ember/controller";
import { action } from "@ember/object";
import { Registry as ServiceRegistry, inject as service } from "@ember/service";

export default class IndexController extends Controller {
  @service("versions")
  versions!: ServiceRegistry["versions"];

  @action
  showDiff(event: Event) {
    event.preventDefault();
  }
}
