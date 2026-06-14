// core/utils.js
// Funcții de formatare și utilități

export function clean(eq){
    eq = eq.trim();
    if(eq.startsWith("+")) eq = eq.slice(1).trim();
    return eq;
}

export function fmtTerm(c, term){
    if(c === 0) return "";
    if(c === 1) return " + " + term;
    if(c === -1) return " - " + term;
    if(c > 0) return " + " + c + term;
    return " - " + Math.abs(c) + term;
}
