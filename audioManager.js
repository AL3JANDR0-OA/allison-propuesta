let enabled = false, ctx = null;
function audioContext(){ if(!ctx){const C=window.AudioContext||window.webkitAudioContext;if(C)ctx=new C()} return ctx; }
export function setSound(value){enabled=value;if(enabled){const c=audioContext();if(c?.state==="suspended")c.resume()}return enabled}
export function isSoundEnabled(){return enabled}
export function beep(freq=660,duration=.08,type="sine"){
  if(!enabled)return;const c=audioContext();if(!c)return;
  const o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.035,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+duration);
}
export function playJingle(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,.18,"triangle"),i*130))}
