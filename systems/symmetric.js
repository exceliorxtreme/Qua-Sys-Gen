// systems/symmetric.js
import { t } from "../i18n/i18n.js";
import { make, add, mul, square, toStringR, normalize } from "../core/engine.js";

let coefList = [];

fetch("../data/coefficients.json")
    .then(r => r.json())
    .then(data => { coefList = data.coef; });

function pickCoef() {
    if (coefList.length === 0) return 1;
    return coefList[Math.floor(Math.random() * coefList.length)];
}

function term(coef, text) {
    if (coef === 0) return "";
    if (coef === 1) return ` + ${text}`;
    if (coef === -1) return ` - ${text}`;
    if (coef > 0) return ` + ${coef}${text}`;
    return ` - ${Math.abs(coef)}${text}`;
}

export function generateSymmetric(X, Y) {

    const sol = `(${toStringR(X)}, ${toStringR(Y)})`;

    // ---------------------------
    // TIP 1
    // ---------------------------
    const a1 = pickCoef();
    const b1 = pickCoef();
    const c1 = pickCoef();

    const D1_1 = normalize(
        add(
            add(mul(make(a1,1), X), mul(make(a1,1), Y)),
            mul(make(b1,1), mul(X,Y))
        )
    );

    const D1_2 = normalize(
        add(
            add(mul(make(c1,1), X), mul(make(c1,1), Y)),
            mul(make(-a1,1), mul(X,Y))
        )
    );

    const eq1a =
        term(a1, "x").replace("+ ", "") +
        term(a1, "y") +
        term(b1, "xy") +
        ` &= ${toStringR(D1_1)}`;

    const eq1b =
        term(c1, "x").replace("+ ", "") +
        term(c1, "y") +
        term(-a1, "xy") +
        ` &= ${toStringR(D1_2)}`;

    // ---------------------------
    // TIP 2
    // ---------------------------
    const a2 = pickCoef();
    const b2 = pickCoef();

    const D2_1 = normalize(
        add(
            add(mul(make(a2,1), X), mul(make(a2,1), Y)),
            mul(make(-b2,1), mul(X,Y))
        )
    );

    const D2_2 = normalize(
        add(
            add(square(X), square(Y)),
            add(mul(make(b2,1), X), mul(make(b2,1), Y))
        )
    );

    const eq2a =
        term(a2, "x").replace("+ ", "") +
        term(a2, "y") +
        term(-b2, "xy") +
        ` &= ${toStringR(D2_1)}`;

    const eq2b =
        `x^2 + y^2` +
        term(b2, "x") +
        term(b2, "y") +
        ` &= ${toStringR(D2_2)}`;

    // ---------------------------
    // TIP 3
    // ---------------------------
    const a3 = pickCoef();

    const D3_1 = normalize(
        add(mul(make(a3,1), X), mul(make(a3,1), Y))
    );

    const D3_2 = normalize(
        add(
            mul(square(X), X),
            mul(square(Y), Y)
        )
    );

    const eq3a =
        term(a3, "x").replace("+ ", "") +
        term(a3, "y") +
        ` &= ${toStringR(D3_1)}`;

    const eq3b =
        `x^3 + y^3 &= ${toStringR(D3_2)}`;

    // ---------------------------
    // TIP 4
    // ---------------------------
    const a4 = pickCoef();
    const b4 = pickCoef();

    const D4_1 = normalize(
        add(
            add(mul(make(a4,1), X), mul(make(a4,1), Y)),
            mul(make(b4,1), mul(X,Y))
        )
    );

    const D4_2 = normalize(
        add(
            mul(X, make(Y.den, Y.num)),
            mul(Y, make(X.den, X.num))
        )
    );

    const eq4a =
        term(a4, "x").replace("+ ", "") +
        term(a4, "y") +
        term(b4, "xy") +
        ` &= ${toStringR(D4_1)}`;

    const eq4b =
        `\\frac{x}{y} + \\frac{y}{x} &= ${toStringR(D4_2)}`;

    // ---------------------------
    // HTML pentru afișare
    // ---------------------------
    const html = `
        <h2>${t("sym_title")}</h2>

        <div class="card">
            <h3>${t("sym_type1")}</h3>
            <p>

\\[ \\begin{aligned} ${eq1a} \\\\ ${eq1b} \\end{aligned} \\]

</p>
        </div>

        <div class="card">
            <h3>${t("sym_type2")}</h3>
            <p>

\\[ \\begin{aligned} ${eq2a} \\\\ ${eq2b} \\end{aligned} \\]

</p>
        </div>

        <div class="card">
            <h3>${t("sym_type3")}</h3>
            <p>

\\[ \\begin{aligned} ${eq3a} \\\\ ${eq3b} \\end{aligned} \\]

</p>
        </div>

        <div class="card">
            <h3>${t("sym_type4")}</h3>
            <p>

\\[ \\begin{aligned} ${eq4a} \\\\ ${eq4b} \\end{aligned} \\]

</p>
        </div>

        <button id="exportLatexBtn" class="btn-mode">Export LaTeX</button>
    `;

    // ---------------------------
    // LATEX pentru export (enumerate)
    // ---------------------------
    const latex = `
\\section*{${t("sym_title")}}

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



\\item
\\[
\\begin{aligned}
${eq4a} \\\\
${eq4b}
\\end{aligned}
\\]



\\end{enumerate}
`;

    return { html, latex };
}
