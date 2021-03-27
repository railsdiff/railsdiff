import Diff from "diff";
import { FileMap } from "rails-diff/mirage/factories/tag";
import { Compare } from "rails-diff/services/versions";

function gitDiff(filename: string, source: string, target: string): string {
  const diff = Diff.createPatch(filename, source, target).split("\n");
  diff.splice(0, 4);
  return diff.join("\n");
}

async function generateSHA(filename: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(filename);
  const encoding = await crypto.subtle.digest("SHA-1", data);
  const encodingArray = Array.from(new Uint8Array(encoding));
  return encodingArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default async function compare(
  sourceFiles: FileMap,
  targetFiles: FileMap
): Promise<Compare> {
  const sourceFilenames = Object.keys(sourceFiles);
  const targetFilenames = Object.keys(targetFiles);
  let result: Compare["files"] = [];
  const addedFilenames = targetFilenames.filter(
    (filename) => !sourceFilenames.includes(filename)
  );
  const removedFilenames = sourceFilenames.filter(
    (filename) => !targetFilenames.includes(filename)
  );
  const keptFilenames = sourceFilenames.filter(
    (filename) => !removedFilenames.includes(filename)
  );

  for (let index = 0; index < addedFilenames.length; index++) {
    const filename = addedFilenames[index];
    const sha = await generateSHA(filename);
    result.push({
      filename,
      patch: gitDiff(filename, "", targetFiles[filename]),
      sha,
      status: "added",
    });
  }

  for (let index = 0; index < removedFilenames.length; index++) {
    const filename = removedFilenames[index];
    const sha = await generateSHA(filename);
    result.push({
      filename,
      patch: gitDiff(filename, sourceFiles[filename], ""),
      sha,
      status: "removed",
    });
  }

  for (let index = 0; index < keptFilenames.length; index++) {
    const filename = keptFilenames[index];
    const sha = await generateSHA(filename);
    result.push({
      filename,
      patch: gitDiff(filename, sourceFiles[filename], targetFiles[filename]),
      sha,
      status: "modified",
    });
  }

  result = result.sort((a, b) => {
    if (a.filename < b.filename) {
      return -1;
    } else if (a.filename > b.filename) {
      return 1;
    }
    return 0;
  });

  return { files: result };
}
