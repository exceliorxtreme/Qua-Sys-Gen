// systems/linearSystems.js
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

function validateInput(X, Y, Z) {
    const absX = Math.abs(X.num / X.den);
    const absY = Math.abs(Y.num / Y.den);
    const absZ = Math.abs(Z.num / Z.den);

    if (absX > 20 || absY > 20 || absZ > 20) {
        return {
            valid: false,
            error: "Soluțiile trebuie să fie în intervalul [-20, 20]."
        };
    }
    return { valid: true };
}

function fmtLead(coef, text) {
    if (coef === 0) return "";
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

export function generateLinearSystems(X, Y, Z){

    const validation = validateInput(X, Y, Z);
    if (!validation.valid) {
        const html = `
            <h2>${t("lin3x3_title")}</h2>
            <div class="card error">
                <p>⚠️ ${validation.error}</p>
            </div>
        `;
        return { html, latex: "", error: validation.error };
    }

    const solStr = `(${toStringR(X)}, ${toStringR(Y)}, ${toStringR(Z)})`;

    // ============================================================
    // SISTEM 1 — Random simplu
    // ============================================================
    const a1 = pickCoef(), b1 = pickCoef(), c1 = pickCoef();
    const d1 = pickCoef(), e1c = pickCoef(), f1 = pickCoef();   // e1 -> e1c
    const g1 = pickCoef(), h1 = pickCoef(), i1 = pickCoef();

    const D1_1 = normalize(add(add(mul(make(a1,1), X), mul(make(b1,1), Y)), mul(make(c1,1), Z)));
    const D1_2 = normalize(add(add(mul(make(d1,1), X), mul(make(e1c,1), Y)), mul(make(f1,1), Z))); // e1c
    const D1_3 = normalize(add(add(mul(make(g1,1), X), mul(make(h1,1), Y)), mul(make(i1,1), Z)));

    const eq1a = fmtLead(a1,"x") + fmtTerm(b1,"y") + fmtTerm(c1,"z") + " &= " + toStringR(D1_1);
    const eq1b = fmtLead(d1,"x") + fmtTerm(e1c,"y") + fmtTerm(f1,"z") + " &= " + toStringR(D1_2); // e1c
    const eq1c = fmtLead(g1,"x") + fmtTerm(h1,"y") + fmtTerm(i1,"z") + " &= " + toStringR(D1_3);

    // ============================================================
    // SISTEM 2 — Coeficienți jucați
    // ============================================================
    const a2 = pickCoef(), b2 = pickCoef(), c2 = pickCoef();
    const d2 = 2 - a2;
    const e2c = b2 - 2;          // e2 -> e2c
    const f2 = c2 + 1;

    const D2_1 = normalize(add(add(mul(make(a2,1), X), mul(make(b2,1), Y)), mul(make(c2,1), Z)));
    const D2_2 = normalize(add(add(mul(make(d2,1), X), mul(make(e2c,1), Y)), mul(make(f2,1), Z))); // e2c
    const D2_3 = normalize(add(add(mul(make(a2+d2,1), X), mul(make(b2-e2c,1), Y)), mul(make(c2+f2,1), Z))); // e2c

    const eq2a = fmtLead(a2,"x") + fmtTerm(b2,"y") + fmtTerm(c2,"z") + " &= " + toStringR(D2_1);
    const eq2b = fmtLead(d2,"x") + fmtTerm(e2c,"y") + fmtTerm(f2,"z") + " &= " + toStringR(D2_2); // e2c
    const eq2c = fmtLead(a2+d2,"x") + fmtTerm(b2-e2c,"y") + fmtTerm(c2+f2,"z") + " &= " + toStringR(D2_3); // e2c

    // ============================================================
    // SISTEM 3 — Coeficienți legați
    // ============================================================
    const a3 = pickCoef(), b3 = pickCoef(), c3 = pickCoef();
    const k3 = pickCoef();

    const a3p = a3 + k3;
    const b3p = b3 - k3;
    const c3p = c3 + 2*k3;

    const D3_1 = normalize(add(add(mul(make(a3,1), X), mul(make(b3,1), Y)), mul(make(c3,1), Z)));
    const D3_2 = normalize(add(add(mul(make(a3p,1), X), mul(make(b3p,1), Y)), mul(make(c3p,1), Z)));
    const D3_3 = normalize(add(add(mul(make(a3p-a3,1), X), mul(make(b3p-b3,1), Y)), mul(make(c3p-c3,1), Z)));

    const eq3a = fmtLead(a3,"x") + fmtTerm(b3,"y") + fmtTerm(c3,"z") + " &= " + toStringR(D3_1);
    const eq3b = fmtLead(a3p,"x") + fmtTerm(b3p,"y") + fmtTerm(c3p,"z") + " &= " + toStringR(D3_2);
    const eq3c = fmtLead(a3p-a3,"x") + fmtTerm(b3p-b3,"y") + fmtTerm(c3p-c3,"z") + " &= " + toStringR(D3_3);

    // ============================================================
    // SISTEM 4 — Module simple (PATCH FRACTII)
    // ============================================================
    const dXY = normalize(sub(X, Y));
    const absXY = make(Math.abs(dXY.num), dXY.den);

    const dYZ = normalize(sub(Y, Z));
    const absYZ = make(Math.abs(dYZ.num), dYZ.den);

    const dXZ = normalize(sub(X, Z));
    const absXZ = make(Math.abs(dXZ.num), dXZ.den);

    const p4 = pickCoef(), q4 = pickCoef(), r4 = pickCoef();
    const s4 = pickCoef(), t4 = pickCoef(), u4 = pickCoef();
    const v4 = pickCoef(), w4 = pickCoef(), z4 = pickCoef();

    const D4_1 = normalize(add(add(mul(make(p4,1), absXY), mul(make(q4,1), absYZ)), mul(make(r4,1), absXZ)));
    const D4_2 = normalize(add(add(mul(make(s4,1), absYZ), mul(make(t4,1), absXZ)), mul(make(u4,1), absXY)));
    const D4_3 = normalize(add(add(mul(make(v4,1), absXZ), mul(make(w4,1), absXY)), mul(make(z4,1), absYZ)));

    const eq4a = fmtLead(p4,"|x-y|") + fmtTerm(q4,"|y-z|") + fmtTerm(r4,"|x-z|") + " &= " + toStringR(D4_1);
    const eq4b = fmtLead(s4,"|y-z|") + fmtTerm(t4,"|x-z|") + fmtTerm(u4,"|x-y|") + " &= " + toStringR(D4_2);
    const eq4c = fmtLead(v4,"|x-z|") + fmtTerm(w4,"|x-y|") + fmtTerm(z4,"|y-z|") + " &= " + toStringR(D4_3);

    // ============================================================
    // SISTEM 5 — Module „răutăcioase” (PATCH FRACTII)
    // ============================================================
    const e1 = normalize(add(add(mul(make(2,1), X), mul(make(-1,1), Y)), Z));
    const abs1 = make(Math.abs(e1.num), e1.den);

    const e2 = normalize(add(add(X, mul(make(3,1), Y)), mul(make(-1,1), Z)));
    const abs2 = make(Math.abs(e2.num), e2.den);

    const e3 = normalize(add(add(X, mul(make(-2,1), Y)), mul(make(4,1), Z)));
    const abs3 = make(Math.abs(e3.num), e3.den);

    const p5 = pickCoef(), q5 = pickCoef(), r5 = pickCoef();
    const s5 = pickCoef(), t5 = pickCoef(), u5 = pickCoef();
    const v5 = pickCoef(), w5 = pickCoef(), z5 = pickCoef();

    const D5_1 = normalize(add(add(mul(make(p5,1), abs1), mul(make(q5,1), abs2)), mul(make(r5,1), abs3)));
    const D5_2 = normalize(add(add(mul(make(s5,1), abs2), mul(make(t5,1), abs3)), mul(make(u5,1), abs1)));
    const D5_3 = normalize(add(add(mul(make(v5,1), abs3), mul(make(w5,1), abs1)), mul(make(z5,1), abs2)));

    const eq5a = fmtLead(p5,"|2x-y+z|") + fmtTerm(q5,"|x+3y-z|") + fmtTerm(r5,"|x-2y+4z|") + " &= " + toStringR(D5_1);
    const eq5b = fmtLead(s5,"|x+3y-z|") + fmtTerm(t5,"|x-2y+4z|") + fmtTerm(u5,"|2x-y+z|") + " &= " + toStringR(D5_2);
    const eq5c = fmtLead(v5,"|x-2y+4z|") + fmtTerm(w5,"|2x-y+z|") + fmtTerm(z5,"|x+3y-z|") + " &= " + toStringR(D5_3);

    // ============================================================
    // HTML
    // ============================================================
    const html = `
        <h2>${t("lin3x3_title")}</h2>

        <div class="card">
            <h3>${t("lin3x3_type1")}</h3>
            <p>\\( \\begin{aligned} ${eq1a} \\\\ ${eq1b} \\\\ ${eq1c} \\end{aligned} \\)</p>
        </div>

        <div class="card">
            <h3>${t("lin3x3_type2")}</h3>
            <p>\\( \\begin{aligned} ${eq2a} \\\\ ${eq2b} \\\\ ${eq2c} \\end{aligned} \\)</p>
        </div>

        <div class="card">
            <h3>${t("lin3x3_type3")}</h3>
            <p>\\( \\begin{aligned} ${eq3a} \\\\ ${eq3b} \\\\ ${eq3c} \\end{aligned} \\)</p>
        </div>

        <div class="card">
            <h3>${t("lin3x3_type4")}</h3>
            <p>\\( \\begin{aligned} ${eq4a} \\\\ ${eq4b} \\\\ ${eq4c} \\end{aligned} \\)</p>
        </div>

        <div class="card">
            <h3>${t("lin3x3_type5")}</h3>
            <p>\\( \\begin{aligned} ${eq5a} \\\\ ${eq5b} \\\\ ${eq5c} \\end{aligned} \\)</p>
        </div>

        <button id="exportLatexBtn" class="btn-mode">Export LaTeX</button>
    `;

    // ============================================================
    // LATEX
    // ============================================================
    const latex = `
\\section*{${t("lin3x3_title")}}

\\begin{enumerate}

\\item
\\[
\\begin{aligned}
${eq1a} \\\\
${eq1b} \\\\
${eq1c}
\\end{aligned}
\\]


% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq2a} \\\\
${eq2b} \\\\
${eq2c}
\\end{aligned}
\\]


% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq3a} \\\\
${eq3b} \\\\
${eq3c}
\\end{aligned}
\\]


% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq4a} \\\\
${eq4b} \\\\
${eq4c}
\\end{aligned}
\\]


% Soluție: ${solStr}

\\item
\\[
\\begin{aligned}
${eq5a} \\\\
${eq5b} \\\\
${eq5c}
\\end{aligned}
\\]


% Soluție: ${solStr}

\\end{enumerate}
`;

    return { html, latex };
}
