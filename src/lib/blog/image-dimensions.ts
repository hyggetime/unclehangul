import fs from "node:fs";
import path from "node:path";

const FALLBACK = { width: 1200, height: 900 };

/** Read PNG/JPEG dimensions from `public/` for layout hints (build / SSR). */
export function getPublicImageDimensions(src: string): {
  width: number;
  height: number;
} {
  if (!src.startsWith("/")) return FALLBACK;

  const filePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));

  try {
    const buf = fs.readFileSync(filePath);

    if (buf[0] === 0x89 && buf[1] === 0x50) {
      return {
        width: buf.readUInt32BE(16),
        height: buf.readUInt32BE(20),
      };
    }

    if (buf[0] === 0xff && buf[1] === 0xd8) {
      const jpeg = readJpegDimensions(buf);
      if (jpeg) return jpeg;
    }

    const text = buf.toString("utf8", 0, Math.min(buf.length, 4096));
    const svg = readSvgDimensions(text);
    if (svg) return svg;
  } catch {
    /* missing file or unreadable — use fallback */
  }

  return FALLBACK;
}

function readJpegDimensions(buf: Buffer): { width: number; height: number } | null {
  let offset = 2;

  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return null;

    const marker = buf[offset + 1];
    if (marker === 0xc0 || marker === 0xc1 || marker === 0xc2) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }

    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }

  return null;
}

function readSvgDimensions(svg: string): { width: number; height: number } | null {
  const viewBox = svg.match(/viewBox=["']([\d.+\s-]+)["']/i);
  if (viewBox) {
    const parts = viewBox[1].trim().split(/\s+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { width: Math.round(parts[2]), height: Math.round(parts[3]) };
    }
  }
  const width = svg.match(/\bwidth=["']([\d.]+)/i);
  const height = svg.match(/\bheight=["']([\d.]+)/i);
  if (width && height) {
    return {
      width: Math.round(Number.parseFloat(width[1])),
      height: Math.round(Number.parseFloat(height[1])),
    };
  }
  return null;
}
