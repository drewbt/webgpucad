export function snapAxis(val, step=0.010){ const k = Math.round(val/step)*step; return Number(k.toFixed(3)); }
