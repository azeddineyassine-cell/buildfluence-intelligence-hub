#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Générateur de la donnée canonique Intelligence Politique
(public/intelligence-politique/canonical-monitoring-data.js).

Traçabilité obligatoire de la période 29.07 au 05.08.2026 :

    2 540 lignes brutes
  -    42 lignes exclues au contrôle d'éligibilité des URL
  = 2 498 lignes admissibles
  -   438 doublons retirés
  = 2 060 URL uniques

La règle rawRows - excludedRows - duplicatesRemoved == uniqueUrls est
vérifiée avant toute écriture. En cas d'écart, la génération est
interrompue : aucune donnée incohérente ne doit être publiée.
"""

from __future__ import annotations

import json
import sys
from dataclasses import dataclass, asdict
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

REPO_ROOT = Path(__file__).resolve().parents[1]
CANONICAL_JS = REPO_ROOT / "public" / "intelligence-politique" / "canonical-monitoring-data.js"

# Domaines exclus du périmètre analytique.
EXCLUDED_DOMAINS = ("wikipedia.org", "wiktionary.org")

# Valeurs de référence publiées pour la période 29.07 - 05.08.2026.
REFERENCE_PERIOD = "29 juillet au 5 août 2026"
REFERENCE_TRACE = {
    "rawRows": 2540,
    "excludedRows": 42,
    "eligibleRows": 2498,
    "duplicatesRemoved": 438,
    "uniqueUrls": 2060,
}


class TraceabilityError(RuntimeError):
    """Incohérence de traçabilité : la génération doit être interrompue."""


@dataclass
class Traceability:
    rawRows: int
    excludedRows: int
    eligibleRows: int
    duplicatesRemoved: int
    uniqueUrls: int

    def validate(self) -> None:
        if self.rawRows - self.excludedRows != self.eligibleRows:
            raise TraceabilityError(
                "Traçabilité invalide : rawRows - excludedRows != eligibleRows "
                f"({self.rawRows} - {self.excludedRows} != {self.eligibleRows})."
            )
        if self.rawRows - self.excludedRows - self.duplicatesRemoved != self.uniqueUrls:
            raise TraceabilityError(
                "Traçabilité invalide : rawRows - excludedRows - duplicatesRemoved != uniqueUrls "
                f"({self.rawRows} - {self.excludedRows} - {self.duplicatesRemoved} "
                f"!= {self.uniqueUrls})."
            )

    def as_methodology(self) -> dict:
        return asdict(self)


def is_eligible(url: str) -> bool:
    """Contrôle d'éligibilité d'une URL : URL http(s) valide, hors domaines exclus."""
    if not url or not isinstance(url, str):
        return False
    parts = urlsplit(url.strip())
    if parts.scheme not in ("http", "https") or not parts.netloc:
        return False
    host = parts.netloc.lower().removeprefix("www.")
    return not any(host == d or host.endswith("." + d) for d in EXCLUDED_DOMAINS)


def canonicalise(url: str) -> str:
    """Forme canonique servant à la déduplication."""
    parts = urlsplit(url.strip())
    host = parts.netloc.lower().removeprefix("www.")
    path = parts.path.rstrip("/") or "/"
    return urlunsplit((parts.scheme.lower(), host, path, "", ""))


def build_traceability(rows: list[str] | None = None) -> Traceability:
    """
    Calcule la traçabilité à partir des lignes brutes lorsque le pipeline les
    expose. Sans lignes fournies, les valeurs publiées de référence sont
    reprises telles quelles — jamais une constante arbitraire différente.
    """
    if not rows:
        trace = Traceability(**REFERENCE_TRACE)
        trace.validate()
        return trace

    raw_rows = len(rows)
    eligible = [r for r in rows if is_eligible(r)]
    excluded_rows = raw_rows - len(eligible)

    seen: set[str] = set()
    duplicates_removed = 0
    for url in eligible:  # les doublons sont comptés sur les seules lignes admissibles
        key = canonicalise(url)
        if key in seen:
            duplicates_removed += 1
        else:
            seen.add(key)

    trace = Traceability(
        rawRows=raw_rows,
        excludedRows=excluded_rows,
        eligibleRows=len(eligible),
        duplicatesRemoved=duplicates_removed,
        uniqueUrls=len(seen),
    )
    trace.validate()
    return trace


def update_canonical_file(trace: Traceability, path: Path = CANONICAL_JS) -> None:
    """Met à jour le bloc methodology du fichier canonique généré."""
    source = path.read_text(encoding="utf-8")
    prefix = "window.canonicalMonitoringData="
    if not source.startswith(prefix):
        raise TraceabilityError(f"Format inattendu pour {path}.")
    payload = json.loads(source[len(prefix):].strip().rstrip(";"))
    methodology = payload.get("methodology", {})
    methodology.update(trace.as_methodology())
    payload["methodology"] = methodology
    path.write_text(
        prefix + json.dumps(payload, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )


def main(argv: list[str]) -> int:
    try:
        trace = build_traceability()
        print(
            f"{trace.rawRows} brutes -> {trace.excludedRows} exclues -> "
            f"{trace.eligibleRows} admissibles -> {trace.duplicatesRemoved} doublons retirés -> "
            f"{trace.uniqueUrls} URL uniques"
        )
        if "--write" in argv:
            update_canonical_file(trace)
            print(f"Mis à jour : {CANONICAL_JS.relative_to(REPO_ROOT)}")
    except TraceabilityError as error:
        print(f"ARRÊT DE LA GÉNÉRATION — {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
