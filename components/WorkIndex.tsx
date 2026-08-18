import Link from "next/link";
import { projects } from "@/content/projects";
import { EvidenceChip } from "./EvidenceChip";

/**
 * The index doubles as navigation and as the argument: every system on one
 * screen, each with the one number worth knowing and the artefact that stands
 * behind it.
 */
export function WorkIndex() {
  return (
    <ol className="index-list">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link href={`/work/${project.slug}`} className="index-row">
            <span className="index-identity">
              <span className="display-sub index-name">{project.name}</span>
              <span className="mono-meta index-kind">
                {project.period} · {project.kind}
              </span>
            </span>

            <span className="index-body">
              <span className="index-line">{project.index}</span>
              <span className="mono-meta index-metric">
                <span className="index-metric-value">
                  {project.metric.value}
                </span>{" "}
                {project.metric.label}
              </span>
              <span className="index-stack mono-meta">
                {project.stack.slice(0, 4).join(" · ")}
              </span>
            </span>

            <span className="index-aside">
              <span className="index-aside-top">
                <EvidenceChip evidence={project.evidence} showDetail={false} />
                <span className="index-arrow" aria-hidden="true">
                  &#8594;
                </span>
              </span>
              <span className="index-evidence mono-meta">
                {project.evidence.detail}
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
