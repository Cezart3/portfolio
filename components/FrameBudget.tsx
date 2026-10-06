import type { CSSProperties } from "react";

/**
 * One run of the game's perf route, copied from docs/PERF.md in its repository:
 * Medium tier on the Radeon 760M, 1920x1080, frame cap off, commit 4be46cf.
 * Each bar is the 95th-percentile frame time at one stop, against the 60 fps
 * budget the tier is held to.
 */

const BUDGET_MS = 16.7;
const SCALE_MS = 18;

const spots: [string, number][] = [
  ["spawn beach", 7.4],
  ["wreck", 8.3],
  ["jungle cave", 7.3],
  ["native village", 8.3],
  ["trader", 8.5],
  ["base camp", 8.5],
  ["casino front", 6.4],
  ["casino floor", 6.4],
  ["casino tables", 7.0],
  ["every slot spinning", 6.0],
  ["the buggy", 8.5],
  ["the boat", 8.9],
  ["the barman", 7.0],
  ["the castaway", 8.0],
  ["a native", 8.5],
  ["a boar", 7.7],
  ["a deer", 9.1],
  ["a gull", 9.2],
  ["a jaguar", 7.6],
  ["a stag", 8.0],
  ["cliff overlook", 8.1],
  ["the volcano", 7.8],
  ["the plane", 9.3],
];

const pct = (ms: number) => `${((ms / SCALE_MS) * 100).toFixed(2)}%`;

export function FrameBudget() {
  const worst = Math.max(...spots.map(([, ms]) => ms));

  return (
    <figure className="budget">
      <figcaption className="specimen-cap mono-meta">
        p95 frame time, Medium tier, Radeon 760M integrated graphics
      </figcaption>

      <ol
        className="budget-list mono-meta"
        style={{ "--budget": pct(BUDGET_MS) } as CSSProperties}
      >
        {spots.map(([spot, ms]) => (
          <li key={spot} className="budget-row" title={`${spot}: ${ms} ms p95`}>
            <span className="budget-spot">{spot}</span>
            <span className="budget-track" aria-hidden="true">
              <span className="budget-bar" style={{ width: pct(ms) }} />
            </span>
            <span className="budget-ms">{ms.toFixed(1)}</span>
          </li>
        ))}
      </ol>

      <p className="budget-key mono-meta">
        <span className="budget-key-line" aria-hidden="true" /> 16.7 ms budget
        (60 fps) · worst stop {worst} ms · 23 stops across both islands
      </p>
    </figure>
  );
}
