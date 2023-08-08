import { Matrix } from "./matrix";
import { Point } from "./point";
import { Ray } from "./ray";

export type Intersections = [ ] | [ number ] | [ number, number ]

export abstract class GeometryObject {
  transform: Matrix

  constructor() {
    this.transform = Matrix.identity(4,4)
  }

  abstract intersect(ray: Ray): Intersections
}

export class Sphere extends GeometryObject {
  center: Point
  radius: number

  constructor(center: Point = new Point(0,0,0), radius: number = 1) {
    super()
    this.center = center
    this.radius = radius
  }

  intersect(ray: Ray): Intersections {
    let spehreToRay = ray.origin.subtract(this.center)
    let a = ray.direction.dotproduct(ray.direction)
    let b = 2 * ray.direction.dotproduct(spehreToRay)
    let c = spehreToRay.dotproduct(spehreToRay) - 1

    let discriminant = Math.pow(b, 2) - ( 4 * a * c )

    if(discriminant < 0) {
      return []
    }

    let t1 = ( (-b) - Math.sqrt(discriminant) ) / ( 2 * a )
    let t2 = ( (-b) + Math.sqrt(discriminant) ) / ( 2 * a )
    return [t1, t2]
  }
}
