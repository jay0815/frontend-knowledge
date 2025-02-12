import { defineProject, mergeConfig } from "vitest/config";
import shared from "../vitest.shared.ts";

export default mergeConfig(shared, defineProject({}));
