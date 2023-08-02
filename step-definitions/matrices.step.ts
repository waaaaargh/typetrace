import { DataTable, Given, Then, World } from '@cucumber/cucumber';
import { assert } from 'chai';

import { Matrix } from '../src/geomatry/matrix';
import { Tuple } from '../src/geomatry/tuple';

var M: Matrix

Given('the following {int}x{int} matrix M:', function (m: number, n: number, dataTable: DataTable) {
  M = new Matrix(m, n);
  let numberRows = dataTable.raw().map(function(elem, i, data) {
    return elem.map(function(elem, i, data) {
      return parseFloat(elem)
    })
  })

  M.load(numberRows)
});

Then('M[{int},{int}] = {float}', function (m, n, float) {
  assert(M.getCell(m,n) == float, `${m}, ${n}: ${M.getCell(m, n)} != ${float}`)
})

var A: Matrix, B: Matrix

Given('the following matrix A:', function (dataTable: DataTable) {
  let numberRows = dataTable.raw().map(function(elem, i, data) {
    return elem.map(function(elem, i, data) {
      return parseFloat(elem)
    })
  })

  A = new Matrix(numberRows.length, numberRows[0].length)

  A.load(numberRows)
});

Given('the following matrix B:', function (dataTable: DataTable) {
  let numberRows = dataTable.raw().map(function(elem, i, data) {
    return elem.map(function(elem, i, data) {
      return parseFloat(elem)
    })
  })

  B = new Matrix(numberRows.length, numberRows[0].length)

  B.load(numberRows)
});

Then('A = B', function () {
  assert(A.isEqual(B))
});

Then('A != B', function () {
  assert(!A.isEqual(B))
});

Then('A * B is the following {int}x{int} matrix:', function (m, n, dataTable: DataTable) {
  let numberRows = dataTable.raw().map(function(elem, i, data) {
    return elem.map(function(elem, i, data) {
      return parseFloat(elem)
    })
  })

  let res = new Matrix(m, n)
  res.load(numberRows)

  assert(A.multiplyMatrix(B).isEqual(res))
})

var b: Tuple

Given('b ← tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  b = new Tuple(float, float2, float3, float4)
})

Then('A * b = tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  let atimesb = A.multiplyMatrix(Matrix.fromTuple(b, true))
  assert(atimesb.isEqual(Matrix.fromTuple(new Tuple(float, float2, float3, float4), true)))
})

Then('A * identity_matrix = A', function () {
  let identity_matrix = Matrix.identity(4,4)
  assert(A.multiplyMatrix(identity_matrix).isEqual(A))
});

var x: Tuple
Given('x ← tuple\\({float}, {float}, {float}, {float})', function (float, float2, float3, float4) {
  x = new Tuple(float, float2, float3, float4)
})

Then('identity_matrix * x = x', function () {
  assert(Matrix.identity(4, 4).multiplyMatrix(Matrix.fromTuple(x, true)).isEqual(Matrix.fromTuple(x, true)))
});

Then('transpose\\(A) is the following matrix:', function (dataTable: DataTable) {
  let numberRows = dataTable.raw().map(function(elem, i, data) {
    return elem.map(function(elem, i, data) {
      return parseFloat(elem)
    })
  })

  let res = new Matrix(4, 4)
  res.load(numberRows)

  assert(A.transpose().isEqual(res))

});

Given('A ← transpose\\(identity_matrix)', function () {
  A = Matrix.identity(4,4).transpose()
})

Then('A = identity_matrix', function () {
  assert(A.isEqual(Matrix.identity(4,4)))
})
