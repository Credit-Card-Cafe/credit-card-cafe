import type {RGB, HEX, CreditCardType} from '$lib/types'

export function hexToRgb(hex:HEX):RGB{
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r,g,b];
}
  
export function rgbToHex(rgb: RGB):HEX {
  return `#${(1 << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]).toString(16).slice(1)}`
}
