/**
 * A school's primary colour, made safe to use.
 *
 * The app paints with `hsl(var(--primary))`, so the stored value must be three
 * numbers ("142 71% 35%"). A colour written any other way ("green", "#1d6b3a")
 * would make every button and link lose its colour. So a hex code is converted
 * here, anything else is refused with a sentence the person can act on, and the
 * text colour that sits on it (white or near-black) is chosen from how light the
 * colour is, so a yellow school does not get white text on yellow.
 */

export type Colour =
  | { ok: true; primary: string; primaryForeground: string; note?: string }
  | { ok: false; message: string };

const WHITE = "0 0% 100%";
const INK = "222 47% 11%";

function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHsl([r, g, b]: [number, number, number]): [
  number,
  number,
  number,
] {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === rn) h = ((gn - bn) / d) % 6;
    else if (max === gn) h = (bn - rn) / d + 2;
    else h = (rn - gn) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  const [r, g, b] =
    h < 60
      ? [c, x, 0]
      : h < 120
        ? [x, c, 0]
        : h < 180
          ? [0, c, x]
          : h < 240
            ? [0, x, c]
            : h < 300
              ? [x, 0, c]
              : [c, 0, x];
  return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
function luminance([r, g, b]: [number, number, number]): number {
  const f = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

/** A hex code or an "H S% L%" triple, as the stored value and its text colour. */
export function parsePrimary(input: string): Colour {
  const text = input.trim();
  let h: number;
  let s: number;
  let l: number;
  const rgbFromHex = hexToRgb(text);
  if (rgbFromHex) {
    [h, s, l] = rgbToHsl(rgbFromHex);
  } else {
    const m =
      /^(\d{1,3}(?:\.\d+)?)[ ,]+(\d{1,3}(?:\.\d+)?)%[ ,]+(\d{1,3}(?:\.\d+)?)%$/.exec(
        text,
      );
    if (!m) {
      return {
        ok: false,
        message: `"${input}" is not a colour the app can use. Give a hex code such as #1d6b3a, or three numbers such as 142 71% 35%.`,
      };
    }
    h = Number(m[1]);
    s = Number(m[2]);
    l = Number(m[3]);
    if (h > 360 || s > 100 || l > 100) {
      return {
        ok: false,
        message: `"${input}" is out of range: hue is 0 to 360, saturation and lightness 0% to 100%.`,
      };
    }
  }
  const lum = luminance(hslToRgb(h, s, l));
  // White text is what people expect on a coloured button, so keep it unless
  // it would be hard to read (a contrast below 3.5 to 1, as on yellow), and
  // only then use near-black.
  const contrastWhite = 1.05 / (lum + 0.05);
  const primaryForeground = contrastWhite >= 3.5 ? WHITE : INK;
  const note =
    l < 20 || l > 88
      ? "That colour is very " +
        (l < 20 ? "dark" : "light") +
        ", so some outlines and links may be hard to see, especially in dark mode."
      : undefined;
  return {
    ok: true,
    primary: `${h} ${s}% ${l}%`,
    primaryForeground,
    ...(note ? { note } : {}),
  };
}
