const KEY = "allison-exe-save-v1";
const fresh = () => ({scene:"intro", flowers:[], items:[], miniGame:false, gallery:false, sound:false});
export const loadSave = () => {
  try { return {...fresh(), ...(JSON.parse(localStorage.getItem(KEY)) || {})}; }
  catch { return fresh(); }
};
export const save = state => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
export const resetSave = () => { try { localStorage.removeItem(KEY); } catch {} return fresh(); };
export const hasProgress = state => state.scene !== "intro" || state.flowers.length > 0 || state.items.length > 0 || state.miniGame;
