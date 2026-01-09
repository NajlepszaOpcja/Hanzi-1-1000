/* ============================
   1. CONFIG & CONSTANTS
   --------------------------------
   Opis:
   - Zawiera wszystkie URL-e, klucze lokalnego storage i podstawowe ustawienia
   - Używane globalnie przez loader i wszystkie moduły
   Zmienne globalne:
   - Chinesium_JSON_URL (URL do pliku JSON ze słowami)
   - Chinesium_AUDIO_BASE (ścieżka bazowa do plików audio)
   - Chinesium_STORAGE_KEY (klucz do LocalStorage)
   - Chinesium_RENDER_URL (URL do modułu render)
============================ */
export const Chinesium_JSON_URL =
  "https://raw.githubusercontent.com/NajlepszaOpcja/Hanzi-1-1000/refs/heads/main/Json%20with%20audio%20links/HSK-1.json";

export const Chinesium_AUDIO_BASE =
  "https://raw.githubusercontent.com/NajlepszaOpcja/Hanzi-1-1000/main/hsk%201-8596/";

export const Chinesium_STORAGE_KEY = "Chinesium_Progress";

export const Chinesium_RENDER_URL =
  "https://raw.githubusercontent.com/NajlepszaOpcja/Hanzi-1-1000/refs/heads/main/Chinesium%20APP/JS/Render.js";
