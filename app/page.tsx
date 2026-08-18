import { Section } from "@/components/Section";
import { WorkIndex } from "@/components/WorkIndex";
import { site, stack } from "@/content/site";

/**
 * Three decisions where the better-looking option lost. Each one is documented
 * in the repository it came from — this section exists because what someone
 * rejected says more than what they shipped.
 */
const discarded = [
  {
    strike: "A 63% win rate",
    source: "TradingBot",
    body: "A one-to-one variant of the trade filter beat the shipped configuration on the number everyone looks at first. Its bootstrapped confidence interval for expectancy included zero, and one walk-forward fold came out negative. The two-to-one setup, with the worse win rate, held its edge in every fold. The prettier number lost.",
  },
  {
    strike: "A model for the hard part",
    source: "Kira",
    body: "Reading heating and parking out of messy Romanian ad text is the part of the rental aggregator worth training a model on. It runs on regex instead: auditable when a listing comes out wrong, free per listing, and it works offline. The more impressive choice was the worse one.",
  },
  {
    strike: "Generated serializers",
    source: "Unlost in Translation",
    body: "The compiler plugin that writes serialization code for you would not cooperate with Compose Multiplatform on WebAssembly. Writing those serializers by hand was the dull way through, and it was what unblocked the browser build entirely.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell">
          <p className="hero-eyebrow mono-meta rise">
            {site.role} · {site.location} ·{" "}
            <span className="hero-open">
              open to internships and junior roles
            </span>
          </p>
          <h1 className="display-hero hero-name rise">{site.name}</h1>
          <p className="hero-thesis rise">{site.thesis}</p>
          <ul className="hero-links mono-meta rise">
            <li>
              <a
                className="link-underline"
                href={site.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="link-underline"
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a className="link-underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="link-underline" href={site.links.cv} download>
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Section id="work" label="Selected work" tone="deep">
        <div className="work-head">
          <h2 className="display-section">
            Five systems, and what pins each one
          </h2>
          <p className="prose-col work-head-note">
            Each entry says what stands behind it, and the colour says who did
            the checking. <strong>Proven</strong> and <strong>validated</strong>{" "}
            mean a machine did — a test suite that fails when the behaviour
            breaks, or an out-of-sample run built to kill the result.{" "}
            <strong>Merged</strong> means a person did: a maintainer reviewed
            the work and took it. <strong>In use</strong> and{" "}
            <strong>shipped</strong> mean the world did.
          </p>
        </div>
        <WorkIndex />
      </Section>

      <Section id="judgement" label="Judgement">
        <h2 className="display-section">What I threw out</h2>
        <p className="discard-lede prose-col">
          The decisions I would want to be asked about.
        </p>

        <ol className="discard-list">
          {discarded.map((item) => (
            <li key={item.strike} className="discard-item">
              <div>
                <h3 className="discard-mark">
                  <span className="discard-strike">{item.strike}</span>
                </h3>
                <span className="discard-source">{item.source}</span>
              </div>
              <p className="discard-body">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="stack" label="Stack">
        <h2 className="display-section">What I reach for</h2>
        <p className="stack-lede prose-col">
          Graded the same way the projects are, because a list that claims
          everything claims nothing.
        </p>
        <dl className="stack-grid">
          {stack.map((group) => (
            <div key={group.group} className="stack-group">
              <dt className="stack-group-head">
                <span className="mono-meta stack-group-name">{group.group}</span>
                <span className="stack-group-note">{group.note}</span>
              </dt>
              <dd className="stack-group-items">
                <ul className="tag-row">
                  {group.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="about" label="About">
        <h2 className="display-section">
          Cluj-Napoca, fourth-year computer science
        </h2>
        <div className="about-grid">
          <div className="prose-col">
            {site.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <dl className="about-facts mono-meta">
            <div>
              <dt>Education</dt>
              <dd>
                {site.education.degree}
                <br />
                {site.education.school}
                <br />
                {site.education.period}
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>
                {site.languages.map((lang) => (
                  <span key={lang.name}>
                    {lang.name} — {lang.level}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{site.location}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section id="contact" label="Contact" tone="deep">
        <h2 className="display-section contact-head">
          Looking for a backend or ML internship, and reading every message.
        </h2>
        <p className="contact-email">
          <a className="link-underline" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <ul className="contact-links mono-meta">
          <li>
            <a
              className="link-underline"
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              className="link-underline"
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              className="link-underline"
              href={site.links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a className="link-underline" href={site.links.cv} download>
              Download CV
            </a>
          </li>
        </ul>
      </Section>
    </>
  );
}
