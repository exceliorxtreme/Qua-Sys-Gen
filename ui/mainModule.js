import { t } from "../i18n/i18n.js";
import { generateHomogeneous } from "../systems/homogeneous.js";
import { generateSymmetric } from "../systems/symmetric.js";
import { generateLinearQuadratic } from "../systems/linearQuadratic.js";
import { parseFraction } from "../core/fractions.js";
import { exportLatex } from "../systems/homogeneous.js";
import { generateSymmetricAdvanced } from "../systems/symmetricAdvanced.js";

export function loadMainModule(mode = "homogeneous"){
    return `
        <div class="module-wrapper">
            <h2 data-i18n="inputXY">${t("inputXY")}</h2>

            <p class="hint" data-i18n="input_hint">${t("input_hint")}</p>

            <div class="input-row">
                <input id="inputX" class="input-box" placeholder="x">
                <input id="inputY" class="input-box" placeholder="y">
            </div>

            <button class="btn-generate" onclick="window.generateSystem('${mode}')" data-i18n="generate">
                ${t("generate")}
            </button>

            <div id="result"></div>
        </div>
    `;
}

window.generateSystem = function(mode){
    const X = parseFraction(document.getElementById("inputX").value);
    const Y = parseFraction(document.getElementById("inputY").value);

    let result;

    if(mode === "homogeneous"){
        result = generateHomogeneous(X, Y);
    }

    if(mode === "symmetric"){
        result = generateSymmetric(X, Y);
    }

    if(mode === "linearQuadratic"){
        result = generateLinearQuadratic(X, Y);
    }
    if(mode === "advanced"){
        result = generateSymmetricAdvanced(X, Y);
    }

    document.getElementById("result").innerHTML = result.html;

    window._lastLatex = result.latex;

    const btn = document.getElementById("exportLatexBtn");
    if (btn) {
        btn.onclick = () => exportLatex(window._lastLatex);
    }

    // Fix: Delay MathJax rendering until after DOM is fully updated
    setTimeout(() => {
        if(window.MathJax && window.MathJax.typesetPromise){
            MathJax.typesetPromise().catch((err) => console.log('Typeset failed:', err));
        }
    }, 100);
};
