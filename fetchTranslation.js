window.addEventListener("DOMContentLoaded", function () {
    const language = document?.querySelector(".header-icons").children[0];
    const loadTranslation = async () => {
        debugger;
        let currentLanguage;
        var json_data = await fetch("./translation.json")
            .then(res => res.json())
            .then(data => {
                const alt = language.alt;
                const matchedLanguage = data.find(el => {
                    const languageKey = Object.keys(el)[0];
                    return languageKey == alt.toLowerCase();
                });
                currentLanguage = matchedLanguage;
            }
            );

        let shopNowButton = document.querySelector("#shopNow");
        console.log(shopNowButton)
        const translatedText = Object.values(currentLanguage)[0];
        shopNowButton.textContent = translatedText[0].homePage.shopNowButton;


    };

    loadTranslation();

    const changeLanguage = async () => {
        language.alt = "it";

        loadTranslation();
    }

    language.addEventListener("click", function () {
        changeLanguage();
    }, false);


}, false);