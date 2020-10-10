import { setApplication } from "@ember/test-helpers";
import { start } from "ember-qunit";
import Application from "rails-diff/app";
import config from "rails-diff/config/environment";

setApplication(Application.create(config.APP));

start();

import "./helpers/semantic-assertions";
import "./helpers/semantic-selectors";
