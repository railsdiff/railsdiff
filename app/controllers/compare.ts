import Controller from "@ember/controller";
import CompareRoute from "rails-diff/routes/compare";
import { REPOSITORY } from "rails-diff/utils/environment";

function githubURL(version: string): string {
  return `https://github.com/${REPOSITORY}/tree/v${version}`;
}

export default class CompareController extends Controller {
  declare model: Awaited<ReturnType<CompareRoute["model"]>>;

  get comparison(): Awaited<ReturnType<CompareRoute["model"]>> {
    return this.model;
  }

  get linkedAnchor(): string | undefined {
    return document.URL.split("#", 2)[1];
  }

  get sourceURL(): string {
    return githubURL(this.comparison.sourceVersion);
  }

  get targetURL(): string {
    return githubURL(this.comparison.targetVersion);
  }
}

declare module "@ember/controller" {
  interface Registry {
    compare: CompareController;
  }
}
