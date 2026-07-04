import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "submit_access_request",
  title: "Submit premium access request",
  description: "Submit a request for Buildfluence Premium access. Persists the request and notifies the Buildfluence team.",
  inputSchema: {
    name: z.string().min(1).describe("Full name of the requester."),
    email: z.string().email().describe("Professional email address."),
    organization: z.string().optional().describe("Company or organization."),
    phone: z.string().optional().describe("Phone number (optional)."),
    message: z.string().optional().describe("Context or message for the Buildfluence team."),
    langue: z.enum(["fr", "en"]).optional().describe("Preferred language (fr or en)."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async (input) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !anonKey) {
      return { content: [{ type: "text", text: "Server misconfigured: missing Supabase env." }], isError: true };
    }
    const res = await fetch(`${supabaseUrl}/functions/v1/send-access-request`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: anonKey, Authorization: `Bearer ${anonKey}` },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        organization: input.organization ?? "",
        phone: input.phone ?? "",
        message: input.message ?? "",
        langue: input.langue ?? "fr",
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { content: [{ type: "text", text: `Request failed: ${JSON.stringify(data)}` }], isError: true };
    }
    return {
      content: [{ type: "text", text: "Access request submitted. The Buildfluence team will follow up." }],
      structuredContent: data,
    };
  },
});
