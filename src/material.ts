import { Color } from "./geomatry/color";
import { Point } from "./geomatry/point";
import { Vector, isVector } from "./geomatry/vector";
import { PointLight } from "./light";

export class Material {
  color: Color
  ambient: number
  diffuse: number
  specular: number
  shininess: number
  reflective: number
  transparency: number
  refractiveIndex: number

  constructor() {
    this.color = new Color(1,1,1)
    this.ambient = 0.1
    this.diffuse = 0.9
    this.specular = 0.9
    this.shininess = 200.0
    this.reflective = 0.0
    this.transparency = 0.0
    this.refractiveIndex = 1.0
  }

  lighting(light: PointLight, position: Point, eyeVector: Vector, normalVector: Vector): Color {
    let effectiveColor = this.color.schurproduct(light.intensity)
    let lightVector = light.position.subtract(position).normalize() as Vector

    let ambient = effectiveColor.multiply(this.ambient)
    let diffuse = new Color(0, 0, 0)
    let specular = new Color(0, 0, 0)

    const lightDotNormal = lightVector.dotproduct(normalVector)

    if(lightDotNormal >= 0) {
      diffuse = effectiveColor.multiply(this.diffuse).multiply(lightDotNormal) as Color

      let reflectVector = lightVector.multiply(-1).reflect(normalVector)
      let reflectDotEye = reflectVector.dotproduct(eyeVector)

      if(reflectDotEye > 0) {
        let factor = Math.pow(reflectDotEye, this.shininess)
        specular = light.intensity.multiply(this.specular * factor) as Color
      }
    }

    return ambient.add(diffuse).add(specular) as Color
  }

}
