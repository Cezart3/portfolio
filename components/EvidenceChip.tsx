import type { Evidence } from "@/content/projects";

/**
 * The chip pairs a kind of confidence with the artefact that pins it.
 * `strong` marks the cases where automated tests assert the claim.
 */
export function EvidenceChip({
  evidence,
  showDetail = true,
}: {
  evidence: Evidence;
  showDetail?: boolean;
}) {
  return (
    <span className="grade" data-grade={evidence.strong ? "A" : undefined}>
      <span className="grade-mark">{evidence.mark}</span>
      {showDetail ? (
        <>
          <span aria-hidden="true">·</span>
          <span className="grade-detail">{evidence.detail}</span>
        </>
      ) : null}
    </span>
  );
}
