import { Material } from "../material";
import { Matrix } from "./matrix";
import { Point } from "./point";
import { Ray } from "./ray";
import { Vector } from "./vector";

export type Intersections = [ ] | [ number ] | [ number, number ]

export abstract class GeometryObject {
  transform: Matrix
  material: Material

  constructor() {
    this.transform = Matrix.identity(4,4)
    this.material = new Material()
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
    let transformedRay = ray.transform(this.transform.invert())
    let spehreToRay = transformedRay.origin.subtract(this.center)
    let a = transformedRay.direction.dotproduct(transformedRay.direction)
    let b = 2 * transformedRay.direction.dotproduct(spehreToRay)
    let c = spehreToRay.dotproduct(spehreToRay) - 1

    let discriminant = Math.pow(b, 2) - ( 4 * a * c )

    if(discriminant < 0) {
      return []
    }

    let t1 = ( (-b) - Math.sqrt(discriminant) ) / ( 2 * a )
    let t2 = ( (-b) + Math.sqrt(discriminant) ) / ( 2 * a )
    return [t1, t2]
  }

  normal(point: Point): Vector {
    let object_point = this.transform.invert().multiplyTuple(point)
    let object_normal = object_point.subtract(new Point(0,0,0))
    let world_normal = this.transform.invert().transpose().multiplyTuple(object_normal)
    world_normal.w = 0
    return world_normal.normalize() as Vector
  }
}
