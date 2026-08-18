/**
 * One rental ad, and the record the pipeline builds out of it.
 * The ad text is written for this page, not copied from a listing site.
 * Highlighted spans map to the fields underneath them.
 */

const record = [
  { field: "rooms", value: "2" },
  { field: "zone", value: "Mărăști" },
  { field: "heating", value: "own_boiler" },
  { field: "parking", value: "included" },
  { field: "price_eur", value: "350 / month" },
  { field: "walk_to_utcn", value: "18 min", derived: true },
];

export function ExtractionSpecimen() {
  return (
    <figure className="specimen">
      <figcaption className="specimen-cap mono-meta">
        A rental ad, and the record built from it
      </figcaption>

      <p className="specimen-source" lang="ro">
        Închiriez apartament <mark>2 camere</mark>, decomandat, zona{" "}
        <mark>Mărăști</mark>, et. 3/4, <mark>centrală proprie</mark>, mobilat și
        utilat complet, <mark>loc de parcare inclus</mark>, liber de la 1
        septembrie. Preț <mark>350 euro</mark> + garanție.
      </p>

      <dl className="specimen-record mono-meta">
        {record.map((row) => (
          <div key={row.field} className="specimen-row">
            <dt>{row.field}</dt>
            <dd>
              {row.value}
              {row.derived ? (
                <span className="specimen-derived"> derived</span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
