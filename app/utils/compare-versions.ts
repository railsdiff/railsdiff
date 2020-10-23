const PRERELEASE_MAP: { [key: string]: number | undefined } = {
  rc: -1,
  pre: -2,
  beta: -3,
  b: -3,
  alpha: -4,
  a: -4,
};

function bits(version: string) {
  version = version.replace(/(\d+)([^\d.]+)/, "$1.$2");
  version = version.replace(/([^\d.]+)(\d+)/, "$1.$2");
  const parts = version.split(".");

  const bits: number[] = [];
  parts.forEach((part) => {
    let partValue = parseInt(part, 10);
    if (isNaN(partValue)) {
      partValue = PRERELEASE_MAP[part] || -1;
    }
    bits.push(partValue);
  });
  return bits;
}

export default function compareVersions(a: string, b: string) {
  const aBits = bits(a);
  const bBits = bits(b);

  for (let i = 0; i < Math.max(aBits.length, bBits.length); ++i) {
    const ai = aBits[i] || 0;
    const bi = bBits[i] || 0;

    if (ai > bi) {
      return 1;
    }
    if (ai < bi) {
      return -1;
    }
  }

  return 0;
}
