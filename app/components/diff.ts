import { schedule } from "@ember/runloop";
import Component from "@glimmer/component";
import Diff from "rails-diff/models/diff";

interface DiffSignature {
  Args: {
    Named: {
      diff: Diff;
      linkedAnchor?: string;
      sourceVersion: string;
      targetVersion: string;
    };
  };
}

export default class DiffComponent extends Component<DiffSignature> {
  constructor(owner: unknown, args: DiffSignature["Args"]["Named"]) {
    super(owner, args);
    schedule("afterRender", this, this._scrollToLinked);
  }

  get isLinked(): boolean {
    return this.args.linkedAnchor === this.args.diff.anchor;
  }

  private _scrollToLinked(): void {
    if (!this.isLinked || !this.args.linkedAnchor) {
      return;
    }

    const element = document.getElementById(this.args.linkedAnchor);
    if (element) {
      element.scrollIntoView();
    }
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    Diff: typeof DiffComponent;
  }
}
