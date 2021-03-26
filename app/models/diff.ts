import Line from "./line";

const commentRegexp = /^\\/;
const deleted = /^-/;
const inserted = /^\+/;

export default class Diff {
  filePath: string;
  rawLines: string[] = [];
  status: string;

  constructor(filePath: string, status: string) {
    this.filePath = filePath;
    this.status = status;
  }

  get isAdded() {
    return this.status == "added";
  }

  get isRemoved() {
    return this.status == "removed";
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
}
