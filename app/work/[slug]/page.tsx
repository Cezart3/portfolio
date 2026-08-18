import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EvidenceChip } from "@/components/EvidenceChip";
import { projects, projectBySlug } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const position = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(position + 1) % projects.length]!;

  return (
    <article className="case">
      <header className="case-head">
        <div className="shell">
          <Link href="/#work" className="case-back mono-meta link-quiet">
            &#8592; All work
          </Link>

          <p className="case-kind mono-meta">
            {project.kind} · {project.period}
          </p>

          <h1 className="display-hero case-name">{project.name}</h1>

          <p className="lede case-summary">{project.summary}</p>

          <div className="case-evidence">
            <EvidenceChip evidence={project.evidence} />
          </div>

          {project.role ? (
            <p className="mono-meta case-role">Role: {project.role}</p>
          ) : null}

          <ul className="case-links mono-meta">
            {project.links.map((link) => (
              <li key={link.href}>
                <a
                  className="link-underline"
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="tag-row case-stack">
            {project.stack.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>

          {project.note ? (
            <aside className="case-note">
              <p className="mono-meta case-note-label">Standing note</p>
              <p className="case-note-body">{project.note}</p>
            </aside>
          ) : null}
        </div>
      </header>

      {project.sections.map((section) => (
        <section key={section.title} className="section-band">
          <div className="shell rail">
            <h2 className="case-section-title">{section.title}</h2>
            <div className="rail-content prose-col">
              {section.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              {section.list ? (
                <dl className="case-list">
                  {section.list.map((entry) => (
                    <div key={entry.term} className="case-list-item">
                      <dt>{entry.term}</dt>
                      <dd>{entry.text}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </div>
        </section>
      ))}

      <nav className="section-band case-next" aria-label="Next project">
        <div className="shell rail">
          <p className="rail-label">Next</p>
          <div className="rail-content">
            <Link href={`/work/${next.slug}`} className="case-next-link">
              <span className="display-section">{next.name}</span>
              <span className="case-next-line">{next.index}</span>
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
