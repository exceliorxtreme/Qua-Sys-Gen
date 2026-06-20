// systems/linear2x2.js
import { t } from "../i18n/i18n.js";
import { make, add, sub, mul, toStringR, normalize } from "../core/engine.js";

let coefList = [];

fetch("./data/coefficients.json")
    .then(r => r.json())
    .then(data => { coefList = data.coef; });

function pickCoef() {
    if (coefList.length === 0) return 1;
    return coefList[Math.floor(Math.random() * coefList.length)];
}

function validateInput(X, Y) {
    const absX = Math.abs(X.num / X.den);
    const absY = Math.abs(Y.num / Y.den);
    if (absX > 20 || absY > 20) {
        return {
            valid: false,
            error: "Soluțiile trebuie să fie în intervalul [-20, 20]."
        };
    }
    return { valid: true };
}

// Funcție helper pentru formatare coeficienți (fără paranteze urâte)
function fmtLead(coef, text) {
    if (coef === 0) return "";  // elimină termenul
    if (coef === 1) return text;
    if (coef === -1) return "-" + text;
    return coef + text;
}

function fmtTerm(coef, text) {
    if (coef === 0) return "";
    if (coef === 1) return " + " + text;
    if (coef === -1) return " - " + text;
    if (coef > 0) return " + " + coef + text;
    return " - " + Math.abs(coef) + text;
}

