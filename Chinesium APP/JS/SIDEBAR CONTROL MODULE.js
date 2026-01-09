/* ============================
   8. SIDEBAR CONTROL MODULE
   --------------------------------
   Opis:
   - Obsługuje otwieranie i zamykanie sidebaru aplikacji
   - Sidebar może zawierać przyszłe funkcje lub ustawienia
   Zależności:
   - brak
============================ */
document.getElementById("Chinesium_Burger").onclick =
  () => document.getElementById("Chinesium_Sidebar").classList.add("open");

document.getElementById("Chinesium_CloseSidebar").onclick =
  () => document.getElementById("Chinesium_Sidebar").classList.remove("open");
