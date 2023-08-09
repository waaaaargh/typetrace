import { Tuple, epsilon } from "./tuple";

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

  toString(): string {
    return `Vector { x: ${this.x}, y: ${this.y}, z: ${this.z}, w: ${this.w} }`
  }
}

export function isVector(t: Tuple): t is Vector {
  return t.w == 0
}
