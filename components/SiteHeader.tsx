import Link from "next/link";
import { site } from "@/content/site";

const nav = [
  { label: "Work", href: "/#work" },
  { label: "Judgement", href: "/#judgement" },
  { label: "Stack", href: "/#stack" },
  { label: "About", href: "/#about" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell site-header-inner">
        <Link href="/" className="site-mark">
          <span className="site-mark-name">{site.name}</span>
          <span className="site-mark-role">{site.role}</span>
        </Link>
        <nav aria-label="Sections">
          <ul className="site-nav">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="site-nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={site.links.cv}
                className="site-nav-link site-nav-link-cv"
                download
              >
                CV
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
