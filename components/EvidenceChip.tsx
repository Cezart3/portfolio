import type { Evidence } from "@/content/projects";

export type EvidenceSource = "machine" | "person" | "world";

/**
 * Who did the checking. The chip's colour follows this, so the palette
 * carries information rather than decoration.
 */
export function evidenceSource(mark: string): EvidenceSource {
  switch (mark.toLowerCase()) {
    case "proven":
    case "validated":
      return "machine";
    case "merged":
      return "person";
    default:
      return "world";
  }
}

export function EvidenceChip({
  evidence,
  showDetail = true,
}: {
  evidence: Evidence;
  showDetail?: boolean;
}) {
  return (
    <span className="grade" data-source={evidenceSource(evidence.mark)}>
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
