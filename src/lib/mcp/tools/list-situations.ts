import { defineTool } from "@lovable.dev/mcp-js";

const SITUATIONS = [
  { slug: "decider-sans-visibilite", title: "Décider sans visibilité", summary: "Prendre des décisions stratégiques dans un environnement opaque, sans repères fiables." },
  { slug: "attaques-informationnelles", title: "Attaques informationnelles", summary: "Faire face à des campagnes de déstabilisation, rumeurs ou attaques réputationnelles ciblées." },
  { slug: "deficit-attractivite", title: "Déficit d'attractivité", summary: "Restaurer l'attractivité auprès des talents, investisseurs ou partenaires stratégiques." },
  { slug: "crises-non-maitrisees", title: "Crises non maîtrisées", summary: "Reprendre le contrôle narratif et opérationnel lors d'une crise en cours." },
  { slug: "perte-velocite", title: "Perte de vélocité", summary: "Retrouver la capacité d'exécution et la vitesse décisionnelle face à des concurrents plus agiles." },
  { slug: "deficit-influence", title: "Déficit d'influence", summary: "Structurer et amplifier son influence auprès des décideurs et écosystèmes clés." },
  { slug: "investir-sous-risque", title: "Investir sous risque", summary: "Sécuriser une décision d'investissement stratégique face à l'incertitude et à l'asymétrie d'information." },
  { slug: "gouverner-sous-pression", title: "Gouverner sous pression", summary: "Piloter une organisation en environnement politique, réglementaire ou médiatique tendu." },
];

export default defineTool({
  name: "list_critical_situations",
  title: "List critical situations",
  description: "Return the 8 critical strategic situations Buildfluence addresses (Sovereign Decision Infrastructure use cases).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(SITUATIONS, null, 2) }],
    structuredContent: { situations: SITUATIONS },
  }),
});
