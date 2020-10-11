import Line from "./line";

interface Args {
  filePath: string;
  rawLines: string[];
  sourceVersion: string;
  targetVersion: string;
}

const commentRegexp = /^\\/;
const deleted = /^\-/;
const inserted = /^\+/;

export default class Diff {
  filePath: string;
  rawLines: string[];
  sourceVersion: string;
  targetVersion: string;

  constructor(data: Args) {
    this.filePath = data.filePath;
    this.rawLines = data.rawLines;
    this.sourceVersion = data.sourceVersion;
    this.targetVersion = data.targetVersion;
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
