import patchSplitter from "rails-diff/utils/patch-splitter";
import Diff from "./diff";

const diffSorter = function (a: Diff, b: Diff) {
  const aPath = a.filePath;
  const bPath = b.filePath;

  if (aPath > bPath) {
    return 1;
  }
  if (aPath < bPath) {
    return -1;
  }
  return 0;
};

export default class Patch {
  patch: string;

  constructor(patch: string) {
    this.patch = patch;
  }

  get diffs() {
    return patchSplitter(this.patch).sort(diffSorter);
  }
}
