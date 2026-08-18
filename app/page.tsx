import { ExtractionSpecimen } from "@/components/ExtractionSpecimen";
import { Section } from "@/components/Section";
import { WorkIndex } from "@/components/WorkIndex";
import { site, stack } from "@/content/site";

const approach = [
  {
    source: "TradingBot",
    claim: "A number that looks good is a hypothesis, not a result.",
    instance:
      "A variant of the trading filter produced a 63% win rate, far prettier than the one that shipped. Its bootstrapped confidence interval for expectancy included zero and one walk-forward fold went negative, so it was rejected in favour of the configuration with the worse-looking number and the edge that held in every fold.",
  },
  {
    source: "Unlost in Translation",
    claim: "Say out loud which parts have never been run.",
    instance:
      "The translation app carries a document grading every component by how much evidence stands behind it. It states plainly that the camera hand-off, the text-to-speech layer, the watch service and most browser APIs have never executed anywhere. Knowing where the untested edges are is what makes the tested middle worth anything.",
  },
  {
    source: "Kira",
    claim:
      "The half that never gets demonstrated is the half that has to be right.",
    instance:
      "Per-IP rate limiting, an SSRF-safe image proxy, and phone numbers stripped out of ad text before storage. An API key that used to travel in a URL and got printed on screen by a timeout, moved into a header with two tests standing over it. None of this shows up in a screenshot.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow mono-meta rise">
              {site.role} · {site.location} · open to internships and junior
              roles
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
          <ExtractionSpecimen />
        </div>
      </section>

      <Section id="work" label="Selected work">
        <div className="work-head">
          <h2 className="display-section">
            Five systems, and what pins each one
          </h2>
          <p className="prose-col work-head-note">
            Every entry carries the kind of confidence that stands behind it:{" "}
            <strong>proven</strong> when automated tests assert the behaviour,{" "}
            <strong>validated</strong> when the result survived an out-of-sample
            test built to break it, <strong>in use</strong> when real people
            depend on it daily, <strong>merged</strong> when someone else
            reviewed and accepted it, <strong>shipped</strong> when it is out
            there and judged by use.
          </p>
        </div>
        <WorkIndex />
      </Section>

      <Section id="approach" label="How I work">
        <h2 className="display-section">
          Three habits, and where each one came from
        </h2>
        <ol className="approach-list">
          {approach.map((item) => (
            <li key={item.claim} className="approach-item">
              <span className="approach-source mono-meta">
                learned on
                <br />
                <strong>{item.source}</strong>
              </span>
              <div>
                <h3 className="approach-claim display-sub">{item.claim}</h3>
                <p className="approach-instance prose-col">{item.instance}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="stack" label="Stack">
        <h2 className="display-section">What I reach for</h2>
        <dl className="stack-grid">
          {stack.map((group) => (
            <div key={group.group} className="stack-group">
              <dt className="mono-meta stack-group-name">{group.group}</dt>
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

      <Section id="contact" label="Contact">
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
