import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";

const GouvernerSousPression = () => (
  <DetailPageLayout
    title="Gouverner sous pression médiatique et émotionnelle"
    chapeau="Dans un environnement sur-exposé, ne laissez pas l'émotion dicter vos décisions"
    ctas={[
      { label: "Lire le cas complet", action: "#", formType: "f1" },
      { label: "Réserver mon échange stratégique", action: "#", formType: "f1" },
    ]}
  >
    <DetailBlock title="Votre réalité">
      <p className="mt-2">Vous évoluez dans un environnement à forte exposition publique :</p>
      <DetailList items={[
        "Les réseaux sociaux accélèrent les réactions",
        "Pression des supporters, clients ou citoyens",
        "Les médias structurent les perceptions",
        "Enjeux institutionnels et économiques imbriqués",
        "Les parties prenantes exigent des réponses immédiates",
        "La pression est permanente : chaque action est Observée, Commentée, Critiquée et Amplifiée",
      ]} />
    </DetailBlock>

    <DetailBlock title="Vous risquez">
      <DetailList items={[
        "Réactions sous pression émotionnelle élevée",
        "Décisions prises pour calmer l'opinion plutôt que pour servir la stratégie",
        "Perte de contrôle narratif",
        "Fragmentation interne de l'information",
        "Affaiblissement de l'autorité décisionnelle",
      ]} />
    </DetailBlock>

    <DetailBlock title="Les angles morts">
      <DetailList items={[
        "Confondre visibilité et maîtrise",
        "Masse de critiques non maîtrisée",
        "Réagir sans lecture consolidée des dynamiques d'influence",
        "Décider sans dispositif structuré d'anticipation",
        "Être exposé sans disposer d'un système structuré",
      ]} />
    </DetailBlock>

    <DetailBlock title="Solution Buildfluence">
      <p className="mt-2 font-semibold text-primary">Crisis Command Center + Intelligence d'Influence</p>
    </DetailBlock>

    <CaseStudy
      title="Cas client : Raja Club Athletic"
      context="Club historique à forte base populaire, exposé à une pression médiatique et émotionnelle constante. Enjeu : Sécuriser la prise de décision dans un environnement hyper-réactif et structurer une intelligence stratégique interne."
      intervention={[
        "Monitoring médiatique et réputationnel structuré",
        "Centralisation et hiérarchisation des flux d'information",
        "Cartographie des acteurs d'influence",
        "Mise en place d'un pilotage décisionnel assisté",
        "Appui au pilotage décisionnel par la création d'une cellule stratégique interne dédiée",
      ]}
      result="Professionnalisation de la veille stratégique. Cycles de décision significativement réduits. Silos d'information éliminés. Vision consolidée pour la direction. Culture d'intelligence stratégique installée. Positionnement pionnier dans le sport professionnel marocain."
    />

    <div className="rounded-sm border border-primary/20 bg-primary/5 p-6 text-center">
      <p className="font-serif text-lg italic text-foreground/80">
        « La veille et l'intelligence stratégique n'est plus réservée aux États et aux multinationales. »
      </p>
    </div>
  </DetailPageLayout>
);

export default GouvernerSousPression;
