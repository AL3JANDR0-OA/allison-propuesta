import {loadSave,save,hasProgress} from "./saveSystem.js";
import {SceneManager} from "./sceneManager.js";
const state=loadSave();
const manager=new SceneManager(state);
const continueButton=document.getElementById("continue-button");
if(hasProgress(state)){continueButton.classList.remove("hidden");document.getElementById("start-button").textContent="▶ Nueva aventura"}
const stars=document.getElementById("stars"),petals=document.getElementById("petals");
for(let i=0;i<28;i++){const p=document.createElement("span");p.className="petal";p.textContent=i%3===0?"✿":"·";p.style.left=Math.random()*100+"%";p.style.animationDuration=(9+Math.random()*12)+"s";p.style.animationDelay=(-Math.random()*15)+"s";p.style.fontSize=(8+Math.random()*14)+"px";petals.append(p)}
document.getElementById("start-button").addEventListener("click",()=>{if(hasProgress(state)&&!confirm("¿Empezar una aventura nueva? El progreso anterior se conservará hasta confirmar reinicio.")){return}manager.begin(false)});
