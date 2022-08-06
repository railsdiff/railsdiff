import { PatchFile } from "../api/github";

import Diff from "./diff";

const fileSorter = function (a: PatchFile, b: PatchFile) {
  const aPath = a.filename;
  const bPath = b.filename;

  if (aPath > bPath) {
    return 1;
  }
  if (aPath < bPath) {
    return -1;
  }
  return 0;
};

export default class Patch {
  files: PatchFile[];

  constructor(files: PatchFile[]) {
    this.files = files.sort(fileSorter);
  }

  get diffs() {
    return this.files.map((fileCompare) => new Diff(fileCompare));
  }
}
