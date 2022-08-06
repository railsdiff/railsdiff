import Controller from "@ember/controller";
import CompareRoute from "rails-diff/routes/compare";

export default class CompareController extends Controller {
  declare model: Awaited<ReturnType<CompareRoute["model"]>>;

  get comparison(): Awaited<ReturnType<CompareRoute["model"]>> {
    return this.model;
  }

  get linkedAnchor(): string | undefined {
    return document.URL.split("#", 2)[1];
  }
}

declare module "@ember/controller" {
  interface Registry {
    compare: CompareController;
  }
}
