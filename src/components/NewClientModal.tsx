import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import rajaLogo from "@/assets/clients/raja-club-athletic.jpg";

const STORAGE_KEY = "bf_new_client_modal_shown";

const NewClientModal = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        setOpen(true);
        sessionStorage.setItem(STORAGE_KEY, "1");
      }
    } catch {
      setOpen(true);
    }
  }, []);

  if (!open) return null;

  const close = () => setOpen(false);

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(13,27,42,0.82)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "#FAF6ED",
          borderTop: "3px solid #C9A84C",
          borderRadius: "4px",
          padding: "24px 28px",
          maxWidth: "480px",
          width: "100%",
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.4)",
        }}
      >
        <button
          onClick={close}
          aria-label={t("Fermer", "Close")}
          style={{
            position: "absolute",
            top: "10px",
            right: "12px",
            background: "transparent",
            border: "none",
            fontSize: "22px",
            lineHeight: 1,
            color: "#888780",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
          <img
            src={rajaLogo}
            alt="Raja Club Athletic"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              border: "2px solid #C9A84C",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "8px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C9A84C",
                marginBottom: "4px",
              }}
            >
              {t("NOUVEAU CLIENT", "NEW CLIENT")}
            </div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#0D1B2A",
              }}
            >
              {t("Raja Club Athlétic", "Raja Club Athletic")}
            </div>
          </div>
        </div>

        <p
          style={{
            borderLeft: "2px solid #C9A84C",
            paddingLeft: "12px",
            fontSize: "13px",
            color: "#5F5E5A",
            lineHeight: 1.6,
            margin: "0 0 20px 0",
          }}
        >
          {t(
            "Découvrez comment la veille stratégique est devenue un bouclier informationnel pour le Club.",
            "Discover how strategic intelligence became an informational shield for the Club."
          )}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => window.open("/Cas_client_RCA_v2.html", "_blank")}
            style={{
              background: "#C9A84C",
              color: "#0D1B2A",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              textTransform: "uppercase",
              fontWeight: 700,
              padding: "10px 18px",
              borderRadius: "2px",
              border: "none",
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            {t("VOIR LE CAS CLIENT", "VIEW CLIENT CASE")}
          </button>
          <button
            onClick={close}
            style={{
              background: "transparent",
              color: "#888780",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              textTransform: "uppercase",
              border: "none",
              padding: "10px 12px",
              letterSpacing: "0.1em",
              cursor: "pointer",
            }}
          >
            {t("Fermer", "Close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewClientModal;
