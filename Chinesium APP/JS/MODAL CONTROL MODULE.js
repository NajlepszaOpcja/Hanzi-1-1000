/* ============================
   9. MODAL CONTROL MODULE
   --------------------------------
   Opis:
   - Obsługuje zamykanie modala (pokazującego pełne znaczenia słów)
   Zależności:
   - brak
============================ */
document.querySelector("#Chinesium_Modal .Chinesium_CloseModal").onclick =
  () => document.getElementById("Chinesium_Modal").style.display = "none";
