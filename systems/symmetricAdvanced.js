// systems/symmetricAdvanced.js
import { t } from "../i18n/i18n.js";
import { make, add, mul, square, toStringR, normalize, div } from "../core/engine.js";

let coefList = [];

fetch("./data/coefficients.json")
    .then(r => r.json())
    .then(data => { coefList = data.coef; });

function pickCoef() {
    if (coefList.length === 0) return 1;
    return coefList[Math.floor(Math.random() * coefList.length)];
}

// Validare pentru Tip 2 (necesită x ≠ 0, y ≠ 0)
function validateForTip2(X, Y) {
    if (X.num === 0 || Y.num === 0) {
        return {
            valid: false,
            error: "Tipul 2 necesită x ≠ 0 și y ≠ 0 (pentru 1/x și 1/y)."
        };
    }
    return { valid: true };
}

export function generateSymmetricAdvanced(X, Y) {

    // Validare pentru Tip 2
    const validation = validateForTip2(X, Y);
    if (!validation.valid) {
        const html = `
            <h2>${t("adv_title")}</h2>
            <div class="card error">
                <p>⚠️ ${validation.error}</p>
            </div>
        `;
        return { html, latex: "", error: validation.error };
    }

    // ---------------------------
    // TIP 1: x³ + y³ ; x²y + xy²
    // ---------------------------
    const a1 = pickCoef();
    const b1 = pickCoef();

    const x2 = square(X);
    const y2 = square(Y);
    const x3 = mul(x2, X);
    const y3 = mul(y2, Y);
    const xy = mul(X, Y);
    const x2y = mul(x2, Y);
    const xy2 = mul(y2, X);

    // D1_1 = a1·(x³ + y³)
    const D1_1 = normalize(
        mul(make(a1, 1), normalize(add(x3, y3)))
    );

    // D1_2 = b1·(x²y + xy²)
    const D1_2 = normalize(
        mul(make(b1, 1), normalize(add(x2y, xy2)))
    );

    // Ecuația 1: a1·x³ + a1·y³ = D1_1
    const eq1a =
        (a1 === 1 ? "x^3" :
         a1 === -1 ? "-x^3" :
         a1 + "x^3") +
        (a1 === 1 ? " + y^3" :
         a1 === -1 ? " - y^3" :
         a1 > 0 ? " + " + a1 + "y^3" :
         " - " + Math.abs(a1) + "y^3") +
        " &= " + toStringR(D1_1);

    // Ecuația 2: b1·x²y + b1·xy² = D1_2
    const eq1b =
        (b1 === 1 ? "x^2y" :
         b1 === -1 ? "-x^2y" :
         b1 + "x^2y") +
        (b1 === 1 ? " + xy^2" :
         b1 === -1 ? " - xy^2" :
         b1 > 0 ? " + " + b1 + "xy^2" :
         " - " + Math.abs(b1) + "xy^2") +
        " &= " + toStringR(D1_2);

    // ---------------------------
    // TIP 2: |x| + |y| ; 1/x + 1/y
    // ---------------------------
    const a2 = pickCoef();

    // D2_1 = a2·(|x| + |y|)
    const absX = make(Math.abs(X.num), X.den);
    const absY = make(Math.abs(Y.num), Y.den);
    const D2_1 = normalize(
        mul(make(a2, 1), normalize(add(absX, absY)))
    );

    // D2_2 = 1/x + 1/y = (x+y)/(xy)
    const sum_xy = normalize(add(X, Y));
    const prod_xy = normalize(mul(X, Y));
    const D2_2 = normalize(div(sum_xy, prod_xy));

    // Ecuația 1: a2·|x| + a2·|y| = D2_1
    const eq2a =
        (a2 === 1 ? "|x|" :
         a2 === -1 ? "-|x|" :
         a2 + "|x|") +
        (a2 === 1 ? " + |y|" :
         a2 === -1 ? " - |y|" :
         a2 > 0 ? " + " + a2 + "|y|" :
         " - " + Math.abs(a2) + "|y|") +
        " &= " + toStringR(D2_1);

    // Ecuația 2: 1/x + 1/y = D2_2
    const eq2b =
        `\\frac{1}{x} + \\frac{1}{y} &= ${toStringR(D2_2)}`;

    // ---------------------------
    // TIP 3: x² + y² ; x³ + y³
    // ---------------------------
    const a3 = pickCoef();
    const b3 = pickCoef();

    // D3_1 = a3·(x² + y²)
    const D3_1 = normalize(
        mul(make(a3, 1), normalize(add(x2, y2)))
    );

    // D3_2 = b3·(x³ + y³)
    const D3_2 = normalize(
        mul(make(b3, 1), normalize(add(x3, y3)))
    );

    // Ecuația 1: a3·x² + a3·y² = D3_1
    const eq3a =
        (a3 === 1 ? "x^2" :
         a3 === -1 ? "-x^2" :
         a3 + "x^2") +
        (a3 === 1 ? " + y^2" :
         a3 === -1 ? " - y^2" :
         a3 > 0 ? " + " + a3 + "y^2" :
         " - " + Math.abs(a3) + "y^2") +
        " &= " + toStringR(D3_1);

    // Ecuația 2: b3·x³ + b3·y³ = D3_2
    const eq3b =
        (b3 === 1 ? "x^3" :
         b3 === -1 ? "-x^3" :
         b3 + "x^3") +
        (b3 === 1 ? " + y^3" :
         b3 === -1 ? " - y^3" :
         b3 > 0 ? " + " + b3 + "y^3" :
         " - " + Math.abs(b3) + "y^3") +
        " &= " + toStringR(D3_2);

    // ---------------------------
    // HTML pentru afișare (MathJax)
    // ---------------------------
    const html = `
        <h2>${t("adv_title")}</h2>

        <div class="card">
            <h3>${t("adv_type1")}</h3>
            <p>
\\( \\begin{aligned} ${eq1a} \\\\ ${eq1b} \\end{aligned} \\)
            </p>
        </div>

        <div class="card">
            <h3>${t("adv_type2")}</h3>
            <p>
\\( \\begin{aligned} ${eq2a} \\\\ ${eq2b} \\end{aligned} \\)
            </p>
        </div>

        <div class="card">
            <h3>${t("adv_type3")}</h3>
            <p>
\\( \\begin{aligned} ${eq3a} \\\\ ${eq3b} \\end{aligned} \\)
            </p>
        </div>

         <button id="exportLatexBtn" class="btn-mode">Export LaTeX</button>
    `;

    // ---------------------------
    // LATEX pentru export
    // ---------------------------
    const latex = `
\\section*{${t("adv_title")}}

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
