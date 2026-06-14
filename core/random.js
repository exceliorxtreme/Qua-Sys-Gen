// core/random.js
// Random utilities

// pick a random element from a list
export function rnd(list){
    return list[Math.floor(Math.random() * list.length)];
}

// random integer between min and max
export function rndInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
