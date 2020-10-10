import Route from "@ember/routing/route";
import fetch from "fetch";

interface Branch {
  name: string;
}

export default class IndexRoute extends Route {
  async model() {
    const response = await fetch("/repos/railsdiff/generated/branches");
    const branches = await (response.json() as Promise<Branch[]>);
    const branchNames = branches.map((branch) => branch.name);
    return branchNames;
  }
}
