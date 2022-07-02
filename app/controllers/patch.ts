import Controller from "@ember/controller";
import PatchRoute from "rails-diff/routes/patch";

export default class PatchController extends Controller {
  declare model: Awaited<ReturnType<PatchRoute["model"]>>;

  get linkedAnchor(): string | undefined {
    return document.URL.split("#", 2)[1];
  }
}

declare module "@ember/controller" {
  interface Registry {
    patch: PatchController;
  }
}
