window.addEventListener("DOMContentLoaded", function () {

    const language = document.querySelector(".header-icons")?.children[0];
    let currentLang = localStorage.getItem("language") || "it";

    const getValue = (obj, path) =>
        path.split(".").reduce((acc, key) => acc?.[key], obj) ?? "";

    const loadTranslation = async () => {

        const data = await fetch("./translation.json?v=" + new Date().getTime())
            .then(res => res.json());

        const matchedLanguage = data.find(el => Object.keys(el)[0] === currentLang);

        if (!matchedLanguage) return;

        const translatedText = Object.values(matchedLanguage)[0][0];

        // ================= FLAG =================
        const flag = document.getElementById("languageFlag");

        if (flag) {
            flag.src = currentLang === "it"
                ? "immagini/bandiera-inglese.png"
                : "immagini/bandiera-italiana.png";

            flag.alt = currentLang === "it" ? "EN" : "IT";
        }

        // ================= BINDINGS =================
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

            { id: "dealersHeroTitle", path: "dealersPage.heroTitle", html: true },
            { id: "dealersTitle", path: "dealersPage.title" },
            { id: "dealersSubtitle", path: "dealersPage.subtitle" },

            { id: "regionUSA", path: "dealersPage.regions.usa" },
            { id: "regionUSACanada", path: "dealersPage.regions.usaCanada" },
            { id: "regionChina", path: "dealersPage.regions.china" },
            { id: "regionHongKong", path: "dealersPage.regions.hongKong" },
            { id: "regionTaiwan", path: "dealersPage.regions.taiwan" },
            { id: "regionJapan", path: "dealersPage.regions.japan" },
            { id: "regionAustralia", path: "dealersPage.regions.australia" },
            { id: "regionGCC", path: "dealersPage.regions.gcc" },
            { id: "regionSouthAfrica", path: "dealersPage.regions.southAfrica" },

            { id: "b2bTitle", path: "b2b.title" },
            { id: "b2bSubtitle", path: "b2b.subtitle" },

            { id: "labelCompany", path: "b2b.labels.company" },
            { id: "labelVat", path: "b2b.labels.vat" },
            { id: "labelEmail", path: "b2b.labels.email" },
            { id: "labelPhone", path: "b2b.labels.phone" },
            { id: "labelCity", path: "b2b.labels.city" },
            { id: "labelAddress", path: "b2b.labels.address" },

            { id: "b2bSubmitBtn", path: "b2b.submit" },

            { id: "inputCompany", path: "placeholders.company", attr: "placeholder" },
            { id: "inputVat", path: "placeholders.vat", attr: "placeholder" },
            { id: "inputEmail", path: "placeholders.email", attr: "placeholder" },
            { id: "inputPhone", path: "placeholders.phone", attr: "placeholder" },
            { id: "inputCity", path: "placeholders.city", attr: "placeholder" },
            { id: "inputAddress", path: "placeholders.address", attr: "placeholder" },

            { id: "aboutHeroTitle", path: "aboutPage.heroTitle", html: true },
            { id: "aboutTitle", path: "aboutPage.title" },
            { id: "aboutText1", path: "aboutPage.text1" },
            { id: "aboutText2", path: "aboutPage.text2" },

            { id: "valuesTitle", path: "aboutPage.valuesTitle" },

            { id: "valueTechTitle", path: "aboutPage.techTitle" },
            { id: "valueTechDesc", path: "aboutPage.techDesc" },

            { id: "valueQualityTitle", path: "aboutPage.qualityTitle" },
            { id: "valueQualityDesc", path: "aboutPage.qualityDesc" },

            { id: "valueCustomTitle", path: "aboutPage.customTitle" },
            { id: "valueCustomDesc", path: "aboutPage.customDesc" },

            { id: "teamTitle", path: "aboutPage.teamTitle" },
            { id: "teamSubtitle", path: "aboutPage.teamSubtitle" },
            
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

            { id: "shopFilterMotoLabel", path: "shop.filterMoto" },
            { id: "shopSortLabel", path: "shop.sortBy" },

            { id: "optAllBrands", path: "shop.options.allBrands" },
            { id: "optAllModels", path: "shop.options.allModels" },
            { id: "optAllVersions", path: "shop.options.allVersions" },

            { id: "sortDefault", path: "shop.sort.default" },
            { id: "sortLowHigh", path: "shop.sort.lowHigh" },
            { id: "sortHighLow", path: "shop.sort.highHigh" }
        ];

        bindings.forEach(({ id, path, html, attr }) => {
            const el = document.querySelector(`#${id}`);
            if (!el) return;

            const value = getValue(translatedText, path);

            if (!value) return;

            if (attr) {
                el.setAttribute(attr, value);
            } else if (html) {
                el.innerHTML = value;
            } else {
                el.textContent = value;
            }
        });
    };

    loadTranslation();

    const toggleLanguage = () => {
        currentLang = currentLang === "it" ? "en" : "it";
        localStorage.setItem("language", currentLang);
        // Forza il reload della pagina per far ricaricare anche i JSON dei prodotti nella lingua corretta
        window.location.reload(); 
    };

    language?.addEventListener("click", toggleLanguage);
});
