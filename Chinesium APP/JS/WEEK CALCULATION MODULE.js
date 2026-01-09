/* ============================
   3. WEEK CALCULATION MODULE
   --------------------------------
   Opis:
   - Oblicza aktualny numer tygodnia względem daty startowej (2026-01-01)
   - Funkcja globalna do użycia w loaderze i render
   Funkcje eksportowane:
   - Chinesium_GetCurrentWeekNumber() -> number (1-53)
   Zależności:
   - brak
============================ */
export function Chinesium_GetCurrentWeekNumber() {
  const start = new Date("2026-01-01T00:00:00");
  const now = new Date();
  const diffTime = now - start;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weekNum = Math.floor(diffDays / 7) + 1;
  return Math.min(Math.max(weekNum, 1), 53);
}
