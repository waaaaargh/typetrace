import { Tuple } from "./tuple";

export class Vector extends Tuple{
  constructor(x: number,y: number,z: number) {
    super(x,y,z, 0.0)
  }

  crossproduct(t: Vector): Vector {
    return new Vector(
      this.y * t.z - this.z * t.y,
      this.z * t.x - this.x * t.z,
      this.x * t.y - this.y * t.x
    )
  }

  reflect(n: Vector): Vector {
    return this.subtract(n.multiply(2).multiply(this.dotproduct(n))) as Vector
  }
}

export function isVector(t: Tuple): t is Vector {
  return t.w == 0.0
}
