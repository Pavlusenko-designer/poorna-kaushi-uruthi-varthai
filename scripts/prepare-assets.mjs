import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

await mkdir("public/fonts", { recursive: true });
await mkdir("public/images", { recursive: true });
for (const [source, name] of [
  ["Kaushi-c.png", "kaushi"],
  ["Poorna-c.png", "poorna"],
]) {
  await sharp(source)
    .resize(860)
    .webp({ quality: 86, alphaQuality: 90 })
    .toFile(`public/images/${name}.webp`);
}
for (const [family, name] of [
  ["Cormorant+Garamond:wght@300;400;500;600", "cormorant-garamond"],
  ["Karla:wght@400;500;600", "karla"],
]) {
  const response = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
      },
    },
  );
  if (!response.ok) throw new Error(`Font request failed: ${response.status}`);
  const css = await response.text();
  const latin = css.split("/* latin */").at(-1);
  const fontUrl = latin.match(/url\(([^)]+)\)/)?.[1];
  if (!fontUrl) throw new Error(`Font URL not found for ${name}`);
  const font = await fetch(fontUrl);
  if (!font.ok) throw new Error(`Font download failed: ${font.status}`);
  await writeFile(
    `public/fonts/${name}.woff2`,
    Buffer.from(await font.arrayBuffer()),
  );
  const license = await fetch(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${name.replaceAll("-", "")}/OFL.txt`,
  );
  if (!license.ok)
    throw new Error(`Font license download failed: ${license.status}`);
  await writeFile(`public/fonts/${name}-OFL.txt`, await license.text());
}

// A real image card for previews when the invitation is shared in messengers.
const background = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#fbf8ef"/><rect x="20" y="20" width="1160" height="590" rx="2" fill="none" stroke="#cbb57b"/><rect x="28" y="28" width="1144" height="574" fill="none" stroke="#e1d5b4"/><ellipse cx="900" cy="330" rx="240" ry="250" fill="#f1ead5"/><g font-family="Georgia,serif" fill="#536548"><text x="80" y="145" font-size="23" fill="#a28447">You’re invited to our</text><text x="75" y="225" font-size="72">Uruthi Varthai</text><text x="80" y="315" font-size="51">Poorna &amp; Kaushi</text><path d="M82 355H560" stroke="#d6c18c"/><text x="80" y="415" font-size="34">20 November 2026</text><text x="80" y="463" font-size="27">Friday · 7–9 AM IST</text><text x="80" y="532" font-size="23" fill="#7e826b">Annapurna Arunya Hall, Coimbatore</text></g></svg>`,
);
const left = await sharp("public/images/poorna.webp")
  .resize({ height: 430 })
  .png()
  .toBuffer();
const right = await sharp("public/images/kaushi.webp")
  .resize({ height: 480 })
  .png()
  .toBuffer();
await sharp(background)
  .composite([
    { input: left, left: 636, top: 156 },
    { input: right, left: 839, top: 106 },
  ])
  .png()
  .toFile("public/images/invitation-social.png");
console.log("Portraits, local fonts, and social preview ready.");
