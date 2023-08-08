import { Given, Then } from "@cucumber/cucumber";
import { assert } from "chai";

import { Material } from "../src/material";
import { Color } from "../src/geomatry/color";

import { position, light } from "./lights.step";

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
