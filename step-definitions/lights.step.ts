import { Given, Then, When, World } from '@cucumber/cucumber';
import { assert } from 'chai';
import { Color } from '../src/geomatry/color';
import { Point } from '../src/geomatry/point';
import { PointLight } from '../src/light';

var intensity: Color

Given('intensity ← color\\({float}, {float}, {float})', function (float, float2, float3) {
  intensity = new Color(float, float2, float3)
})

export var position: Point

Given('position ← point\\({float}, {float}, {float})', function (float, float2, float3) {
  position = new Point(float, float2, float3)
})

export var light: PointLight

When('light ← point_light\\(position, intensity)', function () {
  light = new PointLight(position, intensity)
})

Then('light.position = position', function () {
  let actual = light.position
  let expected = position

  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})

Then('light.intensity = intensity', function () {
  let actual = light.intensity
  let expected = intensity

  assert(actual.isEqualTo(expected), `${actual} != ${expected}`)
})
