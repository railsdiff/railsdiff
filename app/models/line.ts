interface Args {
  content: string;
  insertedLineNum?: number;
  deletedLineNum?: number;
  type: "comment" | "deleted" | "inserted" | "unchanged";
}
export default class Line {
  content: string;
  insertedLineNum?: number;
  deletedLineNum?: number;
  type: "comment" | "deleted" | "inserted" | "unchanged";

  constructor(data: Args) {
    this.content = data.content;
    this.insertedLineNum = data.insertedLineNum;
    this.deletedLineNum = data.deletedLineNum;
    this.type = data.type;
  }
}
