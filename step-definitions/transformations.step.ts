import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';

import { Axis, Matrix } from '../src/geomatry/matrix';

import { p } from './tuples.steps';
import { v } from './tuples.steps';
import { Point } from '../src/geomatry/point';
import { Vector } from '../src/geomatry/vector';

var transform: Matrix

Given('transform ← translation\\({float}, {float}, {float})', function (float, float2, float3) {
  transform = Matrix.translation(float, float2, float3)
});

Then('transform * p = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = transform.multiplyTuple(p)
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(new Point(float, float2, float3)), `${actual} != ${expected}`)
})

var inv: Matrix

Given('inv ← inverse\\(transform)', function () {
  inv = transform.invert()
})

Then('inv * p = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = inv.multiplyTuple(p)
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('transform * v = v', function () {
  let actual = transform.multiplyTuple(v)
  let expected = v
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Given('transform ← scaling\\({float}, {float}, {float})', function (float, float2, float3) {
  transform = Matrix.scaling(float, float2, float3)
})

Then('transform * v = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = transform.multiplyTuple(v)
  let expected = new Vector(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('inv * v = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = inv.multiplyTuple(v)
  let expected = new Vector(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

var half_quarter: Matrix
Given('half_quarter ← rotation_{word}\\(π \\/ 4)', function(axisString: string) {
  var axis: Axis

  switch(axisString) {
    case "x": {
      axis = Axis.X
      break
    }
    case "y": {
      axis = Axis.Y
      break
    }
    case "z": {
      axis = Axis.Z
      break
    }
    default: {
      axis = Axis.X
      break
    }

   }

  half_quarter = Matrix.rotation(axis, Math.PI / 4.0)
})


var full_quarter: Matrix
Given('full_quarter ← rotation_{word}\\(π \\/ 2)', function(axisString: string) {
  var axis: Axis

  switch(axisString) {
    case "x": {
      axis = Axis.X
      break
    }
    case "y": {
      axis = Axis.Y
      break
    }
    case "z": {
      axis = Axis.Z
      break
    }
    default: {
      axis = Axis.X
      break
    }

   }

  full_quarter = Matrix.rotation(axis, Math.PI / 2.0)
})


Given('inv ← inverse\\(half_quarter)', function () {
  inv = half_quarter.invert()
})

Then('half_quarter * p = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = half_quarter.multiplyTuple(p)
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('full_quarter * p = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = full_quarter.multiplyTuple(p)
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Given('transform ← shearing\\({float}, {float}, {float}, {float}, {float}, {float})', function (float, float2, float3, float4, float5, float6) {
  transform = Matrix.shearing(float, float2, float3, float4, float5, float6)
})

var A: Matrix

Given('A ← rotation_x\\(π \\/ 2)', function () {
  A = Matrix.rotation(Axis.X, Math.PI / 2.0)
})

var B: Matrix

Given('B ← scaling\\({float}, {float}, {float})', function (float, float2, float3) {
  B = Matrix.scaling(float, float2, float3)
})

var C: Matrix

Given('C ← translation\\({float}, {float}, {float})', function (float, float2, float3) {
  C = Matrix.translation(float, float2, float3)
})

var p2: Point

When('p2 ← A * p', function () {
  p2 = A.multiplyTuple(p)
})

Then('p2 = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let expected = new Point(float, float2, float3)
  let actual = p2
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

var p3: Point

When('p3 ← B * p2', function () {
  p3 = B.multiplyTuple(p2)
})

 Then('p3 = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = p3
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
 })

var p4: Point
When('p4 ← C * p3', function () {
  p4 = C.multiplyTuple(p3)
})

Then('p4 = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = p4
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

var T: Matrix
When('T ← C * B * A', function () {
  T = C.multiplyMatrix(B).multiplyMatrix(A)
})

Then('T * p = point\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = T.multiplyTuple(p)
  let expected = new Point(float, float2, float3)
  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

var Pfrom: Point
Given('from ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  Pfrom = new Point(float, float2, float3)
})

var Pto: Point
Given('to ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  Pto = new Point(float, float2, float3)
})

var up: Vector

Given('up ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  up = new Vector(float, float2, float3)
})
