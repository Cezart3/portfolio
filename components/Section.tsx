export function Section({
  id,
  label,
  tone,
  children,
}: {
  id?: string;
  label: string;
  /** "deep" sets the section on a denser field, so the scroll has a pulse. */
  tone?: "deep";
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={tone === "deep" ? "section-band section-deep" : "section-band"}>
      <div className="shell rail">
        <p className="rail-label">{label}</p>
        <div className="rail-content">{children}</div>
      </div>
    </section>
  );
}
