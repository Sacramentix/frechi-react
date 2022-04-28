import type { Equation } from './type';
import { getSeriesAndResult } from "../equation/actions";

export const { series, result, equation } = getSeriesAndResult(5);

export const resultToFind = result;

export const hasWin = false;

export const equations:Equation[] = [{}];

export const calculteds:number[] = [];

export const numbers = series;

export const solution = equation;