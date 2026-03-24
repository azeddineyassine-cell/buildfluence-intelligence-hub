import DetailPageLayout, { DetailBlock, DetailList, CaseStudy } from "@/components/DetailPageLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import rajaLogo from "@/assets/clients/raja-club-athletic.jpg";

const GouvernerSousPression = () => {
  const { t } = useLanguage();
  return (
    <DetailPageLayout
      title={t("Gouverner sous pression médiatique et émotionnelle", "Governing under media and emotional pressure")}
      chapeau={t("Dans un environnement sur-exposé, ne laissez pas l'émotion dicter vos décisions", "In an over-exposed environment, don't let emotion dictate your decisions")}
      prevSituation={{ label: "Investir sous risque", path: "/situations/investir-sous-risque" }}
      ctas={[
        { label: t("Réserver mon échange stratégique", "Book my strategic exchange"), action: "#", formType: "f1" },
      ]}
    >
      <DetailBlock title={t("Votre réalité", "Your reality")}>
        <p className="mt-2">{t("Vous évoluez dans un environnement à forte exposition publique :", "You operate in a high public exposure environment:")}</p>
        <DetailList items={[
          t("Les réseaux sociaux accélèrent les réactions", "Social media accelerates reactions"),
          t("Pression des supporters, clients ou citoyens", "Pressure from supporters, clients or citizens"),
          t("Les médias structurent les perceptions", "Media structures perceptions"),
          t("Enjeux institutionnels et économiques imbriqués", "Intertwined institutional and economic stakes"),
          t("Les parties prenantes exigent des réponses immédiates", "Stakeholders demand immediate responses"),
          t("La pression est permanente : chaque action est Observée, Commentée, Critiquée et Amplifiée", "Pressure is permanent: every action is Observed, Commented, Criticized and Amplified"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Vous risquez", "You risk")}>
        <DetailList items={[
          t("Réactions sous pression émotionnelle élevée", "Reactions under high emotional pressure"),
          t("Décisions prises pour calmer l'opinion plutôt que pour servir la stratégie", "Decisions made to calm opinion rather than serve strategy"),
          t("Perte de contrôle narratif", "Loss of narrative control"),
          t("Fragmentation interne de l'information", "Internal information fragmentation"),
          t("Affaiblissement de l'autorité décisionnelle", "Weakening of decision-making authority"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Les angles morts", "Blind spots")}>
        <DetailList items={[
          t("Confondre visibilité et maîtrise", "Confusing visibility with control"),
          t("Masse de critiques non maîtrisée", "Uncontrolled mass of criticism"),
          t("Réagir sans lecture consolidée des dynamiques d'influence", "Reacting without consolidated reading of influence dynamics"),
          t("Décider sans dispositif structuré d'anticipation", "Deciding without a structured anticipation system"),
          t("Être exposé sans disposer d'un système structuré", "Being exposed without having a structured system"),
        ]} />
      </DetailBlock>
      <DetailBlock title={t("Solution Buildfluence", "Buildfluence Solution")}>
        <Link to="/solutions/strategic-intelligence-lab" className="mt-2 inline-block font-semibold text-primary hover:underline">Crisis Command Center + {t("Intelligence d'Influence", "Influence Intelligence")}</Link>
      </DetailBlock>
      <CaseStudy
        logo={rajaLogo}
        title={t("Cas client : Raja Club Athletic", "Client case: Raja Club Athletic")}
        context={t("Club historique à forte base populaire, exposé à une pression médiatique et émotionnelle constante. Enjeu : Sécuriser la prise de décision dans un environnement hyper-réactif et structurer une intelligence stratégique interne.", "Historic club with a strong popular base, exposed to constant media and emotional pressure. Challenge: Securing decision-making in a hyper-reactive environment and structuring internal strategic intelligence.")}
        intervention={[
          t("Monitoring médiatique et réputationnel structuré", "Structured media and reputational monitoring"),
          t("Centralisation et hiérarchisation des flux d'information", "Centralization and prioritization of information flows"),
          t("Cartographie des acteurs d'influence", "Mapping of influence actors"),
          t("Mise en place d'un pilotage décisionnel assisté", "Implementation of assisted decision-making steering"),
          t("Appui au pilotage décisionnel par la création d'une cellule stratégique interne dédiée", "Support for decision-making steering through the creation of a dedicated internal strategic unit"),
        ]}
        result={t("Professionnalisation de la veille stratégique. Cycles de décision significativement réduits. Silos d'information éliminés. Vision consolidée pour la direction. Culture d'intelligence stratégique installée. Positionnement pionnier dans le sport professionnel marocain.", "Professionalization of strategic monitoring. Decision cycles significantly reduced. Information silos eliminated. Consolidated vision for management. Strategic intelligence culture installed. Pioneer positioning in Moroccan professional sports.")}
      />
      <div className="rounded-sm border border-primary/20 bg-primary/5 p-6 text-center">
        <p className="font-serif text-lg italic text-foreground/80">
          {t("« La veille et l'intelligence stratégique n'est plus réservée aux États et aux multinationales. »", "\"Strategic monitoring and intelligence is no longer reserved for States and multinationals.\"")}
        </p>
      </div>
    </DetailPageLayout>
  );
};

export default GouvernerSousPression;
