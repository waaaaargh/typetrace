import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { assert } from 'chai';

import { Axis, Matrix } from '../src/geomatry/matrix';

import { Intersections, Sphere } from '../src/geomatry/object';
import { r } from './rays.step';

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
