export class OrbitCamera{
  constructor(){ this.target=new Float32Array([0,0,0]); this.distance=5; this.minDistance=0.25; this.maxDistance=200; this.az=0.8; this.el=0.35; this._down=false; this._btn=0; this._px=0; this._py=0; }
  attach(canvas){
    canvas.addEventListener('mousedown',e=>{ this._down=true; this._btn=e.button; this._px=e.clientX; this._py=e.clientY; });
    addEventListener('mouseup',()=>this._down=false);
    addEventListener('mousemove',e=>{ if(!this._down) return; const dx=e.clientX-this._px, dy=e.clientY-this._py; this._px=e.clientX; this._py=e.clientY;
      if(this._btn===0){ this.az += dx*0.005; this.el = Math.max(-1.3, Math.min(1.3, this.el + dy*0.005)); }
      else{ const k=this.distance*0.0015; this.target[0] -= dx*k; this.target[1] += dy*k; }
    });
    canvas.addEventListener('wheel',e=>{ e.preventDefault(); const f=Math.exp(-e.deltaY*0.0012); this.distance=Math.max(this.minDistance,Math.min(this.maxDistance,this.distance*f)); }, {passive:false});
    addEventListener('contextmenu',e=>{ if(e.target===canvas) e.preventDefault(); });
  }
  reset(){ this.target=new Float32Array([0,0,0]); this.distance=5; this.az=0.8; this.el=0.35; }
}
