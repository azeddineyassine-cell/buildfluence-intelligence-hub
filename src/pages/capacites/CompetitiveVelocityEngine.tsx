<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buildfluence - Competitive Velocity Engine</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        :root {
            --primary: #1B3E6A;
            --accent: #C9A84C;
            --bg: #F8FAFC;
            --text-dark: #0F172A;
            --text-light: #64748B;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { 
            background: var(--bg); 
            font-family: 'Inter', sans-serif;
            color: var(--text-dark);
            line-height: 1.6;
            padding-bottom: 100px;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }

        /* HEADER */
        .hero { text-align: center; margin-bottom: 50px; }
        .hero h1 { font-size: 44px; font-weight: 800; color: var(--primary); margin-bottom: 15px; letter-spacing: -1px; }
        .hero h1 span { color: var(--accent); }
        .hero p { font-size: 19px; color: var(--text-dark); max-width: 850px; margin: 0 auto 30px; font-weight: 500; }
        
        .tags-container { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
        .tag { 
            background: var(--accent); color: white; padding: 10px 25px; 
            border-radius: 50px; font-weight: 800; font-size: 13px;
            text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 12px rgba(201, 168, 76, 0.2);
        }

        /* ENGINE SECTION */
        .engine-grid {
            display: grid; grid-template-columns: 1.2fr 1fr; gap: 40px;
            background: white; padding: 50px; border-radius: 40px;
            box-shadow: 0 30px 60px rgba(15, 23, 42, 0.05);
            margin-bottom: 60px; align-items: center;
        }

        .svg-container { position: relative; }
        .sector { cursor: pointer; transition: all 0.3s ease; }
        .sector:hover { filter: brightness(1.2); }
        .sector.active .path-main { fill: var(--accent) !important; }

        .label-group text {
            fill: white; font-weight: 700; text-anchor: middle;
            text-transform: uppercase; pointer-events: none;
        }
        .label-text { font-size: 10px; letter-spacing: 0.2px; }
        .icon-svg { font-size: 26px; }

        /* INFO PANEL */
        .info-panel {
            background: #F8FAFC; padding: 45px; border-radius: 30px;
            min-height: 480px; display: flex; flex-direction: column;
            justify-content: center; border-left: 8px solid var(--accent);
            transition: opacity 0.3s ease;
        }
        .info-panel h2 { color: var(--primary); font-size: 32px; margin: 0 0 15px 0; font-weight: 800; text-transform: uppercase; }
        .panel-sub { color: var(--accent); font-weight: 700; text-transform: uppercase; font-size: 13px; margin-bottom: 25px; letter-spacing: 1.5px; }
        .info-panel ul { padding: 0; list-style: none; }
        .info-panel li { 
            margin-bottom: 18px; padding-left: 30px; position: relative;
            color: #334155; font-size: 16px;
        }
        .info-panel li::before {
            content: "→"; position: absolute; left: 0; color: var(--accent); font-weight: 900;
        }
        .italic-msg { font-style: italic; color: var(--text-light); margin-top: 15px; border-top: 1px solid #E2E8F0; pt: 15px; }

        /* 3 CARDS */
        .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .card {
            background: white; padding: 45px 30px; border-radius: 30px;
            text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.02);
            border: 1px solid #F1F5F9; transition: all 0.3s ease;
        }
        .card:hover { transform: translateY(-10px); border-color: var(--accent); }
        .card .icon-box { font-size: 44px; margin-bottom: 25px; }
        .card h4 { color: var(--primary); margin: 0 0 15px 0; font-size: 18px; font-weight: 800; text-transform: uppercase; }
        .card p { color: var(--text-light); font-size: 15px; font-style: italic; }

        /* FOOTER */
        .footer { text-align: center; margin-top: 80px; }
        .cta-btn {
            background: var(--primary); color: white; padding: 22px 50px;
            border-radius: 60px; text-decoration: none; font-weight: 800;
            display: inline-block; transition: all 0.3s ease;
            box-shadow: 0 15px 30px rgba(27, 62, 106, 0.2);
            text-transform: uppercase; letter-spacing: 1px;
        }
        .cta-btn:hover { background: var(--accent); transform: scale(1.05); }

        @media (max-width: 950px) {
            .engine-grid, .cards-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>

<div class="container">
    <header class="hero">
        <h1>COMPETITIVE <span>VELOCITY</span> ENGINE</h1>
        <p>Une nouvelle génération d'analyse stratégique, conçue pour accélérer la prise de décision dans des environnements concurrentiels et hyper-complexes.</p>
        <div class="tags-container">
            <span class="tag">Benchmark</span>
            <span class="tag">Analyse</span>
            <span class="tag">Anticipation</span>
            <span class="tag">Décision</span>
        </div>
    </header>

    <div class="engine-grid">
        <div class="svg-container">
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <g class="sector" onclick="update('geo', this)">
                    <path class="path-main" d="M250,250 L250,50 A200,200 0 0,1 423,150 Z" fill="#1B3E6A" stroke="#FFF" stroke-width="3"/>
                    <g transform="translate(330, 130)" class="label-group">
                        <text class="icon-svg" y="-15">🌍</text>
                        <text class="label-text" y="15">Géopolitique</text>
                    </g>
                </g>
                <g class="sector" onclick="update('eco', this)">
                    <path class="path-main" d="M250,250 L423,150 A200,200 0 0,1 423,350 Z" fill="#1B3E6A" opacity="0.95" stroke="#FFF" stroke-width="3"/>
                    <g transform="translate(400, 250)" class="label-group">
                        <text class="icon-svg" y="-15">📊</text>
                        <text class="label-text" y="15">Market Intelligence</text>
                    </g>
                </g>
                <g class="sector" onclick="update('tech', this)">
                    <path class="path-main" d="M250,250 L423,350 A200,200 0 0,1 250,450 Z" fill="#1B3E6A" stroke="#FFF" stroke-width="3"/>
                    <g transform="translate(330, 370)" class="label-group">
                        <text class="icon-svg" y="-15">💡</text>
                        <text class="label-text" y="15">Technologie</text>
                    </g>
                </g>
                <g class="sector" onclick="update('sce', this)">
                    <path class="path-main" d="M250,250 L250,450 A200,200 0 0,1 77,350 Z" fill="#1B3E6A" opacity="0.95" stroke="#FFF" stroke-width="3"/>
                    <g transform="translate(170, 370)" class="label-group">
                        <text class="icon-svg" y="-15">🔮</text>
                        <text class="label-text" y="15">Scénarios</text>
                    </g>
                </g>
                <g class="sector" onclick="update('sys', this)">
                    <path class="path-main" d="M250,250 L77,350 A200,200 0 0,1 77,150 Z" fill="#1B3E6A" stroke="#FFF" stroke-width="3"/>
                    <g transform="translate(110, 250)" class="label-group">
                        <text class="icon-svg" y="-15">🗺️</text>
                        <text class="label-text" y="15">Écosystème</text>
                    </g>
                </g>
                <g class="sector" onclick="update('dec', this)">
                    <path class="path-main" d="M250,250 L77,150 A200,200 0 0,1 250,50 Z" fill="#1B3E6A" opacity="0.95" stroke="#FFF" stroke-width="3"/>
                    <g transform="translate(170, 130)" class="label-group">
                        <text class="icon-svg" y="-15">⚡</text>
                        <text class="label-text" y="15">Décision</text>
                    </g>
                </g>

                <g class="sector" onclick="resetEngine()">
                    <circle cx="250" cy="250" r="72" fill="white" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));"/>
                    <text x="250" y="255" fill="#1B3E6A" font-size="8" font-weight="900" text-anchor="middle">BUILDFLUENCE</text>
                </g>
            </svg>
        </div>

        <div class="info-panel" id="info-panel">
            <div id="panel-inner">
                <div class="panel-sub">Dispositif Stratégique</div>
                <h2>Activez le Moteur</h2>
                <p>Cliquez sur les secteurs du cercle pour explorer notre méthodologie d’Etude, d’Analyse et Benchmark.</p>
                <p style="margin-top:20px; font-weight:600; color:var(--primary)">Chaque point est une brique de votre avantage compétitif.</p>
                <div class="italic-msg">Notre Track Record est multi sectoriel avec des résultats conformes aux attentes clients.</div>
            </div>
        </div>
    </div>

    <div class="cards-grid">
        <div class="card">
            <div class="icon-box">🔬</div>
            <h4>C'est plus qu'une étude</h4>
            <p>Des écosystèmes de décision construits sur mesure, pas des rapports statiques livrés et oubliés.</p>
        </div>
        <div class="card">
            <div class="icon-box">📈</div>
            <h4>C'est plus qu'un benchmark</h4>
            <p>Une lecture des stratégies implicites que les données seules ne révèlent jamais.</p>
        </div>
        <div class="card">
            <div class="icon-box">⚙️</div>
            <h4>C'est un moteur décisionnel</h4>
            <p>Conçu pour inverser les rapports de force en votre faveur, avant que vos concurrents ne s'en aperçoivent.</p>
        </div>
    </div>

    <footer class="footer">
        <a href="#" class="cta-btn">Activez votre Competitive Velocity Engine →</a>
    </footer>
