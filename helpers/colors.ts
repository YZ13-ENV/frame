export const shadeColor = (color: string, percent: number) => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = (R * (100 + percent)) / 100;
  G = (G * (100 + percent)) / 100;
  B = (B * (100 + percent)) / 100;

  R = R < 255 ? parseInt(R.toFixed(0)) : 255;
  G = G < 255 ? parseInt(G.toFixed(0)) : 255;
  B = B < 255 ? parseInt(B.toFixed(0)) : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
};

const calculateColors = (hex: string) => {};
export const getDynamicColors = (
  hex: string,
  { intensity, lightness }: { lightness: number; intensity: number }
) => {
  const isLightColor = lightness >= 0.5;
  const percent = (lightness / 1) * 100;
  const second_percent = 100 - percent;
  const more_lighter_percent = second_percent * 2;
  const less_lighter_percent = second_percent;
  const more_darker_percent = -percent;
  const less_darker_percent = -percent / 2;
  const more_lighter = shadeColor(hex, more_lighter_percent);
  const less_lighter = shadeColor(hex, less_lighter_percent);
  const original = hex;
  const more_darker = shadeColor(hex, more_darker_percent);
  const less_darker = shadeColor(hex, less_darker_percent);
  const bg = shadeColor(hex, more_darker_percent - 10);
  return {
    original: original,
    isLightColor: isLightColor,
    ui: {
      background: bg,
      text: more_lighter,
    },
    extra: {
      more_lighter: more_lighter,
      less_lighter: less_lighter,
      more_darker: more_darker,
      less_darker: less_darker,
    },
  };
};

export function hexToHSL(H: string) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = parseInt("0x" + H[1] + H[1]);
    g = parseInt("0x" + H[2] + H[2]);
    b = parseInt("0x" + H[3] + H[3]);
  } else if (H.length == 7) {
    r = parseInt("0x" + H[1] + H[2]);
    g = parseInt("0x" + H[3] + H[4]);
    b = parseInt("0x" + H[5] + H[6]);
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "" + h.toFixed(0) + " " + s.toFixed(0) + "% " + l.toFixed(0) + "%";
}
