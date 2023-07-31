import { Given, Then, World } from '@cucumber/cucumber';

import { Tuple } from '../src/geomatry/tuple';
import { assert } from 'chai';
import { Point, isPoint } from '../src/geomatry/point';
import { Vector, isVector } from '../src/geomatry/vector';
import { Color } from '../src/geomatry/color';

var a: Tuple

Given('a ← tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  a = new Tuple(float, float2, float3, float4);
});

Then('a.x = {float}', function(ax: number) {
  assert(a.x == ax)
});

Then('a.y = {float}', function(ay: number) {
  assert(a.y == ay)
});

Then('a.z = {float}', function(az: number) {
  assert(a.z == az)
});

Then('a.w = {float}', function(aw: number) {
  assert(a.w == aw)
});

Then('a is a point', function() {
  assert(isPoint(a))
});

Then('a is not a point', function() {
  assert(!isPoint(a))
});

Then('a is a vector', function() {
  assert(isVector(a))
});

Then('a is not a vector', function() {
  assert(!isVector(a))
});

var p: Point

Given('p ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  p = new Point(float, float2, float3);
})

Then('p = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  let t = new Tuple(float, float2, float3, float4)
  assert((p as Tuple).isEqualTo(t))
})

var v: Vector

Given('v ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  v = new Vector(float, float2, float3);
})

Then('v = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  let t = new Tuple(float, float2, float3, float4)
  assert((v as Tuple).isEqualTo(t))
})

var a1: Tuple, a2: Tuple

Given('a1 ← tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  a1 = new Tuple(float, float2, float3, float4)
});

Given('a2 ← tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  a2 = new Tuple(float, float2, float3, float4)
});

Then('a1 + a2 = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  let t = new Tuple(float, float2, float3, float4)
  assert((a1.add(a2)).isEqualTo(t))
})

var p1: Point, p2: Point

Given('p1 ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  p1 = new Point(float, float2, float3)
})

Given('p2 ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  p2 = new Point(float, float2, float3)
})

Then('p1 - p2 = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let p1minusp2: Vector = p1.subtract(p2) as Vector
  let v = new Vector(float, float2, float3)
  assert(isVector(p1minusp2))
  assert((p1minusp2).isEqualTo(v))
})

Then('p - v = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let res = new Point(float, float2, float3)
  let pminusv: Point = p.subtract(v)
  assert(pminusv.isEqualTo(res))
})

var v1: Vector, v2: Vector

Given('v1 ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  v1 = new Vector(float, float2, float3)
})

Given('v2 ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  v2 = new Vector(float, float2, float3)
})

Then('v1 - v2 = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let v1minusv2 = v1.subtract(v2)
  assert(v1minusv2.isEqualTo(new Vector(float, float2, float3)))
})

var zero: Vector

Given('zero ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  zero = new Vector(float, float2, float3)
})

Then('zero - v = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let zerominusv = zero.subtract(v)
  assert(zerominusv.isEqualTo(new Vector(float, float2, float3)))
})

Then('-a = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  let atimesminusone = a.multiply(-1)
  assert((atimesminusone as Tuple).isEqualTo(new Tuple(float, float2, float3, float4)))
});

Then('a * {float} = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4, float5) {
  assert((a.multiply(float).isEqualTo(new Tuple(float2, float3, float4, float5))))
});

Then('a \\/ {float} = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4, float5) {
  assert((a.divide(float).isEqualTo(new Tuple(float2, float3, float4, float5))))
})

Then('magnitude\\(v) = {float}', function (float) {
  assert(v.magnitude() == float)
});

Then('magnitude\\(v) = √{float}', function (float) {
  assert(v.magnitude() == Math.sqrt(float), `${v.magnitude()}, ${Math.sqrt(float)}`)
});

Then('normalize\\(v) = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  assert(v.normalize().isEqualTo(new Vector(float, float2, float3)))
})

Then('normalize\\(v) = approximately vector\\({float}, {float}, {float})', function (float, float2, float3) {
  assert(v.normalize().isEqualTo(new Vector(float, float2, float3)))
});

var av: Vector
var bv: Vector

Given('a ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  av = new Vector(float, float2, float3)
})

Given('b ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  bv = new Vector(float, float2, float3)
})

Then('dot\\(a, b) = {float}', function (float) {
  assert(av.dotproduct(bv) == float)
})

Then('cross\\(a, b) = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  assert(av.crossproduct(bv).isEqualTo(new Vector(float, float2, float3)))
})

Then('cross\\(b, a) = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  assert(bv.crossproduct(av).isEqualTo(new Vector(float, float2, float3)))
})

var c: Color

Given('c ← color\\({float}, {float}, {float})', function (float, float2, float3) {
  c = new Color(float, float2, float3);
});

Then('c.red = {float}', function (float) {
  assert(c.red  == float)
});

Then('c.green = {float}', function (float) {
  assert(c.green == float)
});

Then('c.blue = {float}', function (float) {
  assert(c.blue == float)
});

var c1: Color, c2: Color

Given('c1 ← color\\({float}, {float}, {float})', function (float, float2, float3) {
  c1 = new Color(float, float2, float3)
});

Given('c2 ← color\\({float}, {float}, {float})', function (float, float2, float3) {
  c2 = new Color(float, float2, float3)
});

Then('c1 - c2 = color\\({float}, {float}, {float})', function (float, float2, float3) {
  assert((c1.subtract(c2)).isEqualTo(new Color(float, float2, float3)), `${c1.subtract(c2) as Color} != ${new Color(float, float2, float3)}`)
});

Then('c1 + c2 = color\\({float}, {float}, {float})', function (float, float2, float3) {
  assert((c1.add(c2)).isEqualTo(new Color(float, float2, float3)), `${c1.add(c2) as Color} != ${new Color(float, float2, float3)}`)
});

Then('c * {float} = color\\({float}, {float}, {float})', function (float, float2, float3, float4) {
  assert((c.multiply(float)).isEqualTo(new Color(float2, float3, float4)), `${c.multiply(float) as Color} != ${new Color(float2, float3, float4)}`)
});

Then('c1 * c2 = color\\({float}, {float}, {float})', function (float, float2, float3) {
  assert(c1.schurproduct(c2).isEqualTo(new Color(float, float2, float3)), `${c1.schurproduct(c2) as Color} != ${new Color(float, float2, float3)}`)
});

