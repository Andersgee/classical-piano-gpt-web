import sharp from "sharp";
import { optimize } from "svgo";
import fs from "node:fs/promises";

// script to generate all necessary metadata icons from favicon.svg
// pnpm tsx scripts/generate-icons.ts

const ORIGINAL_SVG_PATH = "favicon.svg";

const OPTIMIZED_SVG_PATH = "src/app/icon.svg";

export async function stat(path: string) {
  try {
    const r = await fs.lstat(path);
    return { exists: true, isDirectory: r.isDirectory(), isFile: r.isFile() };
  } catch {
    return { exists: false, isDirectory: false, isFile: false };
  }
}

export async function readText(path: string) {
  return await fs.readFile(path, { encoding: "utf8" });
}

export async function writeText(path: string, data: string) {
  return await fs.writeFile(path, data);
}

type RegularIcon = {
  type: "normal";
  size: number;
  path: string;
};
type MaskableIcon = {
  type: "maskable" | "og";
  size: number;
  path: string;
  paddingFraction: number;
  paddingBackground: string;
};
type Icon = RegularIcon | MaskableIcon;

const PNG_ICONS: Icon[] = [
  {
    type: "normal",
    size: 192,
    path: "public/icons/icon-192.png",
  },
  {
    type: "normal",
    size: 512,
    path: "public/icons/icon-512.png",
  },
  {
    type: "maskable",
    size: 512,
    path: "public/icons/icon-512-maskable.png",
    paddingBackground: "#FFFFFF",
    paddingFraction: 0.1,
  },
  {
    type: "maskable",
    size: 180,
    path: "src/app/apple-icon.png",
    paddingBackground: "#FFFFFF",
    paddingFraction: 0.1,
  },
  {
    type: "og",
    size: 1080, //height
    path: "src/app/opengraph-image.png",
    paddingBackground: "#FFFFFF",
    paddingFraction: 0.1,
  },
];

async function main() {
  const { isFile } = await stat(ORIGINAL_SVG_PATH);
  if (!isFile) {
    console.error(`file: "${ORIGINAL_SVG_PATH}" does not exist`);
    return;
  }

  for (const icon of PNG_ICONS) {
    await optimizeAndSavePng(ORIGINAL_SVG_PATH, icon);
    console.log(`saved: ${icon.path}`);
  }

  //also optimize the actual svg
  const svgString = await readText(ORIGINAL_SVG_PATH);
  const result = optimize(svgString, { multipass: true });
  await writeText(OPTIMIZED_SVG_PATH, result.data);
  console.log(`saved: ${OPTIMIZED_SVG_PATH}`);

  console.log(
    'Note: Use gimp for the "src/app/favicon.ico" file. Export 32x32 size using 32 bpp, 8-bit alpha, no palette settings.'
  );
}

async function optimizeAndSavePng(path: string, icon: Icon) {
  if (icon.type === "normal") {
    await sharp(path).resize(icon.size).png().toFile(icon.path);
  } else if (icon.type === "maskable") {
    const pad = Math.ceil(icon.size * icon.paddingFraction);
    await sharp(path)
      .resize(icon.size - pad * 2)
      .flatten({ background: icon.paddingBackground })
      .extend({
        background: icon.paddingBackground,
        top: pad,
        right: pad,
        bottom: pad,
        left: pad,
      })
      .png()
      .toFile(icon.path);
  } else if (icon.type === "og") {
    const h = icon.size;
    const w = (h * 16) / 9;
    const padX = (w - h) / 2;
    await sharp(path)
      .resize(1080)
      .flatten({ background: icon.paddingBackground })
      .extend({
        background: icon.paddingBackground,
        //top: pad,
        right: padX,
        //bottom: pad,
        left: padX,
      })
      .png()
      .toFile(icon.path);
  }
}

void main();
