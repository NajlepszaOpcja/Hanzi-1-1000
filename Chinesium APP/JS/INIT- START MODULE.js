/* ============================
   10. INIT / START MODULE
   --------------------------------
   Opis:
   - Inicjalizuje aplikację przy starcie
   - Ładuje zapisany progres, ustawia aktualny tydzień
   - Wywołuje ładowanie render i słów dla bieżącego tygodnia
   Zależności:
   - Chinesium_LoadProgress
   - Chinesium_GetCurrentWeekNumber
   - Chinesium_LoadRender
   - Chinesium_LoadWeek
   - Chinesium_State
============================ */
import { Chinesium_LoadProgress, Chinesium_State } from './state.js';
import { Chinesium_GetCurrentWeekNumber } from './weekCalc.js';
import { Chinesium_LoadRender } from './renderLoader.js';
import { Chinesium_LoadWeek } from './weekFetch.js';

Chinesium_LoadProgress();
Chinesium_State.currentWeek = Chinesium_GetCurrentWeekNumber();

Chinesium_LoadRender()   // DIFF
  .then(() => Chinesium_LoadWeek());
