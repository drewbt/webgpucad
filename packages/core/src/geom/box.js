export function makeBoxWire(l=2,w=1,h=0.75){
  const hx=l/2, hy=h/2, hz=w/2;
  const v=[
    -hx,-hy,-hz,  hx,-hy,-hz,  hx,-hy,-hz,  hx, hy,-hz,
     hx, hy,-hz, -hx, hy,-hz, -hx, hy,-hz, -hx,-hy,-hz,
    -hx,-hy, hz,  hx,-hy, hz,  hx,-hy, hz,  hx, hy, hz,
     hx, hy, hz, -hx, hy, hz, -hx, hy, hz, -hx,-hy, hz,
    -hx,-hy,-hz, -hx,-hy, hz,  hx,-hy,-hz,  hx,-hy, hz,
    -hx, hy,-hz, -hx, hy, hz,  hx, hy,-hz,  hx, hy, hz
  ];
  return new Float32Array(v);
}
