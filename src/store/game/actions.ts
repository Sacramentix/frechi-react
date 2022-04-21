import { getSeriesAndResult, solve } from "../equation/actions";
import type { AppContextType } from "./index";
import type { Complete, Equation, MathSymbol } from "./type";

export function reset(context:AppContextType) {
    const { store, setStore } = context;
    const { series, result } = getSeriesAndResult(5);
    store.resultToFind = result;
    store.hasWin = false;
    store.equations = [{}];
    store.calculteds = [];
    store.numbers = series;
    context.setStore(JSON.parse(JSON.stringify(context.store)));
}

export function onNumberClick(context:AppContextType, n:number, a:number[]) {
    const { store, setStore } = context;
    const [e] = store.equations.slice(-1);
    if (e.symbol != null) {
        if (e.entry2 != null) a.push(e.entry2);
        e.entry2 = removeFrom(a, n);
        e.result = solveEquation(context, e as Complete<Equation>);
    } else {
        if (e.entry1 != null) a.push(e.entry1);
        e.entry1 = removeFrom(a, n);
    }
    context.setStore(JSON.parse(JSON.stringify(context.store)));
}

export function onSymbolClick(context:AppContextType, s:MathSymbol) {
    const { store, setStore } = context;
    const [e] = store.equations.slice(-1);
    if (e.entry1 != null) {
        e.symbol = s;
        if (e.entry2 != null) {
            e.result = solveEquation(context, e as Complete<Equation>);
        }
    }
    context.setStore(JSON.parse(JSON.stringify(context.store)));
}

export function submitResult(context:AppContextType) {
    const { store, setStore } = context;
    const [e] = store.equations.slice(-1);
    if (e.result != null) {
        store.calculteds.push(e.result);
        store.equations.push({});
    }
    context.setStore(JSON.parse(JSON.stringify(context.store)));
}

export function deleteEquation(context:AppContextType) {
    const { store, setStore } = context;
    const e = store.equations.pop();
    const copy = store.equations.slice();
    [e?.entry1, e?.entry2].forEach(i=>{
        if(i!=null) {
        const j = copy.findIndex(v=>v.result==i);
        if (j!=-1) {
            store.equations.splice(i,1);
            copy.splice(i,1);
            store.calculteds.push(i);
        } else {
            store.numbers.push(i);
        }
        }
    });
    const [l] = store.equations.slice(-1);
    if (l?.result != null) removeFrom(store.calculteds, l.result);
    if (store.equations.length == 0) store.equations.push({});
    context.setStore(JSON.parse(JSON.stringify(context.store)));
}

export function removeFrom(a:number[], n:number):number {
    const index = a.indexOf(n);
    if (index > -1) return a.splice(index, 1)[0];
    return -1;
}

export function n(n?:number | string) {
    return n != null ? n : ""
}

export function solveEquation(context:AppContextType, e:Complete<Equation>) {
    const { store, setStore } = context;
    const v = solve(e.entry1, e.symbol, e.entry2);
    store.hasWin = v==store.resultToFind;
    context.setStore(JSON.parse(JSON.stringify(context.store)));
    return v;
}