import { loadMainModule } from "./ui/mainModule.js";
import { applyTranslations } from "./i18n/i18n.js";
import { loadLang } from "./i18n/i18n.js";

let currentTab = "lectia1";   // PORNEȘTE ÎN LECȚIA 1

window.changeLang = function(lang){
    loadLang(lang).then(()=>{
        applyTranslations();
        loadTab(currentTab);

        setTimeout(() => {
            if (window.MathJax?.typesetPromise) {
                MathJax.typesetPromise();
            }
        }, 0);
    });
};

loadLang("ro").then(()=>{
    applyTranslations();
});

function loadTab(tab){
    currentTab = tab;
    let html = "";

    switch(tab){

        case "homogeneous":
            html = loadMainModule("homogeneous");
            break;

        case "symmetric":
            html = loadMainModule("symmetric");
            break;

        case "linearQuadratic":
            html = loadMainModule("linearQuadratic");
            break;

        case "lectia1":
            fetch("./lectii/lectia1.html")
                .then(r => r.text())
                .then(txt => {
                    document.getElementById("content").innerHTML = txt;
                    applyTranslations();
                    if (window.MathJax?.typesetPromise) MathJax.typesetPromise();
                });
            return; // IMPORTANT

        case "advanced":
    html = loadMainModule("advanced");
    break;

    case "linear2x2":
    html = loadMainModule("linear2x2");
    break;
    
        default:
            html = "<h2>Tab necunoscut</h2>";
            break;
    }

    document.getElementById("content").innerHTML = html;

    applyTranslations();

    // if (tab === "homogeneous" || tab === "symmetric" || tab === "linearQuadratic") {
//     setTimeout(() => {
//         window.generateSystem(tab);
//     }, 0);
// }

    setTimeout(() => {
        if (window.MathJax?.typesetPromise) {
            MathJax.typesetPromise();
        }
    }, 0);
}

document.addEventListener("click", (e)=>{
    if(e.target.matches("nav button")){
        const tab = e.target.getAttribute("data-tab");
        loadTab(tab);
    }
});

window.addEventListener("DOMContentLoaded", ()=>{
    loadTab("lectia1");   // PORNEȘTE ÎN LECȚIA 1
});
