import { ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useIPTheme } from "@/contexts/ThemeContext";
import IPAuthModal from "./IPAuthModal";

const METHODO_ROUTE = "/insights-resources/intelligence-politique/methodologie";

const TABS: Array<{
  slug: string;
  route: string;
  label: string;
  sub: string;
  icon: ReactNode;
}> = [
  {
    slug: "dashboard",
    route: "/insights-resources/intelligence-politique",
    label: "Tableau de bord",
    sub: "Que se passe-t-il aujourd'hui ?",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></svg>
    ),
  },
  {
    slug: "classements",
    route: "/insights-resources/intelligence-politique/classements",
    label: "Classements",
    sub: "Qui progresse ? Qui recule ?",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="12" width="4" height="9" /><rect x="10" y="7" width="4" height="14" /><rect x="17" y="3" width="4" height="18" /></svg>
    ),
  },
  {
    slug: "opinion",
    route: "/insights-resources/intelligence-politique/opinion",
    label: "Opinion",
    sub: "Quels sujets dominent le débat ?",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 15 0 0 1 0 18a9 15 0 0 1 0-18Z" /></svg>
    ),
  },
  {
    slug: "cartographie",
    route: "/insights-resources/intelligence-politique/cartographie",
    label: "Cartographie",
    sub: "Où se concentrent les dynamiques ?",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2Z" /><path d="M9 4v14M15 6v14" /></svg>
    ),
  },
  {
    slug: "acteurs",
    route: "/insights-resources/intelligence-politique/acteurs",
    label: "Acteurs",
    sub: "Qui façonne le débat ?",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
    ),
  },
  {
    slug: "methodologie",
    route: "/insights-resources/intelligence-politique/methodologie",
    label: "Méthodologie",
    sub: "Comment nos analyses sont produites",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M7 8h10M7 12h10M7 16h6" /></svg>
    ),
  },
  {
    slug: "a-propos",
    route: "/insights-resources/intelligence-politique/a-propos",
    label: "À propos",
    sub: "Notre mission et nos engagements",
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
    ),
  },
];

