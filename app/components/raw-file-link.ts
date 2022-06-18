import Component from "@glimmer/component";
import config from "rails-diff/config/environment";

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
    return `${config.APP.FILE_URL}/${config.APP.REPOSITORY}/blob/v${this.args.version}/${this.args.path}`;
  }
}

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry {
    RawFileLink: typeof RawFileLinkComponent;
  }
}
