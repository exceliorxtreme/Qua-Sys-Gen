// loader pentru dicționare
let currentLang = "ro";
let dict = {};

export async function loadLang(lang){
    currentLang = lang;
    const res = await fetch(`./i18n/${lang}.json`);
    dict = await res.json();
    applyTranslations();
}

export function t(key){
    return dict[key] || key;
}

export function applyTranslations(){
    document.querySelectorAll("[data-i18n]").forEach(el=>{
        const key = el.getAttribute("data-i18n");
        el.innerHTML = t(key);
    });
}
