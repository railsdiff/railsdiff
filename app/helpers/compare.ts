import Diff from "diff";
import { FileMap } from "rails-diff/mirage/factories/tag";
import { Compare } from "rails-diff/services/versions";

function gitDiff(filename: string, source: string, target: string): string {
  const diff = Diff.createPatch(filename, source, target).split("\n");
  diff.splice(0, 4);
  return diff.join("\n");
}

export default function compare(
  sourceFiles: FileMap,
  targetFiles: FileMap
): Compare {
  const sourceFilenames = Object.keys(sourceFiles);
  const targetFilenames = Object.keys(targetFiles);
  const result: Compare["files"] = [];

  const addedFilenames = targetFilenames.filter(
    (filename) => !sourceFilenames.includes(filename)
  );
  addedFilenames.forEach((filename) => {
    result.push({
      filename,
      patch: gitDiff(filename, "", targetFiles[filename]),
      status: "added",
    });
  });

  const removedFilenames = sourceFilenames.filter(
    (filename) => !targetFilenames.includes(filename)
  );
  removedFilenames.forEach((filename) => {
    result.push({
      filename,
      patch: gitDiff(filename, sourceFiles[filename], ""),
      status: "removed",
    });
  });
  const keptFilenames = sourceFilenames.filter(
    (filename) => !removedFilenames.includes(filename)
  );
  keptFilenames.forEach((filename) => {
    result.push({
      filename,
      patch: gitDiff(filename, sourceFiles[filename], targetFiles[filename]),
      status: "modified",
    });
  });

  return { files: result };
}