</div>

<script>
    const data = {
        geo: { sub: "Captation & Analyse", title: "Conflits Géopolitiques", list: ["Surveillance des tensions régionales","Détection des ruptures avant médiatisation","Analyse d'impact marchés stratégiques","Cartographie influence diplomatique","Anticipation décisions réglementaires"] },
        eco: { sub: "Flux & Compétitivité", title: "Market Intelligence", list: ["Suivi des flux d'IDE et capitaux","Analyse positions concurrentielles","Détection opportunités haut levier","Benchmarking attractivité international","Scoring de compétitivité dynamique"] },
        tech: { sub: "Innovation & Disruption", title: "Signaux Technologiques", list: ["Veille brevets et publications","Détection disruptions émergentes","Cartographie acteurs innovation","Analyse impact rapports de force","Partenariats technologiques clés"] },
        sce: { sub: "Projection & Anticipation", title: "Scénarios Anticipés", list: ["Modélisation 3, 6 et 12 mois","Projection mouvements concurrentiels","Simulation ruptures géopolitiques","Identification fenêtres opportunité","Plans de contingence stratégiques"] },
        sys: { sub: "Cartographie & Rapports", title: "Écosystème Modélisé", list: ["Mapping évolutif des acteurs","Visualisation flux et rapports force","Cartographie alliances et oppositions","Identification nœuds d'amplification","Mise à jour selon signaux captés"] },
        dec: { sub: "Output & Action", title: "Décision Accélérée", list: ["Hiérarchisation Go/No-Go/Timing","Réduction incertitude décisionnelle","Logique d'action vs Description","Livrables : Fiches, Dashboards","Briefings C-Level en temps réel"] }
    };

    function update(key, el) {
        document.querySelectorAll('.sector').forEach(s => s.classList.remove('active'));
        el.classList.add('active');
        const info = data[key];
        const html = `<div class="panel-sub">${info.sub}</div><h2>${info.title}</h2><ul>` + 
                     info.list.map(i => `<li>${i}</li>`).join('') + `</ul>`;
        document.getElementById('panel-inner').innerHTML = html;
    }

    function resetEngine() {
        document.querySelectorAll('.sector').forEach(s => s.classList.remove('active'));
        document.getElementById('panel-inner').innerHTML = `
            <div class="panel-sub">Dispositif Stratégique</div>
            <h2>Activez le Moteur</h2>
            <p>Cliquez sur les secteurs du cercle pour explorer notre méthodologie d’Etude, d’Analyse et Benchmark.</p>
            <p style="margin-top:20px; font-weight:600; color:var(--primary)">Chaque point est une brique de votre avantage compétitif.</p>
            <div class="italic-msg">Notre Track Record est multi sectoriel avec des résultats conformes aux attentes clients.</div>`;
    }
</script>
</body>
</html>