import { t } from "./i18n/i18n.js";
import { make, add, mul, square, toStringR, normalize } from "../core/engine.js";

let coefList = [];

fetch("..data/coefficients.json")
    .then(r => r.json())
    .then(data => { coefList = data.coef; });

function pickCoef() {
    if (coefList.length === 0) return 1;
    return coefList[Math.floor(Math.random() * coefList.length)];
}

function term(coef, text) {
    if (coef === 0) return "";
    if (coef === 1) return " + " + text;
    if (coef === -1) return " - " + text;
    if (coef > 0) return " + " + coef + text;
    return " - " + Math.abs(coef) + text;
}

function lead(coef, text){
    if (coef === 1) return text;
    if (coef === -1) return "-" + text;
    return coef + text;
}

export function generateLinearQuadratic(X, Y) {

    const sol = "(" + toStringR(X) + ", " + toStringR(Y) + ")";

    // ============================
    // SISTEM 1
    // ============================

    const a1 = pickCoef();
    const b1 = pickCoef();
    const c1 = pickCoef();
    const d1 = pickCoef();

    const D1_1 = normalize(
        add(
            mul(make(a1,1), X),
            mul(make(b1,1), Y)
        )
    );

    const D1_2 = normalize(
        add(
            add(square(X), mul(make(-c1,1), mul(X,Y))),
            add(mul(make(d1,1), square(Y)), X)
        )
    );

    const eq1a =
        lead(a1, "x") +
        term(b1, "y") +
        " &= " + toStringR(D1_1);

    const eq1b =
        lead(1, "x^2") +
        term(-c1, "xy") +
        term(d1, "y^2") +
        term(1, "x") +
        " &= " + toStringR(D1_2);

    // ============================
    // SISTEM 2
    // ============================

    const a2 = pickCoef();
    const b2 = pickCoef();
    const c2 = pickCoef();
    const d3 = pickCoef();

    const D2_1 = normalize(
        add(
            mul(make(c2,1), X),
            mul(make(d3,1), Y)
        )
    );

    const D2_2 = normalize(
        add(
            add(mul(make(a2,1), square(X)), mul(make(-b2,1), X)),
            add(mul(make(2*c2,1), Y), mul(make(-d3,1), mul(X,Y)))
        )
    );

    const eq2a =
        lead(c2, "x") +
        term(d3, "y") +
        " &= " + toStringR(D2_1);

    const eq2b =
        lead(a2, "x^2") +
        term(-b2, "x") +
        term(2*c2, "y") +
        term(-d3, "xy") +
        " &= " + toStringR(D2_2);

    // ============================
    // SISTEM 3
    // ============================

    const a3 = pickCoef();
    const b3 = pickCoef();
    const c3 = pickCoef();
    const d5 = pickCoef();

    const D3_1 = normalize(
        add(
            mul(make(d5,1), X),
            mul(make(-c3,1), Y)
        )
    );

    const D3_2 = normalize(
        add(
            add(mul(make(b3,1), square(X)), mul(make(-a3,1), mul(X,Y))),
            add(mul(make(2*c3,1), X), mul(make(-3*d5,1), Y))
        )
    );

    const eq3a =
        lead(d5, "x") +
        term(-c3, "y") +
        " &= " + toStringR(D3_1);

    const eq3b =
        lead(b3, "x^2") +
        term(-a3, "xy") +
        term(2*c3, "x") +
        term(-3*d5, "y") +
        " &= " + toStringR(D3_2);

    // ============================
    // HTML pentru afișare
    // ============================

    const html = `
        <h2>${t("linquad_title")}</h2>

        <div class="card">
            <h3>${t("linquad_type1")}</h3>
            <p>\\[
             \\begin{aligned} ${eq1a} \\\\ ${eq1b} \\end{aligned} 
            \\]

</p>
        </div>

        <div class="card">
            <h3>${t("linquad_type2")}</h3>
            <p>\\[
             \\begin{aligned} ${eq2a} \\\\ ${eq2b} \\end{aligned}
              \\]

</p>
        </div>

        <div class="card">
            <h3>${t("linquad_type3")}</h3>
            <p>\\[
            \\begin{aligned} ${eq3a} \\\\ ${eq3b} \\end{aligned} 
            \\]

</p>
        </div>

        <button id="exportLatexBtn" class="btn-mode">Export LaTeX</button>
    `;

    // ============================
    // LATEX pentru export (enumerate)
    // ============================

    const latex = `
\\section*{${t("linquad_title")}}

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
