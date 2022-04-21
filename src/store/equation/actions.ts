import { MathSymbol } from "../game/type";

export function randomInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function ruledRandomInt() {
    switch (randomInt(0, 5)) {
        case 0: return randomInt(1,11);
        case 1: return randomInt(1,21);
        case 2: return randomInt(1,31);
        case 3: return randomInt(1,10)*5;
        case 4: return randomInt(1,5)*25;
    }
    return 1;
}

export function getSeries(n=5) {
    const series = []
    for (var i=0;i<n;i++) {
        series.push(ruledRandomInt());
    }
    return series;
}

export const mathSymbols = [MathSymbol.Plus, MathSymbol.Minus, MathSymbol.Multiply, MathSymbol.Divide];

export function getRandomResult(series:number[]) {
  if (series.length < 1) return 0;
  const copy = shuffle(series.slice());
  var result = copy.pop()!;
  while (copy.length != 0) {
    const symbols = mathSymbols.slice();
    const n = copy.pop()!;
    if (n>=result) symbols.splice(1,1);
    if (result % n != 0) symbols.pop();
    result = solve(result, symbols[randomInt(0,symbols.length)],n);
  }
  return result;
}

export function getSeriesAndResult(n?:number) {
  const series = getSeries(n);
  const result = getRandomResult(series);
  return {
    series,
    result
  }
}

export function shuffle(array:number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


export function solve(entry1:number, symbol:MathSymbol, entry2:number) {
  switch (symbol) {
    case MathSymbol.Plus: return entry1 + entry2;
    case MathSymbol.Minus: return entry1 - entry2;
    case MathSymbol.Multiply: return entry1 * entry2;
    case MathSymbol.Divide: return entry1 / entry2;
  }
}
