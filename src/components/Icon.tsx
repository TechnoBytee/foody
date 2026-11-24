import { phosphorIcons } from "@/data/phosphor-icons";

// Phosphor Icons duotone, renk #7b6f6f (phosphoricons.com?weight=duotone&color=7b6f6f).
// SVG yolları Phosphor core raw dosyalarından alınır; çalışma zamanında ağ isteği yok.
export default function Icon({
  name,
  size = 18,
  filled = false,
  className = "",
  color = "var(--icon-color)",
}: {
  name: string;
  size?: number;
  filled?: boolean;
  className?: string;
  color?: string;
}) {
  const source = phosphorIcons[name] ?? phosphorIcons.x;
  const inner = filled ? source.replace(/opacity="0\.2"/g, 'opacity="1"') : source;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 256 256"
      width={size}
      height={size}
      className={`inline-block shrink-0 align-middle ${className}`}
      style={{ color }}
      dangerouslySetInnerHTML={{ __html: `<g fill="currentColor">${inner}</g>` }}
    />
  );
}
