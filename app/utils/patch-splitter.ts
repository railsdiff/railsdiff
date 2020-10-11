import Diff from "rails-diff/models/diff";

const newFilePattern = /^diff/;
const filePathsRegexp = /generated\/v([^/]+)\/.* generated\/v([^/]+)\/([^ ]+)$/;
const diffStartRegexp = /^@/;

export default function patchSplitter(patch: string) {
  const lines = patch.split("\n");
  let currentDiff: Diff;
  let diffStarted = false;
  let match: null | RegExpMatchArray;

  return lines.reduce((diffs, line) => {
    if (newFilePattern.test(line) && filePathsRegexp.test(line)) {
      diffStarted = false;
      match = filePathsRegexp.exec(line)!;
      currentDiff = new Diff({
        filePath: match[3],
        rawLines: [],
        sourceVersion: match[1],
        targetVersion: match[2],
      });
      diffs.pushObject(currentDiff);
    } else if (diffStarted) {
      currentDiff.rawLines.push(line);
    } else if (diffStartRegexp.test(line)) {
      diffStarted = true;
    }
    return diffs;
  }, [] as Diff[]);
}
