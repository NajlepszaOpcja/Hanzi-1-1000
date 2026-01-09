/* ============================
   RENDER
============================ */
function Chinesium_Render() {
  const grid = document.getElementById("Chinesium_WordGrid");
  const weekLabel = document.getElementById("Chinesium_WeekLabel");
  const weekNum = Chinesium_State.currentWeek;
  const currentWeekNumber = Chinesium_GetCurrentWeekNumber();

  grid.innerHTML = "";

  const words = Chinesium_State.words[`week${weekNum}`] || [];

  if(weekNum > currentWeekNumber || words.length === 0){
    weekLabel.textContent = `Week ${weekNum} - brak słów do wyświetlenia`;
    return;
  }

  const startDate = new Date("2026-01-01T00:00:00");
  startDate.setDate(startDate.getDate() + (weekNum - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7);

  function formatDate(d) {
    return `${d.getDate().toString().padStart(2,"0")}.${(d.getMonth()+1).toString().padStart(2,"0")}`;
  }

  weekLabel.textContent = `Week ${weekNum} (${formatDate(startDate)} - ${formatDate(endDate)})`;

  words.forEach((word) => {
    const card = document.createElement("div");
    card.className = "Chinesium_Card";

    const freqStar = word.frequency < 1501 ? "⭐" : "";

    const allMeanings = [...new Set(word.forms.flatMap(f => f.meanings))];
    const limitedMeanings = allMeanings.slice(0, 2);

    const table = document.createElement("table");

    const pinyinRow = document.createElement("tr");
    pinyinRow.innerHTML =
      `<td>Pinyin:</td><td>${word.forms.map(f => f.transcriptions.pinyin).join(", ")}</td>`;
    table.appendChild(pinyinRow);

    const translationsRow = document.createElement("tr");
    const translationsContainer = document.createElement("td");
    translationsContainer.colSpan = 2;
    const translationsTable = document.createElement("table");
    translationsTable.style.width = "100%";

    function renderTranslations(meanings) {
      translationsTable.innerHTML = "";
      meanings.forEach((m, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td style="width:30px">${i + 1}.</td><td>${m}</td>`;
        translationsTable.appendChild(row);
      });
    }

    renderTranslations(limitedMeanings);
    translationsContainer.appendChild(translationsTable);

    const toggleTranslationsBtn = document.createElement("button");
    toggleTranslationsBtn.textContent = "Pokaż więcej ↓";
    toggleTranslationsBtn.className = "Chinesium_ShowMoreBtn";

    toggleTranslationsBtn.addEventListener("click", () => {
      const modal = document.getElementById("Chinesium_Modal");
      const modalContent = document.getElementById("Chinesium_ModalContent");
      modalContent.innerHTML = "";

      const cloneCard = card.cloneNode(true);
      cloneCard.querySelector(".Chinesium_ShowMoreBtn")?.remove();

      const meaningsAll = [...new Set(word.forms.flatMap(f => f.meanings))];
      const translationsTable = cloneCard.querySelector("table table");

      if (translationsTable) {
        translationsTable.innerHTML = "";
        if (meaningsAll.length > 4) {
          const tbody = document.createElement("tbody");
          translationsTable.appendChild(tbody);
          const tfoot = document.createElement("tfoot");
          translationsTable.appendChild(tfoot);

          const toggleRow = document.createElement("tr");
          const toggleCell = document.createElement("td");
          toggleCell.colSpan = 2;
          const toggleBtn = document.createElement("button");
          toggleBtn.className = "Chinesium_ShowMoreBtn";
          toggleBtn.textContent = "Rozwiń ↓";
          let expanded = false;
          function render(list) {
            tbody.innerHTML = "";
            list.forEach((m,i)=>{const row=document.createElement("tr");row.innerHTML=`<td style="width:30px">${i+1}.</td><td>${m}</td>`;tbody.appendChild(row);});
          }
          toggleBtn.onclick = () => {
            if(!expanded){render(meaningsAll);toggleBtn.textContent="Zwiń ↑";expanded=true;} 
            else{render(meaningsAll.slice(0,4));toggleBtn.textContent="Rozwiń ↓";expanded=false;}
          };
          toggleCell.appendChild(toggleBtn);
          toggleRow.appendChild(toggleCell);
          tfoot.appendChild(toggleRow);
          render(meaningsAll.slice(0,4));
        } else {
          const tbody = document.createElement("tbody");
          translationsTable.appendChild(tbody);
          meaningsAll.forEach((m,i)=>{const row=document.createElement("tr");row.innerHTML=`<td style="width:30px">${i+1}.</td><td>${m}</td>`;tbody.appendChild(row);});
        }
      }

      const remainingTable = document.createElement("table");
      remainingTable.style.width="100%";
      const posRow=document.createElement("tr");posRow.innerHTML=`<td>Sentence part:</td><td>${word.pos.join(", ")}</td>`;remainingTable.appendChild(posRow);
      const freqRow=document.createElement("tr");freqRow.innerHTML=`<td>Frequency:</td><td>${word.frequency}</td>`;remainingTable.appendChild(freqRow);
      const radicalRow=document.createElement("tr");radicalRow.innerHTML=`<td>Radical:</td><td>${word.radical??"N/A"}</td>`;remainingTable.appendChild(radicalRow);
      const tradRow=document.createElement("tr");tradRow.innerHTML=`<td>Traditional:</td><td>${word.forms?.[0]?.traditional??"N/A"}</td>`;remainingTable.appendChild(tradRow);
      const transcriptionsRow=document.createElement("tr");
      const transcriptionsSelect=document.createElement("select");
      const options=["pinyin","numeric","wadegiles","bopomofo","romatzyh"];
      options.forEach(opt=>{const o=document.createElement("option");o.value=opt;o.textContent=opt.charAt(0).toUpperCase()+opt.slice(1);transcriptionsSelect.appendChild(o);});
      const transcriptionsValue=document.createElement("span");
      function updateTranscriptionDisplay(){const selected=transcriptionsSelect.value;const values=word.forms.map(f=>f.transcriptions[selected]||"N/A").join(", ");transcriptionsValue.textContent=values;}
      transcriptionsSelect.addEventListener("change",updateTranscriptionDisplay);
      updateTranscriptionDisplay();
      const tdTrans=document.createElement("td");tdTrans.appendChild(transcriptionsSelect);tdTrans.appendChild(document.createElement("br"));tdTrans.appendChild(transcriptionsValue);
      transcriptionsRow.innerHTML="<td>Transcriptions:</td>";transcriptionsRow.appendChild(tdTrans);remainingTable.appendChild(transcriptionsRow);
      const classifiersRow=document.createElement("tr");classifiersRow.innerHTML=`<td>Classifiers:</td><td>${word.forms?.[0]?.classifiers?.join(", ")??"N/A"}</td>`;remainingTable.appendChild(classifiersRow);

      cloneCard.appendChild(remainingTable);

      const modalIcon = cloneCard.querySelector(".Chinesium_Icons");
      if(modalIcon){
        if(word.audio && word.audio.trim()!==""){
          const audio=new Audio(Chinesium_AUDIO_BASE+word.audio);audio.volume=0.5;
          modalIcon.innerHTML="🔊";modalIcon.style.cursor="pointer";modalIcon.onclick=()=>audio.play();
        } else {modalIcon.innerHTML="💩";modalIcon.style.cursor="default";}
      }

      const cloneStory=cloneCard.querySelector(".Chinesium_StoryInput");
      if(cloneStory){cloneStory.addEventListener("input",e=>{word.story=e.target.value;Chinesium_SaveProgress();});}

      modalContent.appendChild(cloneCard);
      modal.style.display="block";
    });

    translationsContainer.appendChild(toggleTranslationsBtn);
    translationsRow.appendChild(translationsContainer);
    table.appendChild(translationsRow);

    const iconContainer = document.createElement("div");
    iconContainer.className="Chinesium_Icons";
    if(word.audio && word.audio.trim()!==""){const audio=new Audio(Chinesium_AUDIO_BASE+word.audio);audio.volume=0.5;iconContainer.innerHTML="🔊";iconContainer.onclick=()=>audio.play();} else {iconContainer.innerHTML="💩";}
    card.innerHTML=`<div class="Chinesium_Hanzi"><span>${word.simplified}</span><span class="Chinesium_Star">${freqStar}</span></div>`;
    card.appendChild(iconContainer);
    card.appendChild(table);

    const textarea=document.createElement("textarea");
    textarea.className="Chinesium_StoryInput";textarea.placeholder="Twoja historyjka...";textarea.value=word.story||"";textarea.oninput=e=>{word.story=e.target.value;Chinesium_SaveProgress();};
    card.appendChild(textarea);

    grid.appendChild(card);
  });

  const bigStoryInput = document.getElementById("Chinesium_BigStory");
  bigStoryInput.value = Chinesium_State.bigStories[`week${weekNum}`] || "";
  bigStoryInput.oninput = e => {
    Chinesium_State.bigStories[`week${weekNum}`] = e.target.value;
    Chinesium_SaveProgress();
  };
}
window.Chinesium_Render = Chinesium_Render;
