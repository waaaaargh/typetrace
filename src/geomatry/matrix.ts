import { Tuple, epsilon } from "./tuple"

export class Matrix {
  private m: number
  private n: number
  private numbers: number[][]

  constructor(m: number, n: number) {
    this.m = m
    this.n = n

    this.numbers = new Array(m)

    for(let i = 0; i < m; i += 1) {
      this.numbers[i] = new Array(n)
    }
  }

  transpose(): Matrix {
    let res = new Matrix(this.dimension[1], this.dimension[0])

    for(let i = 0; i < res.m; i++) {
      res.numbers[i] = res.column(i)
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
}
