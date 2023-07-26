import { Tuple } from "./tuple";

export class Point extends Tuple {
  constructor(x: number,y: number,z: number) {
    super(x,y,z, 1.0)
  }
}

export function isPoint(t: Tuple): t is Point{
  return t.w == 1.0
}

