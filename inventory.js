export const objectCatalog = {
  key:{name:"Llave antigua",icon:"🗝️",description:"Una llave pequeña, con marcas de estrellas."},
  note:{name:"Nota doblada",icon:"📜",description:"Alguien escribió algo que quería decir con calma."},
  flower:{name:"Flor rosa",icon:"🌸",description:"Una flor que sobrevivió a una habitación bastante sospechosa."}
};
export function addItem(state,id){if(!state.items.includes(id)){state.items.push(id);return true}return false}
export function showInventory(state){return state.items.map(id=>objectCatalog[id]).filter(Boolean)}
