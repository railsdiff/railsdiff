import Component from "@glimmer/component";
import { fileURL } from "rails-diff/api/github";

interface RawFileLinkSignature {
  Args: {
    Named: {
      path: string;
      version: string;
    };
  };
  Element: HTMLAnchorElement;
}

export default class RawFileLinkComponent extends Component<RawFileLinkSignature> {
  get url(): string {
    return fileURL(this.args.path, this.args.version);
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    RawFileLink: typeof RawFileLinkComponent;
  }
}
