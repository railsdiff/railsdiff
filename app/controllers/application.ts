import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class ApplicationController extends Controller {
  model!: string[];

  @tracked
  sourceVersion?: string = this.sourceVersions.firstObject;

  get sourceVersions() {
    return this.model.slice(1);
  }

  @tracked
  targetVersion?: string = this.targetVersions.firstObject;

  get targetVersions() {
    if (!this.sourceVersion) {
      return [];
    }

    const sourceIndex = this.model.indexOf(this.sourceVersion);

    return this.model.slice(0, sourceIndex);
  }

  @action
  showDiff(event: Event) {
    event.preventDefault();
  }
}
