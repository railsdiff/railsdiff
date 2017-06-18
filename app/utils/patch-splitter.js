let newFilePattern = /^diff/;
let filePathsPattern = /\/(v([^\/]+)\/[^ ]+) .*\/(v([^\/]+)\/([^ ]+))$/;
let diffStartPattern = /^@/;

export default function patchSplitter(patch) {
  let lines = patch.split("\n"),
      diffStarted = false,
      versionsMatched = false,
      currentDiff,
      match;

  let result = {
    sourceVersion: null,
    targetVersion: null,
    diffs: []
  };

  lines.forEach(function(line) {
    if (newFilePattern.test(line) && filePathsPattern.test(line)) {
      diffStarted = false;
      match = line.match(filePathsPattern);
      if (!versionsMatched) {
        versionsMatched = true;
        result.sourceVersion = match[2];
        result.targetVersion = match[4];
      }
      currentDiff = {
        sourceFilePath: match[1],
        targetFilePath: match[3],
        filePath: match[5],
        rawLines: []
      };
      result.diffs.push(currentDiff);
    } else if (diffStarted) {
      currentDiff.rawLines.push(line);
    } else if (diffStartPattern.test(line)) {
      diffStarted = true;
    }
  });

  return result;
}
