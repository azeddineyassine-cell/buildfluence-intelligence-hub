import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/contexts/LanguageContext";

export interface SEOProps {
  titleFr: string;
  titleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
}

const SITE_ORIGIN = "https://buildfluence.ai";
const DEFAULT_OG_IMAGE = "https://buildfluence.ai/og-image.png";

const SEO = ({
  titleFr,
  titleEn,
  descriptionFr,
  descriptionEn,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: SEOProps) => {
  const { lang } = useLanguage();
  const isFr = lang === "fr";
  const title = isFr ? titleFr : titleEn;
  const description = isFr ? descriptionFr : descriptionEn;
  const canonical = `${SITE_ORIGIN}${path}`;
  const locale = isFr ? "fr_MA" : "en_US";
  const localeAlt = isFr ? "en_US" : "fr_MA";

  return (
    <Helmet htmlAttributes={{ lang: isFr ? "fr" : "en" }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content={localeAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};

export default SEO;
