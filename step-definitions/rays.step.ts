import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';

import { Axis, Matrix } from '../src/geomatry/matrix';
import { Point } from '../src/geomatry/point';
import { Vector } from '../src/geomatry/vector';
import { Ray } from '../src/geomatry/ray';

export var r: Ray
var origin: Point
var direction: Vector

Given('r ← ray\\(point\\({float}, {float}, {float}), vector\\({float}, {float}, {float}))', function (float, float2, float3, float4, float5, float6) {
  r = new Ray(
    new Point(float, float2, float3),
    new Vector(float4, float5, float6)
  )
})

Given('origin ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  origin = new Point(float, float2, float3)
})

Given('direction ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  direction = new Vector(float, float2, float3)
})

When('r ← ray\\(origin, direction)', function () {
  r = new Ray(origin, direction)
})

Then('r.origin = origin', function () {
  let actual = r.origin
  let expected = origin
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('r.direction = direction', function () {
  let actual = r.direction
  let expected = direction
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('position\\(r, {float}) = point\\({float}, {float}, {float})', function (float, float2, float3, float4) {
  let actual = r.position(float)
  let expected = new Point(float2, float3, float4)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

export var m: Matrix

Given('m ← translation\\({float}, {float}, {float})', function (float, float2, float3) {
  m = Matrix.translation(float, float2, float3)
})


var r2: Ray

When('r2 ← transform\\(r, m)', function () {
  r2 = r.transform(m)
})

Then('r2.origin = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = r2.origin
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('r2.direction = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = r2.direction
  let expected = new Vector(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Given('m ← scaling\\({float}, {float}, {float})', function (float, float2, float3) {
  m = Matrix.scaling(float, float2, float3)
})
