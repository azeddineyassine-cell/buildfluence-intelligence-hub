import { useState } from "react";
import IPShell from "@/components/ip/IPShell";
import { useAuth } from "@/hooks/useAuth";
import { useInvitationRequest } from "@/hooks/useInvitationRequest";
import IPAuthModal from "@/components/ip/IPAuthModal";

const PUBLIC_REGIONS = [
  { name: "Casablanca-Settat", theme: "Emploi", bg: "var(--growth)" },
  { name: "Rabat-Salé-Kénitra", theme: "Administration", bg: "var(--gold-dim)" },
];

const PREMIUM_REGIONS = [
  { name: "Fès-Meknès", theme: "Éducation", bg: "#4a6a8a" },
  { name: "Marrakech-Safi", theme: "Eau", bg: "var(--alert)" },
  { name: "Tanger-Tétouan-Al Hoceïma", theme: "Investissement", bg: "#4a6a8a" },
  { name: "Souss-Massa", theme: "Agriculture", bg: "var(--growth)" },
  { name: "Oriental", theme: "Sécurité", bg: "var(--gold-dim)" },
  { name: "Béni Mellal-Khénifra", theme: "Pouvoir d'achat", bg: "#4a6a8a" },
  { name: "Drâa-Tafilalet", theme: "Développement", bg: "var(--gold-dim)" },
  { name: "Guelmim-Oued Noun", theme: "Emploi jeunes", bg: "var(--growth)" },
  { name: "Laâyoune-Sakia El Hamra", theme: "Sahara", bg: "#4a6a8a" },
  { name: "Dakhla-Oued Ed-Dahab", theme: "Souveraineté", bg: "var(--gold-dim)" },
];

const IPCartographie = () => {
  const { session, role, loading } = useAuth();
  const isPremium = role === "premium";
  const { status, error, submit } = useInvitationRequest();
  const [authOpen, setAuthOpen] = useState(false);

  const handleInvite = () => {
    if (!session) {
      setAuthOpen(true);
      return;
    }
    void submit();
  };

  const requestButton = () => {
    if (loading) return null;
    if (!session) {
      return (
        <button className="btn btn-gold" onClick={() => setAuthOpen(true)}>
          S'inscrire pour demander une invitation
        </button>
      );
    }
    if (status === "sent") {
      return <div className="gate-status">Demande envoyée · notre équipe vous recontacte</div>;
    }
    if (status === "pending") {
      return (
        <button className="btn" disabled>
          Demande en cours d'examen
        </button>
      );
    }
    return (
      <button className="btn btn-gold" onClick={handleInvite} disabled={status === "loading"}>
        {status === "loading" ? "…" : "Demander une invitation"}
      </button>
    );
  };

  return (
    <IPShell activeSlug="cartographie">
      <section style={{ padding: "44px 5vw" }}>
        <div className="eyebrow">Où se concentrent les dynamiques</div>
        <h2 style={{ fontSize: 28, marginBottom: 22 }}>
          Cartographie <em>Territoriale</em>
        </h2>

        <div className="heatmap">
          {PUBLIC_REGIONS.map((r) => (
            <div className="region" style={{ background: r.bg }} key={r.name}>
              <div className="rname">{r.name}</div>
              <div className="rtheme">{r.theme}</div>
            </div>
          ))}

          {isPremium
            ? PREMIUM_REGIONS.map((r) => (
                <div className="region" style={{ background: r.bg }} key={r.name}>
                  <div className="rname">{r.name}</div>
                  <div className="rtheme">{r.theme}</div>
                </div>
              ))
            : PREMIUM_REGIONS.map((_r, i) => (
                <div className="region locked-placeholder" key={i}>
                  <div className="lock-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    Accès sur invitation
                  </div>
                </div>
              ))}
        </div>

        {!isPremium && (
          <div className="gate-premium" style={{ marginTop: 26 }}>
            <div className="lock">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <h3>La donnée gratuite n'a pas de valeur.</h3>
            <p>
              2 régions sur 12 sont accessibles librement. La cartographie complète, mise à jour
              quotidiennement, est réservée aux accès sur invitation.
            </p>
            {requestButton()}
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

export default IPCartographie;
