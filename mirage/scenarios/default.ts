import { camelize } from "@ember/string";
import { Server } from "miragejs";
import ENV from "rails-diff/config/environment";

import AppRegistry from "../app/registry";

import sample from "./sample";

type Scenario = (server: Server) => void;

export const scenarios: Record<string, Scenario> = {
  sample,
};

export default function (server: Server<AppRegistry>) {
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
