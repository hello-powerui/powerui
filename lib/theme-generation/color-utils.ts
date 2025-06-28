// Color conversion utilities for perceptually uniform color generation

/**
 * Convert hex color to RGB values (0-255)
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Invalid hex color');
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  };
}

/**
 * Convert RGB values (0-255) to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert linear RGB to sRGB
 */
function linearToSrgb(linear: number): number {
  if (linear <= 0.0031308) {
    return linear * 12.92;
  }
  return 1.055 * Math.pow(linear, 1 / 2.4) - 0.055;
}

/**
 * Convert sRGB to linear RGB
 */
function srgbToLinear(srgb: number): number {
  if (srgb <= 0.04045) {
    return srgb / 12.92;
  }
  return Math.pow((srgb + 0.055) / 1.055, 2.4);
}

/**
 * Convert RGB to OKLab color space
 * OKLab provides perceptually uniform lightness
 */
export function rgbToOklab(r: number, g: number, b: number): { l: number; a: number; b: number } {
  // Normalize to 0-1
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  // Convert to linear RGB
  const rLin = srgbToLinear(rNorm);
  const gLin = srgbToLinear(gNorm);
  const bLin = srgbToLinear(bNorm);

  // Convert to OKLab
  const l = 0.4122214708 * rLin + 0.5363325363 * gLin + 0.0514459929 * bLin;
  const m = 0.2119034982 * rLin + 0.6806995451 * gLin + 0.1073969566 * bLin;
  const s = 0.0883024619 * rLin + 0.2817188376 * gLin + 0.6299787005 * bLin;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return {
    l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
    a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
    b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
  };
}

/**
 * Convert OKLab to RGB color space
 */
export function oklabToRgb(l: number, a: number, b: number): { r: number; g: number; b: number } {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b;

  const l_cubed = l_ * l_ * l_;
  const m_cubed = m_ * m_ * m_;
  const s_cubed = s_ * s_ * s_;

  const rLin = 4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed;
  const gLin = -1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed;
  const bLin = -0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.7076147010 * s_cubed;

  // Convert to sRGB
  const rSrgb = linearToSrgb(rLin);
  const gSrgb = linearToSrgb(gLin);
  const bSrgb = linearToSrgb(bLin);

  // Convert to 0-255 range
  return {
    r: Math.round(Math.max(0, Math.min(255, rSrgb * 255))),
    g: Math.round(Math.max(0, Math.min(255, gSrgb * 255))),
    b: Math.round(Math.max(0, Math.min(255, bSrgb * 255)))
  };
}

/**
 * Convert OKLab to OKLCH (cylindrical representation)
 */
export function oklabToOklch(l: number, a: number, b: number): { l: number; c: number; h: number } {
  const c = Math.sqrt(a * a + b * b);
  let h = Math.atan2(b, a) * 180 / Math.PI;
  
  // Normalize hue to 0-360
  if (h < 0) h += 360;
  
  return { l, c, h };
}

/**
 * Convert OKLCH to OKLab
 */
export function oklchToOklab(l: number, c: number, h: number): { l: number; a: number; b: number } {
  const hRad = h * Math.PI / 180;
  return {
    l,
    a: c * Math.cos(hRad),
    b: c * Math.sin(hRad)
  };
}

/**
 * Convert hex to OKLCH
 */
export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const rgb = hexToRgb(hex);
  const oklab = rgbToOklab(rgb.r, rgb.g, rgb.b);
  return oklabToOklch(oklab.l, oklab.a, oklab.b);
}

/**
 * Convert OKLCH to hex
 */
export function oklchToHex(l: number, c: number, h: number): string {
  const oklab = oklchToOklab(l, c, h);
  const rgb = oklabToRgb(oklab.l, oklab.a, oklab.b);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Cubic bezier function for smooth interpolation
 */
export function cubicBezier(t: number, p1: number, p2: number): number {
  const p0 = 0;
  const p3 = 1;
  
  const oneMinusT = 1 - t;
  const oneMinusTSquared = oneMinusT * oneMinusT;
  const oneMinusTCubed = oneMinusTSquared * oneMinusT;
  const tSquared = t * t;
  const tCubed = tSquared * t;
  
  return oneMinusTCubed * p0 + 
         3 * oneMinusTSquared * t * p1 + 
         3 * oneMinusT * tSquared * p2 + 
         tCubed * p3;
}