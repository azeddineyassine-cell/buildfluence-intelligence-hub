import { ReactNode } from "react";

/**
 * Discreet entity link — same color as surrounding text, subtle gold underline,
 * opens the official source in a new tab. Used for SEO entity linking / knowledge graph.
 */
interface EntityLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export const EntityLink = ({ href, children, className }: EntityLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`entity-link ${className ?? ""}`}
  >
    {children}
  </a>
);

export default EntityLink;
