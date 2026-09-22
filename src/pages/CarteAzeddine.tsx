const solutions = [
  { number: "01", label: "Global IPA Benchmark", href: "https://buildfluence.ai/benchmark-api-vs-amdie" },
  { number: "02", label: "Investment Barometer", href: "https://buildfluence.ai/barometre" },
  { number: "03", label: "Investor Intelligence & Due Diligence", href: "https://buildfluence.ai/solutions/deep-due-diligence" },
  { number: "04", label: "Soft Power & Influence", href: "https://buildfluence.ai/solutions/soft-power-influence" },
];

const actions = [
  { label: "Save My Contact", href: "/contact-azeddine.vcf", primary: true },
  { label: "Discover Buildfluence", href: "/" },
  { label: "Send an Email", href: "mailto:azeddine.yassine@buildfluence.ai" },
  { label: "Call Me", href: "tel:+212661227474" },
];

const CarteAzeddine = () => (
  <main className="azeddine-card-page">
    <style>{`
      .azeddine-card-page {
        --navy-deep:#08111c;
        --navy:#0D1B2A;
        --navy-mid:#1a2d44;
        --gold:#C9A84C;
        --gold-soft:#d4b866;
        --gold-dim:#8a7537;
        --gold-hover:#e0c88a;
        --ivory:#F5F1E8;
        --rule:rgba(245,241,232,0.14);
        min-height: 100vh;
        box-sizing: border-box;
        display: grid;
        place-items: center;
        padding: 32px 20px;
        background: linear-gradient(145deg, var(--navy-deep), var(--navy) 58%, var(--navy-mid));
        color: var(--ivory);
        font-family: "DM Sans", sans-serif;
      }
      .azeddine-card-page * { box-sizing: border-box; }
      .azeddine-card {
        width: min(100%, 720px);
        padding: 36px;
        border: 1px solid var(--rule);
        border-radius: 8px;
        background: var(--navy);
      }
      .azeddine-identity { text-align: center; }
      .azeddine-photo {
        width: 128px;
        height: 128px;
        object-fit: cover;
        object-position: center top;
        border: 2px solid var(--gold);
        border-radius: 50%;
      }
      .azeddine-name {
        margin: 20px 0 6px;
        color: var(--ivory);
        font-family: "Playfair Display", serif;
        font-size: 36px;
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: 0;
      }
      .azeddine-role { margin: 0; color: var(--gold-soft); font-size: 14px; font-weight: 700; }
      .azeddine-tagline { margin: 8px 0 0; color: var(--ivory); font-size: 13px; }
      .azeddine-contacts {
        display: grid;
        gap: 8px;
        margin: 28px 0;
        padding: 18px;
        border: 1px solid var(--rule);
        border-radius: 4px;
        background: var(--navy-deep);
        text-align: center;
      }
      .azeddine-contacts a {
        color: var(--ivory);
        font-family: "JetBrains Mono", monospace;
        font-size: 12px;
        text-decoration: none;
      }
      .azeddine-contacts a:hover, .azeddine-contacts a:focus-visible { color: var(--gold-hover); }
      .azeddine-label {
        margin: 0 0 14px;
        color: var(--gold-soft);
        font-size: 12px;
        font-weight: 700;
      }
      .azeddine-solutions, .azeddine-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .azeddine-solution {
        min-height: 92px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 18px;
        padding: 16px;
        border: 1px solid var(--rule);
        border-radius: 4px;
        color: var(--ivory);
        text-decoration: none;
      }
      .azeddine-solution:hover, .azeddine-solution:focus-visible { border-color: var(--gold-dim); }
      .azeddine-number { color: var(--gold); font-family: "JetBrains Mono", monospace; font-size: 11px; }
      .azeddine-solution-name { font-size: 13px; font-weight: 700; line-height: 1.35; }
      .azeddine-actions { margin-top: 22px; }
      .azeddine-action {
        min-height: 48px;
        display: grid;
        place-items: center;
        padding: 12px;
        border: 1px solid var(--gold-dim);
        border-radius: 4px;
        color: var(--ivory);
        font-size: 12px;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
      }
      .azeddine-action:hover, .azeddine-action:focus-visible { border-color: var(--gold-hover); color: var(--gold-hover); }
      .azeddine-action-primary { border-color: var(--gold); background: var(--gold); color: var(--navy); }
      .azeddine-action-primary:hover, .azeddine-action-primary:focus-visible { border-color: var(--gold-hover); background: var(--gold-hover); color: var(--navy-deep); }
      .azeddine-card-page a:focus-visible { outline: 2px solid var(--gold-hover); outline-offset: 3px; }
      @media (max-width: 560px) {
        .azeddine-card-page { padding: 18px 12px; }
        .azeddine-card { padding: 26px 18px; }
        .azeddine-name { font-size: 30px; }
        .azeddine-photo { width: 112px; height: 112px; }
      }
    `}</style>
    <article className="azeddine-card">
      <header className="azeddine-identity">
        <img className="azeddine-photo" src="/intelligence-politique/assets/azeddine-yassine.png" alt="Azeddine Yassine" />
        <h1 className="azeddine-name">Azeddine Yassine</h1>
        <p className="azeddine-role">Founder &amp; CEO</p>
        <p className="azeddine-tagline">Buildfluence · Sovereign Decision Infrastructure</p>
      </header>

      <address className="azeddine-contacts">
        <a href="tel:+212661227474">+212 6 61 22 74 74</a>
        <a href="mailto:azeddine.yassine@buildfluence.ai">azeddine.yassine@buildfluence.ai</a>
        <a href="https://www.buildfluence.ai">https://www.buildfluence.ai</a>
      </address>

      <p className="azeddine-label">Solutions</p>
      <div className="azeddine-solutions">
        {solutions.map((solution) => (
          <a className="azeddine-solution" href={solution.href} key={solution.number}>
            <span className="azeddine-number">{solution.number}</span>
            <span className="azeddine-solution-name">{solution.label}</span>
          </a>
        ))}
      </div>

      <div className="azeddine-actions">
        {actions.map((action) => (
          <a
            className={`azeddine-action${action.primary ? " azeddine-action-primary" : ""}`}
            href={action.href}
            key={action.label}
          >
            {action.label}
          </a>
        ))}
      </div>
    </article>
  </main>
);

export default CarteAzeddine;