export function generateLinear2x2(X, Y) {

    // Validare input
    const validation = validateInput(X, Y);
    if (!validation.valid) {
        const html = `
            <h2>${t("lin2x2_title")}</h2>
            <div class="card error">
                <p>⚠️ ${validation.error}</p>
            </div>
        `;
        return { html, latex: "", error: validation.error };
    }

    // Soluția pentru LaTeX (comentată)
    const solStr = `(${toStringR(X)}, ${toStringR(Y)})`;

    // ==========================================
    // SISTEM 1: Simplu random
    // ==========================================
    const a1 = pickCoef();
    const b1 = pickCoef();
    const c1 = pickCoef();
    const d1 = pickCoef();

    const D1_1 = normalize(add(mul(make(a1, 1), X), mul(make(b1, 1), Y)));
    const D1_2 = normalize(add(mul(make(c1, 1), X), mul(make(d1, 1), Y)));

    const eq1a = fmtLead(a1, "x") + fmtTerm(b1, "y") + " &= " + toStringR(D1_1);
    const eq1b = fmtLead(c1, "x") + fmtTerm(d1, "y") + " &= " + toStringR(D1_2);

    // ==========================================
    // SISTEM 2: Coeficienți "jucați"
    // ==========================================
    const a2 = pickCoef();
    const b2 = pickCoef();
    const c2 = pickCoef();

    const coef1 = 2 - a2;
    const coef2 = b2 - 2;

    const D2_1 = normalize(add(mul(make(coef1, 1), X), mul(make(b2, 1), Y)));
    const D2_2 = normalize(add(mul(make(coef2, 1), X), mul(make(c2, 1), Y)));

    const eq2a = fmtLead(coef1, "x") + fmtTerm(b2, "y") + " &= " + toStringR(D2_1);
    const eq2b = fmtLead(coef2, "x") + fmtTerm(c2, "y") + " &= " + toStringR(D2_2);

    // ==========================================
    // SISTEM 3: Coeficienți legați
    // ==========================================
    const a3 = pickCoef();
    const b3 = pickCoef();
    const k3 = pickCoef();

    const a3p = a3 + k3;
    const b3p = b3 - k3;

    const D3_1 = normalize(add(mul(make(a3, 1), X), mul(make(b3, 1), Y)));
    const D3_2 = normalize(add(mul(make(a3p, 1), X), mul(make(b3p, 1), Y)));

    const eq3a = fmtLead(a3, "x") + fmtTerm(b3, "y") + " &= " + toStringR(D3_1);
    const eq3b = fmtLead(a3p, "x") + fmtTerm(b3p, "y") + " &= " + toStringR(D3_2);

// SISTEM 4: Module simple (fracții corecte)
// ==========================================
const a4 = pickCoef();
const b4 = pickCoef();
const c4 = pickCoef();
const d4 = pickCoef();

// |x - y|
const dXY = normalize(sub(X, Y));
const absXmY = make(Math.abs(dXY.num), dXY.den);

// |x + y|
const sXY = normalize(add(X, Y));
const absXpY = make(Math.abs(sXY.num), sXY.den);

const D4_1 = normalize(add(mul(make(a4, 1), absXmY), mul(make(b4, 1), absXpY)));
const D4_2 = normalize(add(mul(make(c4, 1), absXpY), mul(make(d4, 1), absXmY)));

const eq4a = fmtLead(a4, "|x-y|") + fmtTerm(b4, "|x+y|") + " &= " + toStringR(D4_1);
const eq4b = fmtLead(c4, "|x+y|") + fmtTerm(d4, "|x-y|") + " &= " + toStringR(D4_2);
    /// ==========================================
// SISTEM 5: Module "răutăcioase" (fracții corecte)
// ==========================================
const a5 = pickCoef();
const b5 = pickCoef();
const c5 = pickCoef();
const d5 = pickCoef();

// |2x - y|
const e1 = normalize(add(mul(make(2,1), X), mul(make(-1,1), Y)));
const absExpr1 = make(Math.abs(e1.num), e1.den);

// |x + 3y|
const e2 = normalize(add(X, mul(make(3,1), Y)));
const absExpr2 = make(Math.abs(e2.num), e2.den);

const D5_1 = normalize(add(mul(make(a5, 1), absExpr1), mul(make(b5, 1), absExpr2)));
const D5_2 = normalize(add(mul(make(c5, 1), absExpr1), mul(make(d5, 1), absExpr2)));

const eq5a = fmtLead(a5, "|2x-y|") + fmtTerm(b5, "|x+3y|") + " &= " + toStringR(D5_1);
const eq5b = fmtLead(c5, "|2x-y|") + fmtTerm(d5, "|x+3y|") + " &= " + toStringR(D5_2);
    // ==========================================
    // HTML pentru afișare (FĂRĂ soluție)
    // ==========================================
    const html = `
        <h2>${t("lin2x2_title")}</h2>

        <div class="card">
            <h3>${t("lin2x2_type1")}</h3>
            <p>
\\( \\begin{aligned} ${eq1a} \\\\ ${eq1b} \\end{aligned} \\)
            </p>
        </div>

        <div class="card">
            <h3>${t("lin2x2_type2")}</h3>
            <p>
\\( \\begin{aligned} ${eq2a} \\\\ ${eq2b} \\end{aligned} \\)
            </p>
        </div>

        <div class="card">
            <h3>${t("lin2x2_type3")}</h3>
            <p>
\\( \\begin{aligned} ${eq3a} \\\\ ${eq3b} \\end{aligned} \\)
            </p>
        </div>

        <div class="card">
            <h3>${t("lin2x2_type4")}</h3>
            <p>
\\( \\begin{aligned} ${eq4a} \\\\ ${eq4b} \\end{aligned} \\)
            </p>
        </div>

        <div class="card">
            <h3>${t("lin2x2_type5")}</h3>
            <p>
\\( \\begin{aligned} ${eq5a} \\\\ ${eq5b} \\end{aligned} \\)
            </p>
        </div>

        <button id="exportLatexBtn" class="btn-mode">Export LaTeX</button>
    `;

    // ==========================================
    // LATEX pentru export (cu soluție comentată)
    // ==========================================
    const latex = `
\\section*{${t("lin2x2_title")}}

\\begin{enumerate}

\\item
\\[
\\begin{aligned}
${eq1a} \\\\
${eq1b}
\\end{aligned}
\\]
% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq2a} \\\\
${eq2b}
\\end{aligned}
\\]
% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq3a} \\\\
${eq3b}
\\end{aligned}
\\]
% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq4a} \\\\
${eq4b}
\\end{aligned}
\\]
% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq5a} \\\\
${eq5b}
\\end{aligned}
\\]
% Soluție: ${solStr}

\\end{enumerate}
`;

    return { html, latex };
}
