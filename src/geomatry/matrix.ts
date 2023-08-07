import { Tuple, epsilon } from "./tuple"

export enum Axis {
  X = 0,
  Y = 1,
  Z = 2
}

export class Matrix {
  private m: number
  private n: number
  private numbers: number[][]

  constructor(m: number, n: number) {
    this.m = m
    this.n = n

    this.numbers = new Array(m)

    for(let i = 0; i < m; i += 1) {
      this.numbers[i] = new Array(n).fill(0)
    }
  }

  transpose(): Matrix {
    let res = new Matrix(this.n, this.m)

    for(let i = 0; i < res.m; i++) {
      for(let j = 0; j < res.n; j++) {
        res.numbers[i][j] = this.numbers[j][i]
      }
    }

    return res
  }

  load(rows: number[][]) {
    this.numbers = rows
  }

  getCell(m: number, n: number) {
    return this.numbers[m][n];
  }

  get dimension(): [number, number] {
    return [this.m, this.n]
  }

  row(m: number): number[] {
    return this.numbers[m]
  }

  column(n: number): number[] {
    return this.numbers.map(function(row) {
      return row[n]
    })
  }

  isEqual(b: Matrix): boolean {
    if(this.dimension[0] != b.dimension[0] && this.dimension[1] != b.dimension[1]) {
      return false
    }

    for(let i=0; i<this.m; i++) {
      for(let j=0; j<this.n; j++) {
        if(Math.abs(this.numbers[i][j] - b.getCell(i, j)) > epsilon) {
          return false
        }
      }
    }

    return true
  }

  multiplyMatrix(b: Matrix): Matrix {
    let result = new Matrix(this.dimension[0], b.dimension[1])

    for(let i=0; i < result.dimension[0]; i++) {
      for(let j=0; j < result.dimension[1]; j++) {
        let row = this.row(i)
        let col = b.column(j)
        result.numbers[i][j] = 0
        for(let k = 0; k < row.length; k++) {
          result.numbers[i][j] += row[k] * col[k];
        }
      }
    }

    return result
  }

  multiplyScalar(b: number): Matrix {
    let result = new Matrix(this.m, this.n)

    result.numbers = this.numbers.map(function(row) {
      return row.map(function(value) {
        return value * b
      })
    })

    return result
  }

  multiplyTuple(t: Tuple): Tuple {
    let tm = Matrix.fromTuple(t, true)
    return this.multiplyMatrix(tm).toTuple()
  }

  toTuple(): Tuple {
    return new Tuple(
      this.numbers[0][0],
      this.numbers[1][0],
      this.numbers[2][0],
      this.numbers[3][0],
    )
  }

  get determinant(): number {
    if(this.m == 2 && this.n == 2) {
      return this.numbers[0][0] * this.numbers[1][1] - this.numbers[0][1] * this.numbers[1][0]
    }

    let acc = 0
    for(let i = 0; i < this.n; i++) {
      acc += this.numbers[0][i] * this.cofactor(0, i)
    }

    return acc
  }

  submatrix(m: number, n: number) {
    let res = new Matrix(this.m - 1, this.n - 1)

    res.numbers = this.numbers.filter(function(_, index: number): boolean {
      return index != m
    }).map(function(value: number[], index: number) {
      return value.filter(function(_, index: number) {
        return index != n
      })
    })

    return res
  }

  minor(m: number, n: number): number {
    return this.submatrix(m, n).determinant
  }

  cofactor(m: number, n: number): number {
    return (m + n) % 2 == 0 ? this.minor(m, n) : this.minor(m, n) * -1
  }

  get invertible(): boolean {
    return this.determinant != 0
  }

  invert(): Matrix {
    let cofactorMatrix = new Matrix(this.m, this.n)

    for(let i = 0; i < cofactorMatrix.m; i++) {
      for(let j = 0; j < cofactorMatrix.n; j++) {
        cofactorMatrix.numbers[i][j] = this.cofactor(i, j)
      }
    }

    return cofactorMatrix.transpose().multiplyScalar(1/this.determinant)
  }

  static fromTuple(t: Tuple, column: boolean = false): Matrix {
    if(!column) {
      let res = new Matrix(1, 4)
      res.numbers = [[t.x, t.y, t.z, t.w] ]
      return res
    } else {
      let res = new Matrix(4, 1)
      res.numbers = [[t.x], [t.y], [t.z], [t.w] ]
      return res
    }
  }

  static identity(m: number, n: number): Matrix {
    let res = new Matrix(m, n)

    for(let i = 0; i < m; i++) {
      for(let j = 0; j < n; j++) {
        res.numbers[i][j] = i == j ? 1 : 0
      }
    }

    return res
  }

  static translation(x: number, y: number, z: number): Matrix {
    let res = Matrix.identity(4,4)

    res.numbers[0][3] = x
    res.numbers[1][3] = y
    res.numbers[2][3] = z

    return res
  }

  static scaling(x: number, y: number, z: number): Matrix {
    let res = Matrix.identity(4,4)

    res.numbers[0][0] = x
    res.numbers[1][1] = y
    res.numbers[2][2] = z

    return res
  }

  static rotation(axis: Axis, angle: number): Matrix {
    let res = Matrix.identity(4,4)

    switch(axis) {
      case Axis.X: {
        res.numbers[1][1] = Math.cos(angle)
        res.numbers[1][2] = -1 * Math.sin(angle)
        res.numbers[2][1] = Math.sin(angle)
        res.numbers[2][2] = Math.cos(angle)
        break
      }
      case Axis.Y: {
        res.numbers[0][0] = Math.cos(angle)
        res.numbers[0][2] = Math.sin(angle)
        res.numbers[2][0] = -1 * Math.sin(angle)
        res.numbers[2][2] = Math.cos(angle)
        break
      }
      case Axis.Z: {
        res.numbers[0][0] = Math.cos(angle)
        res.numbers[0][1] = -1 * Math.sin(angle)
        res.numbers[1][0] = Math.sin(angle)
        res.numbers[1][1] = Math.cos(angle)
        break
      }
    }

    return res
  }

  static shearing(xy: number,xz: number, yx: number, yz: number ,zx: number, zy: number) {
    let res = Matrix.identity(4,4)

    res.numbers[0][1] = xy
    res.numbers[0][2] = xz
    res.numbers[1][0] = yx
    res.numbers[1][2] = yz
    res.numbers[2][0] = zx
    res.numbers[2][1] = zy

    return res
  }

}

