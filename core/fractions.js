// core/fractions.js

// Create normalized fraction
export function make(num, den){
    if(den === 0) throw "Zero division";
    const g = gcd(Math.abs(num), Math.abs(den));
    return { num: num/g, den: den/g };
}

// Addition
export function add(a, b){
    return make(a.num*b.den + b.num*a.den, a.den*b.den);
}

// Subtraction
export function sub(a, b){
    return make(a.num*b.den - b.num*a.den, a.den*b.den);
}

// Multiplication
export function mul(a, b){
    return make(a.num*b.num, a.den*b.den);
}

// Square
export function square(a){
    return make(a.num*a.num, a.den*a.den);
}

// Convert to string
export function toStringR(fr){
    return fr.den === 1 ? `${fr.num}` : `${fr.num}/${fr.den}`;
}

// Parse fraction from input
export function parseFraction(str){
    if(!str) return make(0,1);

    str = str.trim();

    if(str.includes("/")){
        const [p, q] = str.split("/").map(Number);
        return make(p, q);
    }

    return make(Number(str), 1);
}

// gcd helper
function gcd(a, b){
    while(b !== 0){
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}
