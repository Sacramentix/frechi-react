import { getSeriesAndResult, solve } from "../equation/actions";
import type { AppContextType } from "./index";
import type { Complete, Equation, MathSymbol } from "./type";

export function reset(context:AppContextType) {
    const { series, result } = getSeriesAndResult(5);
    context.resultToFind = result;
    context.hasWin = false;
    context.equations = [{}];
    context.calculteds = [];
    context.numbers = series;
    const {actions, setStore, ...store} = context;
    context.setStore({...store});
}

export function onNumberClick(context:AppContextType, n:number, a:number[]) {
    const { equations } = context;
    const [e] = equations.slice(-1);
    if (e.symbol != null) {
        if (e.entry2 != null) a.push(e.entry2);
        e.entry2 = removeFrom(a, n);
        e.result = solveEquation(context, e as Complete<Equation>);
    } else {
        if (e.entry1 != null) a.push(e.entry1);
        e.entry1 = removeFrom(a, n);
    }
    const {actions, setStore, ...store} = context;
    context.setStore({...store});
}

export function onSymbolClick(context:AppContextType, s:MathSymbol) {
    const { equations } = context;
    const [e] = equations.slice(-1);
    if (e.entry1 != null) {
        e.symbol = s;
        if (e.entry2 != null) {
            e.result = solveEquation(context, e as Complete<Equation>);
        }
    }
    const {actions, setStore, ...store} = context;
    context.setStore({...store});
}

export function submitResult(context:AppContextType) {
    const { equations, calculteds } = context;
    const [e] = equations.slice(-1);
    if (e.result != null) {
        calculteds.push(e.result);
        equations.push({});
    }
    const {actions, setStore, ...store} = context;
    context.setStore({...store});
}

export function deleteEquation(context:AppContextType) {
    const { equations, calculteds, numbers, setStore } = context;
    const e = equations.pop();
    const copy = equations.slice();
    [e?.entry1, e?.entry2].forEach(i=>{
        if(i!=null) {
        const j = copy.findIndex(v=>v.result==i);
        if (j!=-1) {
            equations.splice(i,1);
            copy.splice(i,1);
            calculteds.push(i);
        } else {
            numbers.push(i);
        }
        }
    });
    const [l] = equations.slice(-1);
    if (l?.result != null) removeFrom(calculteds, l.result);
    if (equations.length == 0) equations.push({});
    const {actions, ...store} = context;
    context.setStore({...store});
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
    var { resultToFind } = context;
    const v = solve(e.entry1, e.symbol, e.entry2);
    context.hasWin = v==resultToFind;
    const {actions, setStore, ...store} = context;
    context.setStore({...store});
    return v;
}