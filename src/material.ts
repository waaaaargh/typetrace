import { Color } from "./geomatry/color";

export class Material {
  color: Color
  ambient: number
  diffuse: number
  specular: number
  shininess: number


  constructor() {
    this.color = new Color(1,1,1)
    this.ambient = 0.1
    this.diffuse = 0.9
    this.specular = 0.9
    this.shininess = 200.0
  }

}
