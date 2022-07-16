import Component from "@glimmer/component";
import { FILE_URL, REPOSITORY } from "rails-diff/utils/environment";

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
    return `${FILE_URL}/${REPOSITORY}/blob/v${this.args.version}/${this.args.path}`;
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    RawFileLink: typeof RawFileLinkComponent;
  }
}