const SCOPED_CSS = `
.ip-scope{--navy:#0D1B2A;--navy-mid:#1a2d44;--navy-light:#142235;--navy-deep:#08111c;--gold:#C9A84C;--gold-soft:#d4b866;--gold-dim:#8a7537;--gold-hover:#e0c88a;--ivory:#F5F1E8;--paper:#FAF6ED;--rule:#D9CFBC;--alert:#E06D4F;--growth:#7C9A6C;min-height:100vh;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;}
.ip-scope[data-theme="dark"]{--bg:var(--navy);--bg-alt:var(--navy-mid);--card:var(--navy-light);--text:var(--ivory);--text-dim:rgba(245,241,232,0.62);--line:rgba(201,168,76,0.2);}
.ip-scope[data-theme="light"]{--bg:var(--paper);--bg-alt:#efe8d6;--card:#ffffff;--text:var(--navy);--text-dim:var(--navy-mid);--line:var(--rule);}
.ip-scope{background:var(--bg);color:var(--text);}
.ip-scope h1,.ip-scope h2,.ip-scope h3{font-family:'Playfair Display',serif;font-weight:900;margin:0;}
.ip-scope em{font-style:italic;color:var(--gold);}
.ip-scope .lead{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:500;}
.ip-scope .mono{font-family:'JetBrains Mono',monospace;letter-spacing:0.12em;text-transform:uppercase;}
.ip-scope .eyebrow{display:flex;align-items:center;gap:12px;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:600;letter-spacing:0.28em;text-transform:uppercase;color:var(--gold-dim);margin-bottom:18px;}
.ip-scope .eyebrow::before,.ip-scope .eyebrow::after{content:"";flex:0 0 24px;height:1px;background:var(--gold);}
.ip-scope .demo-flag{background:var(--navy-deep);color:var(--gold-dim);font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:0.14em;text-align:center;padding:6px;}
.ip-scope header.top{background:var(--bg-alt);padding:16px 5vw;}
.ip-scope .brandrow{display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;}
.ip-scope .brand-left{display:flex;align-items:center;gap:14px;}
.ip-scope .flag{width:40px;height:27px;border-radius:2px;overflow:hidden;flex-shrink:0;}
.ip-scope .flag svg{display:block;width:100%;height:100%;}
.ip-scope .brandmark{font-family:'Playfair Display',serif;font-weight:900;font-size:22px;line-height:1;}
.ip-scope .brandsub{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.2em;color:var(--gold-dim);text-transform:uppercase;margin-top:4px;}
.ip-scope .top-actions{display:flex;align-items:center;gap:10px;flex-wrap:wrap;}
.ip-scope .idx-badge{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.12em;color:var(--navy);background:var(--gold);padding:10px 14px;border-radius:2px;font-weight:700;height:38px;display:flex;align-items:center;}
.ip-scope .fond-group{display:flex;align-items:center;gap:8px;}
.ip-scope .flabel{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.16em;color:var(--text-dim);text-transform:uppercase;}
.ip-scope .theme-toggle{display:flex;border:1px solid var(--gold-dim);border-radius:2px;overflow:hidden;height:38px;}
.ip-scope .theme-toggle button{background:none;border:none;color:var(--text-dim);font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;padding:0 13px;cursor:pointer;}
.ip-scope .theme-toggle button.active{background:var(--gold);color:var(--navy);font-weight:700;}
.ip-scope .btn{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;padding:0 18px;height:38px;border-radius:2px;cursor:pointer;border:1px solid var(--gold-dim);background:none;color:var(--text);display:inline-flex;align-items:center;}
.ip-scope .btn:disabled{opacity:0.5;cursor:not-allowed;}
.ip-scope .btn-gold{background:var(--gold);color:var(--navy);border-color:var(--gold);font-weight:700;}
.ip-scope nav.tabs{display:flex;background:var(--bg-alt);padding:0 5vw;border-top:1px solid var(--line);overflow-x:auto;}
.ip-scope nav.tabs a{flex:1;min-width:150px;background:none;border:none;border-bottom:2px solid transparent;cursor:pointer;padding:14px 10px 12px;display:flex;flex-direction:column;align-items:center;gap:4px;color:var(--text-dim);text-decoration:none;}
.ip-scope nav.tabs a .row{display:flex;align-items:center;gap:7px;}
.ip-scope nav.tabs a .tab-label{font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text);}
.ip-scope nav.tabs a .tab-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:12.5px;color:var(--text-dim);white-space:nowrap;}
.ip-scope nav.tabs a.active{border-bottom-color:var(--gold);}
.ip-scope nav.tabs a.active .tab-label,.ip-scope nav.tabs a.active .tab-sub{color:var(--gold-soft);}
.ip-scope nav.tabs a svg{color:var(--gold-dim);}
.ip-scope nav.tabs a.active svg{color:var(--gold);}
.ip-scope main.ip-main{max-width:1360px;margin:0 auto;}
.ip-scope .card{background:var(--card);border:1px solid var(--line);border-radius:2px;padding:18px;}
.ip-scope .rank-row{display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid var(--line);}
.ip-scope .rank-row:last-child{border-bottom:none;}
.ip-scope .rank-name{width:130px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;}
.ip-scope .rank-score{font-family:'Playfair Display',serif;font-weight:700;font-size:18px;width:70px;}
.ip-scope .delta{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;}
.ip-scope .up{color:var(--growth);}.ip-scope .down{color:var(--alert);}
.ip-scope .heatmap{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
@media (max-width:760px){.ip-scope .heatmap{grid-template-columns:repeat(2,1fr);}}
.ip-scope .region{border-radius:2px;padding:16px 14px;color:#F5F1E8;min-height:92px;display:flex;flex-direction:column;justify-content:space-between;}
.ip-scope .region .rname{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:0.06em;text-transform:uppercase;opacity:.85;}
.ip-scope .region .rtheme{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;}
.ip-scope .region.locked-placeholder{background:var(--card);color:var(--text-dim);border:1px dashed var(--line);align-items:center;justify-content:center;text-align:center;}
.ip-scope .lock-badge{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold-dim);display:flex;align-items:center;gap:6px;justify-content:center;}
.ip-scope .gate-premium{background:var(--navy-deep);border:1px solid var(--gold-dim);border-radius:2px;padding:30px;text-align:center;color:var(--ivory);}
.ip-scope .gate-premium .lock{width:32px;height:32px;margin:0 auto 12px;border:1px solid var(--gold);border-radius:2px;display:flex;align-items:center;justify-content:center;color:var(--gold);}
.ip-scope .gate-premium h3{font-size:21px;color:var(--gold-soft);margin-bottom:8px;}
.ip-scope .gate-premium p{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:rgba(245,241,232,0.75);max-width:520px;margin:0 auto 16px;}
.ip-scope .gate-status{margin-top:10px;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;color:var(--growth);text-transform:uppercase;}
.ip-scope .actor-picker{display:flex;gap:10px;margin-bottom:22px;flex-wrap:wrap;}
.ip-scope .actor-picker button{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;padding:8px 14px;border:1px solid var(--line);background:var(--card);color:var(--text);border-radius:2px;cursor:pointer;}
.ip-scope .actor-picker button.active{background:var(--gold);color:var(--navy);border-color:var(--gold);}
.ip-scope .actor-picker button:disabled{opacity:0.55;cursor:not-allowed;}
.ip-scope .radar-layout{display:grid;grid-template-columns:1.1fr 1fr;gap:30px;align-items:center;}
@media (max-width:820px){.ip-scope .radar-layout{grid-template-columns:1fr;}}
.ip-scope footer.ip-footer{background:var(--navy-deep);color:var(--ivory);border-top:1px solid rgba(201,168,76,0.15);padding:22px 5vw 30px;text-align:center;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(245,241,232,0.5);}
`;

