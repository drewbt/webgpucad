function identity(){ return [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; }
export class WebGL2Lines {
  static create(canvas){
    const gl = canvas.getContext('webgl2', {antialias:true, depth:true, alpha:false});
    if (!gl) throw new Error('WebGL2 not available');
    const vsrc = `#version 300 es
      precision highp float;
      layout(location=0) in vec3 aPos; layout(location=1) in vec3 aCol;
      uniform mat4 uProj,uView,uModel; out vec3 vCol;
      void main(){ vCol=aCol; gl_Position = uProj*uView*uModel*vec4(aPos,1.0); }`;
    const fsrc = `#version 300 es
      precision highp float; in vec3 vCol; out vec4 o;
      void main(){ o = vec4(vCol,1.0); }`;
    function sh(type,src){ const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s);
      if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)||'shader'); return s; }
    const vs=sh(gl.VERTEX_SHADER,vsrc), fs=sh(gl.FRAGMENT_SHADER,fsrc);
    const p=gl.createProgram(); gl.attachShader(p,vs); gl.attachShader(p,fs); gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p)||'link');
    const uProj=gl.getUniformLocation(p,'uProj'), uView=gl.getUniformLocation(p,'uView'), uModel=gl.getUniformLocation(p,'uModel');
    const vao=gl.createVertexArray(), vbo=gl.createBuffer(), cbo=gl.createBuffer();
    gl.enable(gl.DEPTH_TEST);
    const R=new WebGL2Lines(gl,p,uProj,uView,uModel,vao,vbo,cbo); return R;
  }
  constructor(gl,p,uProj,uView,uModel,vao,vbo,cbo){
    this.gl=gl; this.p=p; this.uProj=uProj; this.uView=uView; this.uModel=uModel; this.vao=vao; this.vbo=vbo; this.cbo=cbo;
    this.draws=[]; this.proj=identity(); this.view=identity(); this.model=identity();
  }
  resize(w,h,dpr){ const c=this.gl.canvas; c.width=(w*dpr)|0; c.height=(h*dpr)|0; this.gl.viewport(0,0,c.width,c.height); }
  setProjView(p,v){ this.proj=p; this.view=v; }
  setSceneData({grid,axes,box}){
    this.draws.length=0;
    const flat=(n,[r,g,b])=>{ const c=new Float32Array(n*3); for(let i=0;i<n;i++){ c[i*3]=r;c[i*3+1]=g;c[i*3+2]=b; } return c; };
    if (grid) this.draws.push({ verts:grid, cols:flat(grid.length/3,[0.35,0.46,0.58]) });
    if (axes){
      const ac=new Float32Array((axes.length/3)*3);
      for(let i=0;i<2;i++){ ac[i*3]=1; ac[i*3+1]=0; ac[i*3+2]=0; }
      for(let i=2;i<4;i++){ ac[i*3]=0; ac[i*3+1]=1; ac[i*3+2]=0; }
      for(let i=4;i<6;i++){ ac[i*3]=0; ac[i*3+1]=0; ac[i*3+2]=1; }
      this.draws.push({ verts:axes, cols:ac });
    }
    if (box) this.draws.push({ verts:box, cols:flat(box.length/3,[0.95,0.79,0.34]) });
  }
  draw(){
    const gl=this.gl; gl.clearColor(0.05,0.07,0.10,1); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.useProgram(this.p);
    gl.uniformMatrix4fv(this.uProj,false,new Float32Array(this.proj));
    gl.uniformMatrix4fv(this.uView,false,new Float32Array(this.view));
    gl.uniformMatrix4fv(this.uModel,false,new Float32Array(this.model));
    gl.bindVertexArray(this.vao);
    gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo); gl.enableVertexAttribArray(0); gl.vertexAttribPointer(0,3,gl.FLOAT,false,0,0);
    gl.bindBuffer(gl.ARRAY_BUFFER,this.cbo); gl.enableVertexAttribArray(1); gl.vertexAttribPointer(1,3,gl.FLOAT,false,0,0);
    for(const d of this.draws){
      gl.bindBuffer(gl.ARRAY_BUFFER,this.vbo); gl.bufferData(gl.ARRAY_BUFFER,d.verts,gl.DYNAMIC_DRAW);
      gl.bindBuffer(gl.ARRAY_BUFFER,this.cbo); gl.bufferData(gl.ARRAY_BUFFER,d.cols,gl.DYNAMIC_DRAW);
      gl.drawArrays(gl.LINES,0,d.verts.length/3);
    }
    gl.bindVertexArray(null);
  }
}
