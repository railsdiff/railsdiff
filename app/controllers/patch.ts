import Controller from "@ember/controller";

export default class PatchController extends Controller {
  get linkedAnchor(): string | undefined {
    return document.URL.split("#", 2)[1];
  }
}
