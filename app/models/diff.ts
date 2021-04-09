import { FileCompare } from "../services/versions";

import Line from "./line";

const commentRegexp = /^\\/;
const deleted = /^-/;
const inserted = /^\+/;

export default class Diff {
  private _fileCompare: FileCompare;
  rawLines: string[] = [];

  constructor(fileCompare: FileCompare) {
    this._fileCompare = fileCompare;

    if (fileCompare.patch) {
      fileCompare.patch?.split("\n").forEach((line) => {
        this.rawLines.push(line);
      });
    }
  }

  get anchor() {
    return `diff-${this.sha}`;
  }

  get filePath() {
    return this._fileCompare.filename;
  }

  get isAdded() {
    return this._fileCompare.status == "added";
  }

  get isRenamed() {
    return this._fileCompare.status === "renamed";
  }

  get isRemoved() {
    return this._fileCompare.status == "removed";
  }

  get lines() {
    let deletedLineNum = 1;
    let insertedLineNum = 1;

    return this.rawLines.map((line) => {
      if (commentRegexp.test(line)) {
        return new Line({ content: line, type: "comment" });
      } else if (deleted.test(line)) {
        return new Line({
          content: line,
          deletedLineNum: deletedLineNum++,
          type: "deleted",
        });
      } else if (inserted.test(line)) {
        return new Line({
          content: line,
          insertedLineNum: insertedLineNum++,
          type: "inserted",
        });
      } else {
        return new Line({
          content: line,
          deletedLineNum: deletedLineNum++,
          insertedLineNum: insertedLineNum++,
          type: "unchanged",
        });
      }
    });
  }

  get previousPath() {
    if (this._fileCompare.status !== "renamed") {
      return;
    }

    return this._fileCompare.previous_filename;
  }

  get sha() {
    return this._fileCompare.sha;
  }
}
