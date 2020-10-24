import Version from "rails-diff/models/version";

export default function compareVersions(a: Version, b: Version) {
  const aSegments = a.canonicalSegments;
  const bSegments = b.canonicalSegments;

  if (a.toString() === b.toString() || aSegments == bSegments) {
    return 0;
  }

  const aSize = aSegments.length;
  const bSize = bSegments.length;
  const limit = (aSize > bSize ? aSize : bSize) - 1;

  let i = 0;

  while (i <= limit) {
    const aSegment = aSegments[i] || 0;
    const bSegment = bSegments[i] || 0;
    i += 1;

    if (aSegment === bSegment) {
      continue;
    }
    if (typeof aSegment === "string" && typeof bSegment === "number") {
      return -1;
    }
    if (typeof bSegment === "string" && typeof aSegment === "number") {
      return 1;
    }
    return aSegment < bSegment ? -1 : 1;
  }

  return 0;
}
