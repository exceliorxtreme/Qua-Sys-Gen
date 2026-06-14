// core/engine.js
// Motorul matematic simbolic

export function gcd(a,b){
    return b ? gcd(b, a%b) : a;
}

export function make(num, den){
    let g = gcd(Math.abs(num), Math.abs(den));
    return { num: num/g, den: den/g };
}

export function add(a,b){
    return make(a.num*b.den + b.num*a.den, a.den*b.den);
}

export function sub(a,b){
    return make(a.num*b.den - b.num*a.den, a.den*b.den);
}

export function mul(a,b){
    return make(a.num*b.num, a.den*b.den);
}

export function div(a,b){
    return make(a.num*b.den, a.den*b.num);
}

export function square(a){
    return make(a.num * a.num, a.den * a.den);
}

export function toStringR(r){
    return r.den === 1 ? `${r.num}` : `${r.num}/${r.den}`;
}

export function normalize(frac){
    if (frac.den < 0){
        return make(-frac.num, -frac.den);
    }
    if (frac.num === 0){
        return make(0, 1);
    }
    return frac;
}


