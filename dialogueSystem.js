export class DialogueSystem {
  constructor({textEl,speakerEl,portraitEl,nextButton,onDone}){
    this.textEl=textEl;this.speakerEl=speakerEl;this.portraitEl=portraitEl;this.nextButton=nextButton;this.onDone=onDone;this.queue=[];this.index=0;this.timer=null;this.typing=false;this.current="";
    nextButton.addEventListener("click",()=>this.advance());
    document.addEventListener("keydown",e=>{if(["Enter"," ","e","E"].includes(e.key)&&!document.getElementById("explore-controls").classList.contains("hidden")===false)return;if((e.key==="Enter"||e.key===" ")&&this.queue.length){e.preventDefault();this.advance()}});
  }
  start(lines,onDone){clearInterval(this.timer);this.queue=lines;this.index=0;this.localDone=onDone;this.render();}
  render(){
    if(this.index>=this.queue.length){this.queue=[];this.nextButton.disabled=true;this.nextButton.textContent="✓";const cb=this.localDone||this.onDone;this.localDone=null;cb?.();return}
    const line=this.queue[this.index];this.speakerEl.textContent=line.speaker||"SISTEMA";this.portraitEl.textContent=line.icon||"✦";this.current=line.text;this.textEl.textContent="";this.typing=true;this.nextButton.disabled=false;this.nextButton.textContent="Mostrar ▸";
    let i=0;clearInterval(this.timer);this.timer=setInterval(()=>{this.textEl.textContent+=this.current[i++]||"";if(i>=this.current.length){clearInterval(this.timer);this.typing=false;this.nextButton.textContent="Continuar ▸"}},line.speed||22);
  }
  advance(){if(!this.queue.length)return;if(this.typing){clearInterval(this.timer);this.textEl.textContent=this.current;this.typing=false;this.nextButton.textContent="Continuar ▸";return}this.index++;this.render()}
  busy(){return this.queue.length>0}
}
