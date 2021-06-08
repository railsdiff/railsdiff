const ANCHORED_VERSION_PATTERN =
  /^\s*([0-9]+(\.[0-9a-zA-Z]+)*(-[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?)?\s*$/;
const EMPTY_PATTERN = /^\s*$/;

function dropWhile<T>(arr: T[], func: (item: T) => boolean) {
  while (arr.length > 0 && !func(arr[0])) {
    arr = arr.slice(1);
  }
  return arr;
}

export default class Version {
  get canonicalSegments() {
    return this._splitSegments()
      .map((segments) => {
        segments = segments.reverse();
        dropWhile(segments, (segment) => segment === 0);
        return segments.reverse();
      })
      .reduce((result, segments) => result.concat(segments), []);
  }

  private get _segments() {
    return Array.from(this._version.matchAll(/[0-9]+|[a-z]+/gi), (segment) => {
      const s = segment[0];
      if (/^\d+$/.test(s)) {
        return parseInt(s, 10);
      } else {
        return s;
      }
    });
  }

  private _version: string;

  constructor(version: string) {
    version = version.replace(/\n/g, " ");

    if (!ANCHORED_VERSION_PATTERN.test(version)) {
      throw new Error(`Malformed version number string "${version}"`);
    }

    if (EMPTY_PATTERN.test(version)) {
      version = "0";
    }

    this._version = version.trim().replace(/-/g, ".pre.");
  }

  toString() {
    return this._version;
  }

  private _splitSegments() {
    const stringStart = this._segments.findIndex(
      (segment) => typeof segment === "string"
    );
    const numericSegments = this._segments.slice(
      0,
      stringStart || this._segments.length
    );
    const stringSegments = this._segments.slice(
      numericSegments.length,
      this._segments.length
    );
    return [numericSegments, stringSegments];
  }
}
