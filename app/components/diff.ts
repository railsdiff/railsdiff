import { schedule } from "@ember/runloop";
import Component from "@glimmer/component";
import Diff from "rails-diff/models/diff";

interface Args {
  diff: Diff;
  linkedAnchor?: string;
  sourceVersion: string;
  targetVersion: string;
}

export default class DiffComponent extends Component<Args> {
  constructor(owner: unknown, args: Args) {
    super(owner, args);
    schedule("afterRender", this, this._scrollToLinked);
  }

  get isLinked(): boolean {
    return this.args.linkedAnchor === this.args.diff.anchor;
  }

  private _scrollToLinked() {
    if (!this.isLinked || !this.args.linkedAnchor) {
      return;
    }

    const element = document.getElementById(this.args.linkedAnchor);
    if (element) {
      element.scrollIntoView();
    }
  }
}
