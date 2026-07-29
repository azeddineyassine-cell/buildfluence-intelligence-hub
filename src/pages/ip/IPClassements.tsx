import IPShell from "@/components/ip/IPShell";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import IPAuthModal from "@/components/ip/IPAuthModal";

// Full ranking (only sent to the DOM when role >= registered)
const FULL_RANKING: Array<{ name: string; score: number; delta: number }> = [
  { name: "Parti A", score: 78, delta: 4.8 },
  { name: "Parti B", score: 65, delta: 2.1 },
  { name: "Parti C", score: 61, delta: -1.2 },
  { name: "Parti D", score: 58, delta: 0.6 },
  { name: "Parti E", score: 52, delta: -0.4 },
];

const PUBLIC_NAMES = ["Parti A", "Parti B", "Parti C", "Parti D", "Parti E"];

const IPClassements = () => {
  const { role, loading } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  const isRegistered = role === "registered" || role === "premium";

  return (
    <IPShell activeSlug="classements">
      <section style={{ padding: "44px 5vw" }}>
        <div className="eyebrow">Qui progresse, qui recule</div>
        <h2 style={{ fontSize: 28, marginBottom: 22 }}>Classements</h2>

        {loading ? (
          <div className="card" style={{ opacity: 0.6 }}>
            <div className="mono" style={{ fontSize: 10 }}>Chargement…</div>
          </div>
        ) : isRegistered ? (
          <div className="card">
            {FULL_RANKING.map((row) => (
              <div className="rank-row" key={row.name}>
                <div className="rank-name">{row.name}</div>
                <div className="rank-score">{row.score}</div>
                <div className={`delta ${row.delta >= 0 ? "up" : "down"}`}>
                  {row.delta >= 0 ? "▲ +" : "▼ "}{Math.abs(row.delta).toFixed(1).replace(".", ",")} (7j)
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            {PUBLIC_NAMES.slice(0, 4).map((name) => (
              <div className="rank-row" key={name}>
                <div className="rank-name">{name}</div>
                <div
                  aria-label="Score réservé aux inscrits"
                  style={{
                    width: 70,
                    height: 22,
                    background: "repeating-linear-gradient(90deg,var(--line) 0 8px,transparent 8px 14px)",
                    borderRadius: 2,
                  }}
                />
                <div
                  aria-label="Évolution réservée aux inscrits"
                  style={{
                    width: 90,
                    height: 14,
                    background: "repeating-linear-gradient(90deg,var(--line) 0 6px,transparent 6px 10px)",
                    borderRadius: 2,
                  }}
                />
              </div>
            ))}
            <div
              style={{
                marginTop: 22,
                paddingTop: 18,
                borderTop: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div className="mono" style={{ fontSize: 10, color: "var(--text-dim)" }}>
                Inscrivez-vous gratuitement pour voir les scores et évolutions
              </div>
              <button className="btn btn-gold" onClick={() => setAuthOpen(true)}>
                S'inscrire gratuitement
              </button>
            </div>
          </div>
        )}

        <p
          className="mono"
          style={{ marginTop: 18, fontSize: 9.5, color: "var(--text-dim)", letterSpacing: "0.08em" }}
        >
          Données de démonstration. L'IBDN® ne mesure jamais une intention de vote.
        </p>
      </section>

      <IPAuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </IPShell>
  );
};

export default IPClassements;
