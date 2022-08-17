import { camelize } from "@ember/string";
import ENV from "rails-diff/config/environment";

import Server from "../app/server";

import sample from "./sample";

type Scenario = (server: Server) => void;

export const scenarios: Record<string, Scenario> = {
  sample,
};

export default function (server: Server) {
  const scenario =
    scenarios[
      camelize(
        localStorage.getItem("MIRAGE_SCENARIO") ||
          ENV.MIRAGE_SCENARIO ||
          "sample"
      )
    ];

  if (scenario) {
    scenario(server);
  }
}
