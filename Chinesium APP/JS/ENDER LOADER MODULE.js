/* ============================
   4. RENDER LOADER MODULE
   --------------------------------
   Opis:
   - Dynamicznie ładuje moduł render z GitHuba (Render.js)
   - Umożliwia separację logiki renderowania od głównego loadera
   Funkcje eksportowane:
   - Chinesium_LoadRender() -> Promise<void>
   Zależności:
   - Chinesium_RENDER_URL (z modułu config)
   - window.Chinesium_Render (po załadowaniu Render.js)
============================ */
export async function Chinesium_LoadRender() {
  // Jeśli już załadowano, nic nie robimy
  if (window.Chinesium_Render) return;

  try {
    const res = await fetch(Chinesium_RENDER_URL);
    const code = await res.text();

    // Tworzymy element <script> i wstawiamy do body
    const script = document.createElement('script');
    script.textContent = code;
    document.body.appendChild(script);

    // Sprawdzenie, czy funkcja jest teraz dostępna
    if (!window.Chinesium_Render) {
      console.error("Chinesium_Render nadal nie jest zdefiniowane!");
    } else {
      console.log("Chinesium_Render załadowane poprawnie!");
    }

  } catch (e) {
    console.error("Błąd ładowania Render.js:", e);
  }
}
