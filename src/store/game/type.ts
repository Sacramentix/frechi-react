export enum MathSymbol {
    Plus = "+",
    Minus = "-",
    Multiply = "x",
    Divide = "/"
  }

export type Complete<T> = {
    [K in keyof T]-?: T[K];
}

export type Equation = {
    entry1?: number,
    symbol?: MathSymbol,
    entry2?: number,
    result?: number
}