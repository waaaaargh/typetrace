import { Color } from "./geomatry/color";
import { Point } from "./geomatry/point";

export class PointLight {
  position: Point
  intensity: Color

  constructor(position: Point, intensity: Color) {
    this.position = position
    this.intensity = intensity
  }
}
