export function makeGridLines(size=10, step=0.5){
  const lines=[];
  for(let i=-size;i<=size;i++){
    const x=i*step; lines.push(x,0,-size*step, x,0,size*step);
    const z=i*step; lines.push(-size*step,0,z, size*step,0,z);
  }
  return new Float32Array(lines);
}
export function makeAxes(){
  return new Float32Array([ 0,0,0, 1,0,0,  0,0,0, 0,1,0,  0,0,0, 0,0,1 ]);
}
