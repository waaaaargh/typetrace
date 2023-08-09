import { Vector } from "./vector";

export const epsilon: number = 0.00001

export class Tuple {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  isEqualTo(t: Tuple): boolean {
    return ( Math.abs(this.x - t.x) < epsilon ) &&
      ( Math.abs(this.y - t.y) < epsilon ) &&
      ( Math.abs(this.z - t.z) < epsilon ) &&
      ( Math.abs(this.w - t.w) < epsilon )
  }

  add(t: Tuple): Tuple {
    return new Tuple(
      this.x + t.x,
      this.y + t.y,
      this.z + t.z,
      this.w + t.w
    )
  }

  subtract(t: Tuple): Tuple {
    return new Tuple(
      this.x - t.x,
      this.y - t.y,
      this.z - t.z,
      this.w - t.w
    )
  }

  multiply(scale: number): Tuple {
    return new Tuple(
      this.x * scale,
      this.y * scale,
      this.z * scale,
      this.w * scale
    )
  }

  divide(scale:  number): Tuple {
    return this.multiply((1 / scale))
  }

  magnitude(): number {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2) + Math.pow(this.w, 2))
  }

  normalize(): Tuple {
    return this.divide(this.magnitude())
  }

  dotproduct(t: Tuple): number {
    return this.x * t.x + this.y * t.y + this.z * t.z + this.w * this.z
  }

  schurproduct(t: Tuple): Tuple {
    return new Tuple(this.x * t.x, this.y * t.y, this.z * t.z, this.w * t.w)
  }

  reflect(n: Vector): Vector {
    return this.subtract(n.multiply(2).multiply(this.dotproduct(n))) as Vector
  }

  public toString(): string {
    return `Tuple(${this.x}, ${this.y}, ${this.z}, ${this.w})`
  }
}
