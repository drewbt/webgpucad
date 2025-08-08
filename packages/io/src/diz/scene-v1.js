export function saveScene({L,W,H,Gs,Gp}) {
  return JSON.stringify({ version:"1", unit:"m", box:{L,W,H}, grid:{size:Gs, step:Gp}, generator:"WebGPUCad", timestamp:new Date().toISOString() }, null, 2);
}
export function loadScene(json){
  const o = JSON.parse(json);
  if (o.unit !== "m") throw new Error("Only meters supported");
  return { L:o.box.L, W:o.box.W, H:o.box.H, Gs:o.grid.size, Gp:o.grid.step };
}
