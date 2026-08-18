import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="shell">
        <p className="hero-eyebrow mono-meta">404</p>
        <h1 className="display-hero">Nothing at this address</h1>
        <p className="hero-thesis">
          The page you asked for does not exist, which is at least honest about
          it.
        </p>
        <p className="hero-links mono-meta">
          <Link className="link-underline" href="/">
            Back to the index
          </Link>
        </p>
      </div>
    </section>
  );
}
