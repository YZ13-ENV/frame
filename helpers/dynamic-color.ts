/*
    --background: 0 0% 0%;
    --foreground: 0 0% 98%;

    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;

    --popover: 0 0% 3.9%;
    --popover-foreground: 0 0% 98%;

    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;

    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;

    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;

    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;

    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 0 0% 83.1%;
 */

import { shadeColor } from "./colors";

const calculatePercent = (target: number, current: number) => {
  return target > current ? target + current : target - current;
};

export const dynamicColor = (lightness: number) => {
  const percent = lightness * 100;
  // console.log(lightness, "->", percent);
  return {
    getBackgroundColor: (hex: string) => {
      const target = calculatePercent(1, percent);
      const background = shadeColor(hex, target);
      return background;
    },
    getForegroundColor: (hex: string) => {
      const target = calculatePercent(80, percent);
      const foreground = shadeColor(hex, target);
      return foreground;
    },
    getPrimaryColorForeground: (hex: string) => {
      const target = calculatePercent(9, percent);
      const primary = shadeColor(hex, target);
      return primary;
    },
    getSecondaryColor: (hex: string) => {
      const target = calculatePercent(15, percent);
      const secondary = shadeColor(hex, target);
      return secondary;
    },
    getCardColor: (hex: string) => {
      const target = calculatePercent(4, percent);
      const card = shadeColor(hex, target);
      return card;
    },
    getRingColor: (hex: string) => {
      const target = calculatePercent(83, percent);
      const ring = shadeColor(hex, target);
      return ring;
    },
  };
};
