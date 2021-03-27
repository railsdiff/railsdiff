import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class PatchController extends Controller {
  @action
  scrollToLinked(isLinked: boolean, element: Element): void {
    if (isLinked) {
      element.scrollIntoView();
    }
  }
}
