import { Tuple } from "./tuple";

export class Color extends Tuple {
  constructor(r: number, g: number, b: number) {
    super(r, g, b, 0);
  }

  get red(): number {
    return this.x
  }

  get green(): number {
    return this.y
  }

  get blue(): number {
    return this.z
  }

  isColor(t: Tuple): t is Color {
    return t.w == 0
  }
}
