import { Color } from "./geomatry/color"
import { Axis, Matrix } from "./geomatry/matrix"
import { GeometryObject, Sphere } from "./geomatry/object"
import { Point } from "./geomatry/point"
import { Ray } from "./geomatry/ray"
import { Vector } from "./geomatry/vector"
import { PointLight } from "./light"

function drawSphere(ctx: CanvasRenderingContext2D) {
  const sphere = new Sphere()
  sphere.material.color = new Color(1, 0.2, 1)

  let light = new PointLight(
    new Point(-10, -10, -10),
    new Color(1,1,1)
  )

  let camera = new Point(0, 0, -10)

  for(let i=0; i<800; i++) {
    for(let j=0; j<600; j++) {
      let target = new Point((j-300)/100, (i-400)/100, 10)
      let ray = new Ray(
        camera,
        target.subtract(camera).normalize() as Vector
      )

      let xs = sphere.intersect(ray)

      if(xs.length == 0) {
        ctx.fillStyle = "#000000"
        ctx.fillRect(i, j, 1, 1)
        continue
      }

      let hitPoint = camera.add(ray.direction.multiply(xs[0]))
      let normal = sphere.normal(hitPoint)
      let eye = ray.direction.multiply(-1) as Vector
      let color = sphere.material.lighting(light, hitPoint, eye, normal) as Color
      ctx.fillStyle = `rgb(${Math.floor(color.x * 255)}, ${Math.floor(color.y * 255)}, ${Math.floor(color.z * 255)})`
      console.log(ctx.fillStyle)

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
