/* ============================
   5. FETCH & WEEK MODULE
   --------------------------------
   Opis:
   - Ładuje słowa dla danego tygodnia z JSON-a
   - Jeśli już są w stanie i nie wymuszone, używa istniejących
   - Losuje 5 słów z całego zestawu
   Zależności:
   - Chinesium_State (state.js)
   - Chinesium_SaveProgress (state.js)
   - Chinesium_JSON_URL (config.js)
   - Chinesium_Render() (po załadowaniu modułu render)
   Funkcje eksportowane:
   - Chinesium_LoadWeek(weekNum?:number, force?:boolean)
============================ */
import { Chinesium_State, Chinesium_SaveProgress } from './state.js';
import { Chinesium_JSON_URL } from './config.js';
import { Chinesium_LoadRender } from './renderLoader.js';

export async function Chinesium_LoadWeek(weekNum = null, force = false) {

  await Chinesium_LoadRender(); // DIFF: load render module if not loaded

  const res = await fetch(Chinesium_JSON_URL);
  const data = await res.json();

  if (!weekNum) weekNum = Chinesium_State.currentWeek;

  if (
    force ||
    !Chinesium_State.words[`week${weekNum}`] ||
    Chinesium_State.words[`week${weekNum}`].length === 0
  ) {
    Chinesium_State.words[`week${weekNum}`] =
      data.sort(() => 0.5 - Math.random()).slice(0, 5);
    Chinesium_SaveProgress();
  }

  window.Chinesium_Render();
}
