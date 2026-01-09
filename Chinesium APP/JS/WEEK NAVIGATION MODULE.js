/* ============================
   7. WEEK NAVIGATION MODULE
   --------------------------------
   Opis:
   - Obsługuje przyciski poprzedni/następny tydzień
   - Aktualizuje Chinesium_State.currentWeek i zapisuje progres
   - Wywołuje Chinesium_LoadWeek()
   Zależności:
   - Chinesium_State
   - Chinesium_SaveProgress
   - Chinesium_LoadWeek
============================ */
import { Chinesium_State, Chinesium_SaveProgress } from './state.js';
import { Chinesium_LoadWeek } from './weekFetch.js';

document.getElementById("Chinesium_PrevWeek").onclick = () => {
  if (Chinesium_State.currentWeek > 1) {
    Chinesium_State.currentWeek--;
    Chinesium_SaveProgress();
    Chinesium_LoadWeek();
  }
};

document.getElementById("Chinesium_NextWeek").onclick = () => {
  if (Chinesium_State.currentWeek < 53) {
    Chinesium_State.currentWeek++;
    Chinesium_SaveProgress();
    Chinesium_LoadWeek();
  }
};
