import Ember from 'ember';

var newFilePattern = /^diff/;
var filePathPattern = /v[^\/]+\/([^ ]+)$/;
var diffStartPattern = /^@/;

export default function patchSplitter(patch) {
  var lines = patch.split("\n"),
      diffStarted = false,
      currentDiff,
      match;

  return lines.reduce(function(diffs, line) {
    if (newFilePattern.test(line) && filePathPattern.test(line)) {
      diffStarted = false;
      match = line.match(filePathPattern);
      currentDiff = {
        content: '',
        filePath: match[1].trim(),
      };
      diffs.pushObject(currentDiff);
    } else if (diffStarted) {
      currentDiff.content += line + "\n";
    } else if (diffStartPattern.test(line)) {
      diffStarted = true;
    }
    return diffs;
  }, Ember.A());
}
