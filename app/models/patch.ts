import { FileCompare } from "../services/versions";

import Diff from "./diff";

const fileSorter = function (a: FileCompare, b: FileCompare) {
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
  files: FileCompare[];

  constructor(files: FileCompare[]) {
    this.files = files.sort(fileSorter);
  }

  get diffs() {
    return this.files.map((fileCompare) => {
      const diff = new Diff(fileCompare.filename);
      fileCompare.patch.split("\n").forEach((line) => {
        diff.rawLines.push(line);
      });
      return diff;
    });
  }
}
