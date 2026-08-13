type Props = { eyebrow?: string; title: string; description?: string };

export default function SectionTitle({ eyebrow, title, description }: Props) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-400">{eyebrow}</p>}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>}
    </div>
  );
}
