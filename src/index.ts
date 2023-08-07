import { Axis, Matrix } from "./geomatry/matrix"
import { Point } from "./geomatry/point"
import { Vector } from "./geomatry/vector"

function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.fillRect(point.x, point.y, 1, 1)
}

function drawClock(ctx: CanvasRenderingContext2D) {
  let center = new Point(400, 300, 0)
  let r = 200

  drawPoint(ctx, center)

  let v12 = new Vector(0, -1 * r, 0)
  for(let i=0; i<12; i++) {
    let t = Matrix.rotation(Axis.Z, i * ( (2 * Math.PI ) / 12) )
    drawPoint(ctx, center.add(t.multiplyTuple(v12)))
  }

}

window.onload = function() {
  let button = document.getElementById('renderbutton')

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

  drawClock(ctx)
}
