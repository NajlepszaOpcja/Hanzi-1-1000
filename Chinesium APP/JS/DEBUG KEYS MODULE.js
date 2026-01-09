/* ============================
   6. DEBUG KEYS MODULE
   --------------------------------
   Opis:
   - Obsługuje skróty klawiaturowe do debugowania
   - \  -> losuje nowe słowa dla aktualnego tygodnia
   - /  -> usuwa słowa z aktualnego tygodnia
   Zależności:
   - Chinesium_State
   - Chinesium_LoadWeek()
   - Chinesium_SaveProgress()
   - Chinesium_Render()
============================ */
import { Chinesium_State, Chinesium_SaveProgress } from './state.js';
import { Chinesium_LoadWeek } from './weekFetch.js';

document.addEventListener("keydown", (e) => {
  const weekNum = Chinesium_State.currentWeek;

  if (e.key === "\\") {
    Chinesium_LoadWeek(weekNum, true);
    alert(`DEBUG: Wylosowano nowe słowa dla tygodnia ${weekNum}`);
  } else if (e.key === "/") {
    Chinesium_State.words[`week${weekNum}`] = [];
    Chinesium_SaveProgress();
    window.Chinesium_Render();
    alert(`DEBUG: Usunięto słowa z tygodnia ${weekNum}`);
  }
});
