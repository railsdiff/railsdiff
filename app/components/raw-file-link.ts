import Component from "@glimmer/component";
import config from "rails-diff/config/environment";

interface Args {
  path: string;
  version: string;
}

export default class RawFileLinkComponent extends Component<Args> {
  get url() {
    return `${config.APP.FILE_URL}/${config.APP.REPOSITORY}/blob/v${this.args.version}/${this.args.path}`;
  }
}
