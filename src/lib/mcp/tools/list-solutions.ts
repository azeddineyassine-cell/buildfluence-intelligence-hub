import { defineTool } from "@lovable.dev/mcp-js";

const SOLUTIONS = [
  { slug: "strategic-intelligence-lab", title: "Strategic Intelligence Lab", summary: "Cellule d'intelligence stratégique dédiée : veille augmentée, analyse et recommandations opérationnelles." },
  { slug: "deep-due-diligence", title: "Deep Due Diligence", summary: "Investigation approfondie sur cibles, partenaires ou dirigeants avant décision stratégique majeure." },
  { slug: "soft-power-influence", title: "Soft Power & Influence", summary: "Construction d'une influence durable auprès des décideurs, écosystèmes et publics clés." },
];

const CAPABILITIES = [
  { slug: "ai-powered-monitor", title: "AI Powered Monitor", summary: "Veille stratégique multicanale augmentée par l'IA sur web profond et signaux faibles." },
  { slug: "strategic-workflow", title: "Strategic Workflow", summary: "Structuration d'une unité de veille et d'intelligence stratégique interne." },
  { slug: "strategic-command-center", title: "Strategic Command Center", summary: "Cockpit décisionnel : Risques, Opportunités, Concurrence, Narratif." },
  { slug: "competitive-velocity-engine", title: "Competitive Velocity Engine", summary: "Mapping dynamique de l'écosystème concurrentiel, R&D et alliances." },
];

export default defineTool({
  name: "list_solutions_and_capabilities",
  title: "List solutions & capabilities",
  description: "Return Buildfluence's 3 strategic solutions and 4 advanced capabilities.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify({ solutions: SOLUTIONS, capabilities: CAPABILITIES }, null, 2) }],
    structuredContent: { solutions: SOLUTIONS, capabilities: CAPABILITIES },
  }),
});
