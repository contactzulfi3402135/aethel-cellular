interface Props {
  overline: string;
  title: string;
  blurb?: string;
}

export default function SectionHeader({ overline, title, blurb }: Props) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald2">{overline}</p>
      <h2 className="mt-4 font-serif text-4xl leading-tight text-pine lg:text-[44px] lg:leading-[1.1]">{title}</h2>
      {blurb && <p className="mt-5 text-[15px] leading-relaxed text-slate2">{blurb}</p>}
    </div>
  );
}
