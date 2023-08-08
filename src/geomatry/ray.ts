import { Matrix } from "./matrix";
import { Point } from "./point";
import { Vector } from "./vector";

export class Ray {
  origin: Point
  direction: Vector

  constructor(origin: Point, direction: Vector) {
    this.origin = origin
    this.direction = direction
  }

  position(t: number) {
    return this.origin.add(this.direction.multiply(t))
  }

  transform(m: Matrix): Ray {
    return new Ray(
      m.multiplyTuple(this.origin) as Point,
      m.multiplyTuple(this.direction) as Vector
    )
  }
}
