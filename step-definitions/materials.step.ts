import { Given, Then, When } from "@cucumber/cucumber";
import { assert } from "chai";

import { Material } from "../src/material";
import { Color } from "../src/geomatry/color";

import { position } from "./lights.step";
import { Vector } from "../src/geomatry/vector";
import { PointLight } from "../src/light";
import { Point } from "../src/geomatry/point";

var m: Material

Given('m ← material\\()', function () {
  m = new Material()
})

Then('m.color = color\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = m.color
  let expected = new Color(float, float2, float3)

  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('m.ambient = {float}', function (float) {
  let actual = m.ambient
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

Then('m.diffuse = {float}', function (float) {
  let actual = m.diffuse
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

Then('m.specular = {float}', function (float) {
  let actual = m.specular
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})


Then('m.shininess = {float}', function (float) {
  let actual = m.shininess
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

Then('m.reflective = {float}', function (float) {
  let actual = m.reflective
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

Then('m.transparency = {float}', function (float) {
  let actual = m.transparency
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

Then('m.refractive_index = {float}', function (float) {
  let actual = m.refractiveIndex
  let expected = float

  assert(actual == expected, `${actual} != ${expected}`)
})

var eyev: Vector

Given('eyev ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  eyev = new Vector(float, float2, float3)
})

var normalv: Vector

Given('normalv ← vector\\({float}, {float}, {float})', function (float, float2, float3) {
  normalv = new Vector(float, float2, float3)
})

var light: PointLight

Given('light ← point_light\\(point\\({float}, {float}, {float}), color\\({float}, {float}, {float}))', function (float, float2, float3, float4, float5, float6) {
  light = new PointLight(new Point(float, float2, float3), new Color(float4, float5, float6))
})

var result: Color

When('result ← lighting\\(m, light, position, eyev, normalv)', function () {
  result = m.lighting(light, position, eyev, normalv)
})

Then('result = color\\({float}, {float}, {float})', function (float, float2, float3) {
  let actual = result
  let expected = new Color(float, float2, float3)

  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})
