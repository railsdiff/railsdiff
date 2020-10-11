const newFilePattern = /^diff/;
const filePathsPattern = /generated\/v([^/]+)\/.* generated\/v([^/]+)\/([^ ]+)$/;
const diffStartRegexp = /^@/;

type Diff = {
  filePath: string;
  rawLines: string[];
  sourceVersion: string;
  targetVersion: string;
};

export default function patchSplitter(patch: string) {
  const lines = patch.split("\n");
  let currentDiff: Diff;
  let diffStarted = false;
  let match: null | RegExpMatchArray;

  return lines.reduce(function (diffs, line) {
    if (newFilePattern.test(line) && filePathsPattern.test(line)) {
      diffStarted = false;
      match = filePathsPattern.exec(line)!;
      currentDiff = {
        filePath: match[3],
        rawLines: [],
        sourceVersion: match[1],
        targetVersion: match[2],
      };
      diffs.pushObject(currentDiff);
    } else if (diffStarted) {
      currentDiff.rawLines.push(line);
    } else if (diffStartRegexp.test(line)) {
      diffStarted = true;
    }
    return diffs;
  }, [] as Diff[]);
}
