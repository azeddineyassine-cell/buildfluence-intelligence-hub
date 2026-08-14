import { useState } from "react";
import IPShell from "@/components/ip/IPShell";
import { useAuth } from "@/hooks/useAuth";
import { useInvitationRequest } from "@/hooks/useInvitationRequest";
import IPAuthModal from "@/components/ip/IPAuthModal";

type Actor = {
  name: string;
  party: string;
  narrative: string;
  radar: [number, number, number, number, number, number]; // Pop, Créd, Infl, Mob, Eng, Lead (0-100)
};

// Only Candidat 1 is public. Others require premium.
const PUBLIC_ACTOR: Actor = {
  name: "Candidat 1",
  party: "Parti A",
  narrative:
    "Forte centralité sur « pouvoir d'achat » et « Sahara », engagement en hausse sur 14 jours, tonalité neutre à positive.",
  radar: [72, 68, 74, 63, 70, 66],
};

const PREMIUM_ACTORS: Actor[] = [
  {
    name: "Candidat 2",
    party: "Parti B",
    narrative:
      "Ancrage territorial marqué, tonalité oscillante sur les enjeux d'emploi, propagation régionale.",
    radar: [64, 62, 58, 71, 60, 55],
  },
  {
    name: "Candidat 3",
    party: "Parti C",
    narrative:
      "Signal thématique concentré sur éducation, dynamique de propagation en baisse sur 7 jours.",
    radar: [51, 66, 47, 55, 52, 60],
  },
];

const DIMS = ["Visibilité", "Crédibilité", "Influence", "Mobilisation", "Engagement", "Leadership"];

const Radar = ({ values }: { values: [number, number, number, number, number, number] }) => {
  // Hexagon radar
  const cx = 160;
  const cy = 160;
  const rMax = 130;
  const angles = values.map((_, i) => (Math.PI * 2 * i) / 6 - Math.PI / 2);
  const point = (r: number, i: number) => [cx + r * Math.cos(angles[i]), cy + r * Math.sin(angles[i])];
  const ring = (r: number) =>
    values.map((_, i) => point(r, i).join(",")).join(" ");
  const dataPts = values.map((v, i) => point((v / 100) * rMax, i).join(",")).join(" ");
  const labelPos = (i: number) => point(rMax + 22, i);
  return (
    <svg viewBox="0 0 320 320" style={{ width: "100%", maxWidth: 380 }}>
      <g stroke="var(--line)" fill="none">
        <polygon points={ring(rMax)} />
        <polygon points={ring(rMax * 0.66)} />
        <polygon points={ring(rMax * 0.33)} />
      </g>
      <polygon points={dataPts} fill="rgba(201,168,76,0.32)" stroke="var(--gold)" strokeWidth={2} />
      <g fontFamily="JetBrains Mono" fontSize={9} fill="var(--text)" textAnchor="middle">
        {DIMS.map((d, i) => {
          const [x, y] = labelPos(i);
          return (
            <text key={d} x={x} y={y}>
              {d}
            </text>
          );
        })}
      </g>
    </svg>
  );
};

const IPActeurs = () => {
  const { role, loading } = useAuth();
  const isPremium = role === "premium";
  const { status, error, submit } = useInvitationRequest();
  const [authOpen, setAuthOpen] = useState(false);
  const [selected, setSelected] = useState(0); // index; 0 = public actor, 1/2 = premium actors

  const currentActor: Actor | null =
    selected === 0 ? PUBLIC_ACTOR : isPremium ? PREMIUM_ACTORS[selected - 1] ?? null : null;

  return (
    <IPShell activeSlug="acteurs">
      <section style={{ padding: "44px 5vw" }}>
        <div className="eyebrow">Qui façonne le débat</div>
        <h2 style={{ fontSize: 28, marginBottom: 22 }}>Acteurs</h2>

        <div className="actor-picker">
          <button className={selected === 0 ? "active" : ""} onClick={() => setSelected(0)}>
            Candidat 1
          </button>
          {[1, 2].map((i) => (
            <button
              key={i}
              className={selected === i ? "active" : ""}
              disabled={!isPremium}
              title={!isPremium ? "Accès sur invitation" : undefined}
              onClick={() => isPremium && setSelected(i)}
            >
              Candidat {i + 1} {!isPremium ? "🔒" : ""}
            </button>
          ))}
        </div>

        {currentActor ? (
          <div className="radar-layout">
            <div>
              <Radar values={currentActor.radar} />
            </div>
            <div className="card">
              <div className="mono" style={{ fontSize: 9.5, color: "var(--gold-dim)" }}>
                {currentActor.name} · {currentActor.party}
              </div>
              <h3 style={{ fontSize: 20, margin: "8px 0 12px" }}>Profil narratif</h3>
              <p className="lead" style={{ fontSize: 15.5, color: "var(--text-dim)" }}>
                {currentActor.narrative}
              </p>
            </div>
          </div>
        ) : null}

        {!isPremium && !loading && (
          <div className="gate-premium" style={{ marginTop: 26 }}>
            <div className="lock">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>Analyse des acteurs sur invitation</h3>
            <p>
              Le premier candidat est en accès libre. Les profils narratifs et radars des autres
              candidats sont réservés aux accès sur invitation.
            </p>
            {status === "sent" ? (
              <div className="gate-status">Demande envoyée · notre équipe vous recontacte</div>
            ) : status === "pending" ? (
              <button className="btn" disabled>
                Demande en cours d'examen
              </button>
            ) : (
              <button
                className="btn btn-gold"
                onClick={() => {
                  if (!role || role === "public") {
                    setAuthOpen(true);
                    return;
                  }
                  void submit();
                }}
                disabled={status === "loading"}
              >
                {status === "loading" ? "…" : "Demander une invitation"}
              </button>
            )}
            {error && (
              <div className="mono" style={{ marginTop: 10, fontSize: 10, color: "var(--alert)" }}>
                {error}
              </div>
            )}
          </div>
        )}
      </section>

      <IPAuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </IPShell>
  );
};

export default IPActeurs;
