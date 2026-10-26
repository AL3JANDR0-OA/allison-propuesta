import {beep} from "./audioManager.js";
import {addItem,objectCatalog,showInventory} from "./inventory.js";
export class Exploration {
  constructor({state,onUpdate,onComplete,toast,openModal}){this.state=state;this.onUpdate=onUpdate;this.onComplete=onComplete;this.toast=toast;this.openModal=openModal;this.x=50;this.y=75;this.active=false;this.zone="garden";this.objects=[];this.keyHandler=e=>this.key(e);document.addEventListener("keydown",this.keyHandler)}
  start(zone="garden"){this.zone=zone;this.active=true;document.getElementById("explore-world").classList.remove("hidden");document.getElementById("explore-controls").classList.remove("hidden");document.getElementById("dialogue-box").classList.add("hidden");document.getElementById("choice-panel").classList.add("hidden");this.build();this.drawPlayer();this.onUpdate?.()}
  stop(){this.active=false;document.getElementById("explore-world").classList.add("hidden");document.getElementById("explore-controls").classList.add("hidden");document.getElementById("dialogue-box").classList.remove("hidden")}
  build(){const world=document.getElementById("explore-world");world.innerHTML="";this.objects=[];let defs=this.zone==="garden"?[
    ["admiration","🌸",18,30,"Admiración","Una de las cosas que más admiro de ti es esa manera de seguir adelante con tus sueños."],
    ["tenderness","🌷",38,55,"Ternura","Me gusta que detrás de tu valentía exista también esa parte sensible y bonita que te hace ser tú."],
    ["dreams","✿",65,35,"Sueños","Quiero verte conseguir esas cosas que tanto deseas y celebrar contigo cada pequeño logro."],
    ["future","💮",82,64,"Futuro","No sé qué nos espera más adelante, pero me hace ilusión descubrirlo contigo."]
  ]:this.zone==="room"?[
    ["computer","▣",28,38,"Archivo encontrado","Advertencia: el archivo contiene una cantidad absurda de Allison. Contiene memes, ternura y una cantidad sospechosa de ganas de verte feliz."],
    ["console","🎮",70,50,"Sistema de videojuegos","Logro desbloqueado: encontrar a alguien con quien hasta perder una partida puede ser divertido."],
    ["plush","🧸",48,25,"Objeto adorable","No voy a admitir que esto es adorable. El sistema se reserva el derecho de mentir."]
  ]:[
    ["star","✦",50,28,"Mirador del futuro","No sé qué nos espera más adelante. Pero me hace ilusión imaginar todas esas posibilidades contigo."]
  ];
    for(const [id,icon,x,y,title,text] of defs){const el=document.createElement("button");el.className="world-item"+(this.state.flowers.includes(id)?" discovered":"");el.style.left=x+"%";el.style.top=y+"%";el.textContent=icon;el.setAttribute("aria-label",title);el.title=title;world.append(el);const obj={id,el,x,y,title,text,done:this.state.flowers.includes(id)};this.objects.push(obj);el.onclick=()=>this.interact(obj)}
    if(this.zone==="archive"){for(const [id,icon,x,y] of [["key","🗝️",22,68],["note","📜",72,30],["flower","🌹",82,75]]){const el=document.createElement("button");el.className="world-item";el.style.left=x+"%";el.style.top=y+"%";el.textContent=icon;el.setAttribute("aria-label",objectCatalog[id].name);world.append(el);this.objects.push({id,el,x,y,title:objectCatalog[id].name,text:objectCatalog[id].description,done:this.state.items.includes(id),item:true});if(this.state.items.includes(id))el.classList.add("discovered");el.onclick=()=>this.interact(this.objects[this.objects.length-1])}}
  }
  drawPlayer(){let p=document.getElementById("world-player");if(!p){p=document.createElement("div");p.id="world-player";p.className="world-player";document.getElementById("explore-world").append(p)}p.style.left=this.x+"%";p.style.top=this.y+"%"}
  key(e){if(!this.active)return;const key=e.key.toLowerCase();let moved=true;if(["arrowleft","a"].includes(key))this.x-=3;else if(["arrowright","d"].includes(key))this.x+=3;else if(["arrowup","w"].includes(key))this.y-=3;else if(["arrowdown","s"].includes(key))this.y+=3;else if(key==="e"){this.nearest();return}else moved=false;if(moved){e.preventDefault();this.x=Math.max(4,Math.min(96,this.x));this.y=Math.max(12,Math.min(90,this.y));this.drawPlayer()}}
  nearest(){const obj=this.objects.filter(o=>!o.done).sort((a,b)=>this.dist(a)-this.dist(b))[0];if(obj&&this.dist(obj)<20)this.interact(obj);else this.toast("Acércate un poco más a un objeto para interactuar.")}
  dist(o){return Math.hypot(this.x-o.x,this.y-o.y)}
  interact(o){if(!this.active)return;if(this.dist(o)>24&&o.id!=="computer"&&o.id!=="console"&&o.id!=="plush"&&o.id!=="key"&&o.id!=="note"&&o.id!=="flower"&&o.id!=="star"){this.toast("Acércate al objeto para descubrirlo.");return}if(o.done){this.toast("Ya descubriste este recuerdo.");return}o.done=true;o.el.classList.add("discovered");beep(740,.1);if(o.item){addItem(this.state,o.id);this.toast("Objeto añadido: "+objectCatalog[o.id].name);this.onUpdate?.();if(this.state.items.length===3){this.toast("¡Cofre desbloqueado! Has encontrado los tres objetos.");setTimeout(()=>this.openModal("ARCHIVO CONFIDENCIAL",`Entre tantas historias de supervivencia, monstruos y mundos al borde del desastre, hay algo que tengo bastante claro.\n\nNo necesito una aventura perfecta. Solo quiero que las personas que hacen especial mi vida puedan formar parte de ella. Y tú eres una de esas personas.`,()=>this.onComplete("archive")),500)}return}
    if(!this.state.flowers.includes(o.id))this.state.flowers.push(o.id);this.openModal(o.title,o.text,()=>{this.onUpdate?.();if(this.zone==="garden"&&this.objects.every(x=>x.done)){this.toast("Jardín completado. ¡Nueva zona desbloqueada!");this.onComplete("garden")}else if(this.zone==="room"&&this.objects.every(x=>x.done)){this.toast("¡Habitación explorada!");this.onComplete("room")}else if(o.id==="star")this.onComplete("lookout")});}
  update(){this.onUpdate?.()}
}
