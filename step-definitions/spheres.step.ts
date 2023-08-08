import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';

import { Axis, Matrix } from '../src/geomatry/matrix';

import { Intersections, Sphere } from '../src/geomatry/object';
import { Vector } from '../src/geomatry/vector';
import { Point } from '../src/geomatry/point';

import { r } from './rays.step';
import { Material } from '../src/material';

var s: Sphere
var xs: Intersections

Given('s ← sphere\\()', function () {
  s = new Sphere()
});

When('xs ← intersect\\(s, r)', function () {
  xs = s.intersect(r)
})

Then('xs.count = {int}', function (int) {
  assert(xs.length == int, `${xs.length} != ${int}`)
})

Then('xs[{int}] = {float}', function (int, float) {
  assert(xs[int] == float, `${xs[int]} != ${float}`)
})

Then('s.transform = identity_matrix', function () {
  let actual = s.transform
  let expected = Matrix.identity(4,4)

  assert(actual.isEqual(expected), `${actual} != ${expected}`)
})

var t: Matrix

Given('t ← translation\\({float}, {float}, {float})', function (float, float2, float3) {
  t = Matrix.translation(float, float2, float3)
})

When('set_transform\\(s, t)', function () {
  s.transform = t
})

Then('s.transform = t', function () {
  let actual = s.transform
  let expected = t

  assert(actual.isEqual(expected), `${actual} != ${expected}`)
})

When('set_transform\\(s, scaling\\({float}, {float}, {float}))', function (float, float2, float3) {
  s.transform = Matrix.scaling(float, float2, float3)
})

Then('xs[{int}].t = {float}', function (int, float) {
  let actual = xs[int]
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

When('set_transform\\(s, translation\\({float}, {float}, {float}))', function (float, float2, float3) {
  s.transform = Matrix.translation(float, float2, float3)
})

var n: Vector

When('n ← normal_at\\(s, point\\({float}, {float}, {float}))', function (float, float2, float3) {
  n = s.normal(new Point(float, float2, float3))
})

Then('n = vector\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = n
  let expected = new Vector(float, float2, float3)

  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

var m: Matrix

Given('m ← scaling\\({float}, {float}, {float}) * rotation_z\\(π\\/{float})', function (float, float2, float3, float4) {
  m = Matrix.scaling(float, float2, float3).multiplyMatrix(Matrix.rotation(Axis.Z, Math.PI / float4))
})

Given('set_transform\\(s, m)', function () {
  s.transform = m
})

Then('n = normalize\\(n)', function () {
  n = n.normalize() as Vector
})

var mmat: Material

When('m ← s.material', function () {
  mmat = s.material
})

Then('m = material\\()', function () {
  let actual = mmat
  let expected = new Material()

  assert(JSON.stringify(actual) == JSON.stringify(expected), `${actual} != ${expected}`)
})

Given('m.ambient ← {float}', function (float) {
  mmat.ambient = float
})

When('s.material ← m', function () {
  s.material = mmat
})

Then('s.material = m', function () {
  let actual = s.material
  let expected = mmat

  assert(JSON.stringify(actual) == JSON.stringify(expected), `${actual} != ${expected}`)
})
