export const __version = "0.1.0";
export function identity(){ return [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]; }
export function mul(a,b){ const r=new Array(16); for(let i=0;i<4;i++)for(let j=0;j<4;j++){ r[i*4+j]=0; for(let k=0;k<4;k++) r[i*4+j]+=a[i*4+k]*b[k*4+j]; } return r; }
export function perspective(fovy,aspect,near,far){ const f=1/Math.tan(fovy/2), nf=1/(near-far); return [f/aspect,0,0,0, 0,f,0,0, 0,0,(far+near)*nf,-1, 0,0,(2*far*near)*nf,0]; }
export function lookAt(eye, center, up){ const [ex,ey,ez]=eye,[cx,cy,cz]=center; let zx=ex-cx,zy=ey-cy,zz=ez-cz; let len=Math.hypot(zx,zy,zz)||1; zx/=len; zy/=len; zz/=len; let xx=up[1]*zz-up[2]*zy, xy=up[2]*zx-up[0]*zz, xz=up[0]*zy-up[1]*zx; len=Math.hypot(xx,xy,xz)||1; xx/=len; xy/=len; xz/=len; let yx=zy*xz-zz*xy, yy=zz*xx-zx*xz, yz=zx*xy-zy*xx; return [xx,yx,zx,0, xy,yy,zy,0, xz,yz,zz,0, -(xx*ex+xy*ey+xz*ez), -(yx*ex+yy*ey+yz*ez), -(zx*ex+zy*ey+zz*ez),1]; }
