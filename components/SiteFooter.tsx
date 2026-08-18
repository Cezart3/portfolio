import { site } from "@/content/site";

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-inner">
        <p className="mono-meta">
          {site.name} · {site.location}
        </p>
        <ul className="site-footer-links mono-meta">
          <li>
            <a className="link-quiet" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a
              className="link-quiet"
              href={site.links.github}
              rel="me noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="link-quiet"
              href={site.links.linkedin}
              rel="me noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="link-quiet"
              href={site.links.instagram}
              rel="me noreferrer"
              target="_blank"
            >
              Instagram
            </a>
          </li>
          <li>
            <a className="link-quiet" href={site.links.cv} download>
              CV (PDF)
            </a>
          </li>
        </ul>
        <p className="mono-meta site-footer-colophon">
          &copy; {year} · Set in Archivo, Newsreader and JetBrains Mono
        </p>
      </div>
    </footer>
  );
}
