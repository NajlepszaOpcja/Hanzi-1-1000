/* ============================
   2. STATE & STORAGE MODULE
   --------------------------------
   Opis:
   - Przechowuje globalny stan aplikacji
   - Obsługuje zapis/odczyt stanu z LocalStorage
   - Stan zawiera aktualny tydzień, słowa oraz duże historie
   Zmienne eksportowane:
   - Chinesium_State (obiekt globalny ze stanem)
   Funkcje eksportowane:
   - Chinesium_LoadProgress() - ładuje stan z LocalStorage
   - Chinesium_SaveProgress() - zapisuje stan do LocalStorage
============================ */
export let Chinesium_State = {
  currentWeek: 1,
  words: {},
  bigStories: {}
};

export function Chinesium_LoadProgress() {
  const saved = localStorage.getItem(Chinesium_STORAGE_KEY);
  if (saved) Chinesium_State = JSON.parse(saved);
}

export function Chinesium_SaveProgress() {
  localStorage.setItem(
    Chinesium_STORAGE_KEY,
    JSON.stringify(Chinesium_State)
  );
}
