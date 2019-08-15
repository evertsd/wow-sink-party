export type Model = [number, number, number];

export const toString = ([red, green, blue]: Model, alpha: number = 1) =>
  `rgba(${red}, ${green}, ${blue}, ${alpha})`