interface Props {
  activeSlug: string;
  children: ReactNode;
}

const IPShell = ({ activeSlug, children }: Props) => {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useIPTheme();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="ip-scope" data-theme={theme}>
      <style>{SCOPED_CSS}</style>
      <div className="demo-flag">
        Buildfluence · Sovereign Decision Infrastructure
      </div>

      <header className="top">
        <div className="brandrow">
          <div className="brand-left">
            <div className="flag">
              <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice">
                <rect width="3" height="2" fill="#C1272D" />
                <path d="M1.5,0.5 L1.79,1.35 L1.02,0.79 L1.98,0.79 L1.21,1.35 Z" fill="none" stroke="#006233" strokeWidth="0.05" />
              </svg>
            </div>
            <div>
              <div className="brandmark">
                Intelligence <em>Politique</em>
              </div>
              <div className="brandsub">Buildfluence · Législatives Maroc 2026</div>
            </div>
          </div>
          <div className="top-actions">
            <button type="button" className="idx-badge" style={{ border: "none", cursor: "pointer" }} onClick={() => navigate(METHODO_ROUTE)} title="À propos de l'IBDN®">IBDN®</button>
            <div className="fond-group">
              <span className="flabel">Fond</span>
              <div className="theme-toggle">
                <button className={theme === "dark" ? "active" : ""} onClick={() => setTheme("dark")}>Sombre</button>
                <button className={theme === "light" ? "active" : ""} onClick={() => setTheme("light")}>Clair</button>
              </div>
            </div>
            {session ? (
              <button className="btn" onClick={() => { void signOut(); }}>Se déconnecter</button>
            ) : (
              <>
                <button className="btn" onClick={() => setAuthOpen(true)}>Se connecter</button>
                <button className="btn btn-gold" onClick={() => setAuthOpen(true)}>S'inscrire gratuitement</button>
              </>
            )}
          </div>
        </div>
      </header>

      <nav className="tabs">
        {TABS.map((t) => (
          <Link
            key={t.slug}
            to={t.route}
            className={activeSlug === t.slug ? "active" : ""}
            onClick={(e) => {
              e.preventDefault();
              navigate(t.route);
            }}
          >
            <div className="row">{t.icon}<span className="tab-label">{t.label}</span></div>
            <div className="tab-sub">{t.sub}</div>
          </Link>
        ))}
      </nav>

      <main className="ip-main">{children}</main>

      <footer className="ip-footer">
        © Buildfluence · Maquette de démonstration · IBDN®
      </footer>

      <IPAuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
};

export default IPShell;
