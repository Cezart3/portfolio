export function Section({
  id,
  label,
  children,
}: {
  id?: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="section-band">
      <div className="shell rail">
        <p className="rail-label">{label}</p>
        <div className="rail-content">{children}</div>
      </div>
    </section>
  );
}
