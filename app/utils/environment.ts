import config from "rails-diff/config/environment";

function app(name: keyof typeof config.APP): string {
  const value = config.APP[name];

  if (typeof value !== "string") {
    throw new Error(`config.APP["${name}"] is not a string`);
  }

  return value;
}

export const REPOSITORY = app("REPOSITORY");
