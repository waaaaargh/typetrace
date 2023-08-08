import { Axis, Matrix } from "./geomatry/matrix"
import { GeometryObject, Sphere } from "./geomatry/object"
import { Point } from "./geomatry/point"
import { Ray } from "./geomatry/ray"
import { Vector } from "./geomatry/vector"

function drawSphere(ctx: CanvasRenderingContext2D) {
  const sphere = new Sphere()
  sphere.transform = Matrix.shearing(1, 0, 0, 0, 0, 0)
  const lightsource = new Point(0, 0, -15)

  for(let i=0; i<800; i++) {
    for(let j=0; j<600; j++) {
      let target = new Point((j-300)/100, (i-400)/100, 10)
      let ray = new Ray(
        lightsource,
        target.subtract(lightsource) as Vector
      )

      let transformed_ray = ray.transform((sphere as GeometryObject).transform)

      let xs = sphere.intersect(transformed_ray)
      if(xs.length == 0) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(i, j, 1, 1)
        continue
      }

      ctx.fillStyle = "#ff0000"
      ctx.fillRect(i, j, 1, 1)
    }
  }

  console.log("done");
}

function renderButtonPressed() {
  let canvas = document.getElementById('mycanvas') as HTMLCanvasElement
  if(canvas == null) {
    console.error("error getting canvas element")
    return
  }

  let ctx = canvas.getContext('2d');
  if (ctx == null) {
    console.error("error getting canvas context")
    return
  }

  drawSphere(ctx)
}

window.onload = function() {
  let button = document.getElementById('renderbutton') as HTMLButtonElement

  button.onclick = renderButtonPressed
}
