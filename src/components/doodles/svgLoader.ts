import { DOODLES, type DoodleName } from '@/lib/doodles';

export interface SvgPrimitive {
  tag: 'path' | 'circle' | 'ellipse' | 'line' | 'polyline' | 'polygon';
  attrs: Record<string, string>;
}

export interface ParsedDoodleSvg {
  viewBox: string;
  primitives: SvgPrimitive[];
}

const svgCache = new Map<string, Promise<ParsedDoodleSvg>>();

function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const regex = /([a-zA-Z0-9:-]+)="([^"]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(attrString)) !== null) {
    const [, key, value] = match;
    if (key === 'stroke' || key === 'fill' || key === 'stroke-width' || key === 'vector-effect') {
      continue;
    }
    attrs[key] = value;
  }
  return attrs;
}

export function parseSvgMarkup(markup: string, fallbackViewBox = '0 0 200 200'): ParsedDoodleSvg {
  const vbMatch = markup.match(/viewBox="([^"]+)"/i);
  const viewBox = vbMatch ? vbMatch[1] : fallbackViewBox;
  const primitives: SvgPrimitive[] = [];
  const primRegex = /<(path|circle|ellipse|line|polyline|polygon)\b([^>]*?)\s*\/?>/gi;
  let match: RegExpExecArray | null;
  while ((match = primRegex.exec(markup)) !== null) {
    const tag = match[1].toLowerCase() as SvgPrimitive['tag'];
    const attrs = parseAttributes(match[2]);
    primitives.push({ tag, attrs });
  }
  return { viewBox, primitives };
}

export function loadDoodleSvg(name: DoodleName): Promise<ParsedDoodleSvg> {
  const meta = DOODLES[name];
  const cached = svgCache.get(meta.path);
  if (cached) return cached;

  const promise = fetch(meta.path)
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch doodle: ${meta.path}`);
      return res.text();
    })
    .then((text) => parseSvgMarkup(text, meta.viewBox))
    .catch(() => ({ viewBox: meta.viewBox, primitives: [] }));

  svgCache.set(meta.path, promise);
  return promise;
}
