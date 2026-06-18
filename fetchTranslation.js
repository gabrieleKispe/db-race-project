window.addEventListener("DOMContentLoaded", function () {

    const language = document.querySelector(".header-icons")?.children[0];

    let currentLang = "it";
    
    const loadTranslation = async () => {

        const data = await fetch("./translation.json")
            .then(res => res.json());

        const matchedLanguage = data.find(el => Object.keys(el)[0] === currentLang);

        const translatedText = Object.values(matchedLanguage)[0][0];

        const bindings = [
            { id: "navShop", path: "header.shop" },
            { id: "navWhoWeAre", path: "header.whoWeAre" },
            { id: "navDealers", path: "header.dealers" },

            { id: "heroTitle", path: "homePage.heroTitle", html: true },
            { id: "shopNow", path: "homePage.shopNowButton" },

            { id: "featureFastShippingTitle", path: "homePage.fastShippingTitle", html: true },
            { id: "featureFastShippingDesc", path: "homePage.fastShippingDescription" },

            { id: "featurePlugPlayTitle", path: "homePage.plugPlayTitle", html: true },
            { id: "featurePlugPlayDesc", path: "homePage.plugPlayDescription" },

            { id: "featureSupportTitle", path: "homePage.supportTitle", html: true },
            { id: "featureSupportDesc", path: "homePage.supportDescription" },

            { id: "featureSafeShippingTitle", path: "homePage.safeShippingTitle", html: true },
            { id: "featureSafeShippingDesc", path: "homePage.safeShippingDescription" },

            { id: "bestSellersTitle", path: "homePage.bestSellersTitle" },

            { id: "communityTitle", path: "homePage.communityTitle" },
            { id: "communitySubtitle", path: "homePage.communitySubtitle" },

            { id: "footerShop", path: "footer.shop" },
            { id: "footerWhoWeAre", path: "footer.whoWeAre" },
            { id: "footerDealers", path: "footer.dealers" },

            { id: "footerTerms", path: "footer.terms" },
            { id: "footerRefunds", path: "footer.returns" },
            { id: "footerLegal", path: "footer.legal" },
            { id: "footerCopyright", path: "footer.copyright" },

            { id: "footerContactTitle", path: "footer.contactUs" },
            { id: "footerSupport", path: "footer.support" },
            { id: "footerFacebook", path: "footer.facebook" },
            { id: "footerInstagram", path: "footer.instagram" },
        ];

        const getValue = (obj, path) =>
            path.split(".").reduce((acc, key) => acc?.[key], obj);

        bindings.forEach(({ id, path, html }) => {
            const el = document.querySelector(`#${id}`);
            if (!el) return;

            const value = getValue(translatedText, path);

            html ? el.innerHTML = value : el.textContent = value;
        });
    };

    // prima render (IT di default)
    loadTranslation();

    const toggleLanguage = () => {
        currentLang = (currentLang === "it") ? "en" : "it";
        loadTranslation();
    };

    language.addEventListener("click", toggleLanguage);

});
