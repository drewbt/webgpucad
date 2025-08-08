const KEY="wgc:prefs:v1";
export function savePrefs(p){ localStorage.setItem(KEY, JSON.stringify(p)); }
export function loadPrefs(){ try{ return JSON.parse(localStorage.getItem(KEY)||"{}"); }catch{ return {}; } }
 
