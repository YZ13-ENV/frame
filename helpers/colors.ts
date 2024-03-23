import { DynamicColorVariables } from "@/types/dynamic-color";
import { CSSProperties } from "react";
import { dynamicColor } from "./dynamic-color";

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

export const getDynamicColors = (
  hex: string,
  { lightness }: { lightness: number }
) => {
  const isLightColor = lightness >= 0.5;
  const foreground = dynamicColor(lightness).getForegroundColor(hex);
  const background = dynamicColor(lightness).getBackgroundColor(hex);
  const primaryForeground =
    dynamicColor(lightness).getPrimaryColorForeground(hex);
  const card = dynamicColor(lightness).getCardColor(hex);
  const secondary = dynamicColor(lightness).getSecondaryColor(hex);
  const ring = dynamicColor(lightness).getRingColor(hex);
  // primary = secondary-foreground
  // card = popover
  // secondary = muted = accent = border = input
  // ring
  // muted-foreground
  return {
    original: hex,
    isLightColor: isLightColor,
    ui: {
      "dynamic-background": background,
      "dynamic-foreground": foreground,
      "dynamic-card": card,
      "dynamic-card-foreground": foreground,
      "dynamic-popover": card,
      "dynamic-popover-foreground": foreground,
      "dynamic-primary": foreground,
      "dynamic-primary-foreground": primaryForeground,
      "dynamic-secondary": secondary,
      "dynamic-secondary-foreground": foreground,
      "dynamic-muted": secondary,
      "dynamic-muted-foreground": foreground,
      "dynamic-accent": secondary,
      "dynamic-accent-foreground": foreground,
      "dynamic-border": secondary,
      "dynamic-input": secondary,
      "dynamic-ring": ring,
    },
  };
};

export const initVariables = (variables: DynamicColorVariables) => {
  const properties: CSSProperties = {
    // @ts-ignore
    "--dynamic-background": hexToHSL(variables["dynamic-background"]),
    "--dynamic-foreground": hexToHSL(variables["dynamic-foreground"]),
    "--dynamic-card": hexToHSL(variables["dynamic-card"]),
    "--dynamic-card-foreground": hexToHSL(variables["dynamic-card-foreground"]),
    "--dynamic-popover": hexToHSL(variables["dynamic-popover"]),
    "--dynamic-popover-foreground": hexToHSL(
      variables["dynamic-popover-foreground"]
    ),
    "--dynamic-primary": hexToHSL(variables["dynamic-primary"]),
    "--dynamic-primary-foreground": hexToHSL(
      variables["dynamic-primary-foreground"]
    ),
    "--dynamic-secondary": hexToHSL(variables["dynamic-secondary"]),
    "--dynamic-secondary-foreground": hexToHSL(
      variables["dynamic-secondary-foreground"]
    ),
    "--dynamic-muted": hexToHSL(variables["dynamic-muted"]),
    "--dynamic-muted-foreground": hexToHSL(
      variables["dynamic-muted-foreground"]
    ),
    "--dynamic-accent": hexToHSL(variables["dynamic-accent"]),
    "--dynamic-accent-foreground": hexToHSL(
      variables["dynamic-accent-foreground"]
    ),
    "--dynamic-border": hexToHSL(variables["dynamic-border"]),
    "--dynamic-input": hexToHSL(variables["dynamic-input"]),
    "--dynamic-ring": hexToHSL(variables["dynamic-ring"]),
  };
  return properties;
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
