document.addEventListener("DOMContentLoaded", function() {
    
    const customSelect = document.querySelector(".custom-select");
    const selectTrigger = document.querySelector(".custom-select-trigger");
    const options = document.querySelectorAll(".custom-option");

    // Apre e chiude il menu a tendina quando si clicca sul selettore
    selectTrigger.addEventListener("click", function(e) {
        customSelect.classList.toggle("open");
        e.stopPropagation();
    });

    // Gestisce la selezione di un'opzione
    options.forEach(option => {
        option.addEventListener("click", function() {
            const value = this.getAttribute("data-value");
            const text = this.textContent;
            
            // Aggiorna il testo visibile sul selettore
            selectTrigger.querySelector("span").textContent = text;
            customSelect.classList.remove("open");
            
            // Qui puoi inserire la logica di reindirizzamento o azione
            console.log("Moto selezionata:", value);
            // Esempio: window.location.href = "/prodotti/" + value;
        });
    });

    // Chiude il menu a tendina se si clicca in un punto qualsiasi fuori dal selettore
    window.addEventListener("click", function() {
        if (customSelect.classList.contains("open")) {
            customSelect.classList.remove("open");
        }
    });
});