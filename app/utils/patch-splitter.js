import { A } from 'ember-array/utils';

let newFilePattern = /^diff/;
let filePathsPattern = /\/v([^\/]+)\/.* .*\/v([^\/]+)\/([^ ]+)$/;
let diffStartPattern = /^@/;

export default function patchSplitter(patch) {
  const lines = patch.split("\n");
  let currentDiff;
  let diffStarted = false;
  let match;

  return lines.reduce(function(diffs, line) {
    if (newFilePattern.test(line) && filePathsPattern.test(line)) {
      diffStarted = false;
      match = line.match(filePathsPattern);
      currentDiff = {
        filePath: match[3],
        rawLines: [],
        sourceVersion: match[1],
        targetVersion: match[2],
      };
      diffs.pushObject(currentDiff);
    } else if (diffStarted) {
      currentDiff.rawLines.push(line);
    } else if (diffStartPattern.test(line)) {
      diffStarted = true;
    }
    return diffs;
  }, A());
}
