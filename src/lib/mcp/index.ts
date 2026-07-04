import { defineMcp } from "@lovable.dev/mcp-js";
import listSituations from "./tools/list-situations";
import listSolutions from "./tools/list-solutions";
import submitAccessRequest from "./tools/submit-access-request";

export default defineMcp({
  name: "buildfluence-mcp",
  title: "Buildfluence MCP",
  version: "0.1.0",
  instructions:
    "Buildfluence — Sovereign Decision Infrastructure. Use `list_critical_situations` and `list_solutions_and_capabilities` to explore the offering. Use `submit_access_request` to request Buildfluence Premium access on behalf of a user.",
  tools: [listSituations, listSolutions, submitAccessRequest],
});
