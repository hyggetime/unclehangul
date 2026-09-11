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
