import { t } from "./i18n/i18n.js";
import { make, add, mul, square, toStringR, normalize } from "../core/engine.js";

let coefList = [];

fetch("./data/coefficients.json")
    .then(r => r.json())
    .then(data => { coefList = data.coef; });

function term(coef, text) {
    if (coef === 0) return "";
    if (coef === 1) return " + " + text;
    if (coef === -1) return " - " + text;
    if (coef > 0) return " + " + coef + text;
    return " - " + Math.abs(coef) + text;
}

function pickCoef() {
    if (coefList.length === 0) return 1;
    return coefList[Math.floor(Math.random() * coefList.length)];
}

export function generateHomogeneous(X, Y) {

    const sol = "(" + toStringR(X) + ", " + toStringR(Y) + ")";

    // TIP 1
    const a1 = make(pickCoef(), 1);
    const b1 = make(pickCoef(), 1);

    const D1_1 = normalize(
        add(
            add(square(X), mul(make(-a1.num,1), mul(X,Y))),
            mul(make(-1,1), square(Y))
        )
    );

    const D1_2 = normalize(
        add(
            square(X),
            mul(make(-b1.num,1), mul(X,Y))
        )
    );

    const eq1a = "x^2" + term(-a1.num, "xy") + term(-1, "y^2") + " &= " + toStringR(D1_1);
    const eq1b = "x^2" + term(-b1.num, "xy") + " &= " + toStringR(D1_2);

    // TIP 2
    const a2 = make(pickCoef(), 1);
    const b2 = make(pickCoef(), 1);
    const c2 = make(pickCoef(), 1);

    const D2_1 = normalize(
        add(
            add(mul(a2, square(X)), mul(make(-b2.num,1), mul(X,Y))),
            mul(c2, square(Y))
        )
    );

    const D2_2 = normalize(
        add(
            add(square(X), mul(make(-a2.num,1), mul(X,Y))),
            mul(b2, square(Y))
        )
    );

    const eq2a =
        (a2.num === 1 ? "x^2" :
         a2.num === -1 ? "-x^2" :
         a2.num + "x^2") +
        term(-b2.num, "xy") +
        term(c2.num, "y^2") +
        " &= " + toStringR(D2_1);

    const eq2b =
        "x^2" +
        term(-a2.num, "xy") +
        term(b2.num, "y^2") +
        " &= " + toStringR(D2_2);

    // TIP 3
    const a3 = make(pickCoef(), 1);
    const b3 = make(pickCoef(), 1);
    const c3 = make(pickCoef(), 1);

    const D3_1 = normalize(
        add(
            add(square(X), mul(a3, mul(X,Y))),
            mul(c3, square(Y))
        )
    );

    const D3_2 = normalize(
        add(
            add(square(X), mul(make(-b3.num,1), mul(X,Y))),
            square(Y)
        )
    );

    const eq3a = "x^2" + term(a3.num, "xy") + term(c3.num, "y^2") + " &= " + toStringR(D3_1);
    const eq3b = "x^2" + term(-b3.num, "xy") + term(1, "y^2") + " &= " + toStringR(D3_2);

    // HTML pentru afișare
    const html = `
        <h2>${t("hom_title")}</h2>

        <div class="card">
            <h3>${t("hom_type1")}</h3>
            <p>
            \\[ 
            \\begin{aligned} ${eq1a} \\\\ ${eq1b} \\end{aligned}
             \\]

</p>
        </div>

        <div class="card">
            <h3>${t("hom_type2")}</h3>
            <p>
            \\[ 
            \\begin{aligned} ${eq2a} \\\\ ${eq2b} \\end{aligned} 
            \\]

</p>
        </div>

        <div class="card">
            <h3>${t("hom_type3")}</h3>
            <p>
            \\[
             \\begin{aligned} ${eq3a} \\\\ ${eq3b} \\end{aligned} 
             \\]

</p>
        </div>

        <button id="exportLatexBtn" class="btn-mode">Export LaTeX</button>
    `;

    // LATEX pentru export
   const latex = `
\\section*{${t("hom_title")}}


\\begin{enumerate}

\\item
\\[
\\begin{aligned}
${eq1a} \\\\
${eq1b}
\\end{aligned}
\\]



\\item
\\[
\\begin{aligned}
${eq2a} \\\\
${eq2b}
\\end{aligned}
\\]



\\item
\\[
\\begin{aligned}
${eq3a} \\\\
${eq3b}
\\end{aligned}
\\]



\\end{enumerate}
`;


    return { html, latex };
}

export function exportLatex(latexContent) {

    const latex = `
\\documentclass[12pt]{article}
\\usepackage{amsmath}
\\usepackage{amssymb}

\\begin{document}

${latexContent}

\\end{document}
`;

    const blob = new Blob([latex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sisteme.tex";
    a.click();

    URL.revokeObjectURL(url);
}
