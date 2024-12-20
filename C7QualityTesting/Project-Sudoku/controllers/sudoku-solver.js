const regexC = /^[a-i]$/i
const regexN = /^[1-9]$/
const puzzlesAndSolutions= require('./puzzle-strings.js')
class SudokuSolver {


  validRow(str) {
    switch (str.toLowerCase()) {
      case "a": return 1;
      case "b": return 2;
      case "c": return 3;
      case "d": return 4;
      case "e": return 5;
      case "f": return 6;
      case "g": return 7;
      case "h": return 8;
      case "i": return 9;
      default: return false
    }
  }

  validColumn(str) {
    if (/^[1-9]$/.test(str)) {
      return (Number(str))
    }
    return false
  }

  validate(puzzleString) {
    if (typeof(puzzleString) === 'string') {
      return puzzleString.length == 81 ? true : false
    }
   else {return false}
  }

  validatePuzzle(puzzleString) {
    return /^[1-9.]+$/i.test(puzzleString) ? true : false
  }

  checkRowPlacement(puzzleString, row, value) {
    let puzStrArray = puzzleString.split('')
    let rowArray = []
    for (let i = 0; i < 9; i++) {
      rowArray.push(puzStrArray[(row-1)*9+i])
    }

    return rowArray.includes(String(value)) ? true : false
  }

  checkColPlacement(puzzleString, column, value) {
    let puzStrArray = puzzleString.split('')
    let columnArray = []
    for (let i = 0; i < 9; i++) {
      columnArray.push(puzStrArray[9 * i + column - 1])
    }
    return columnArray.includes(String(value)) ? true : false

  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let puzStrArray = puzzleString.split('')
    let regRow = row < 4 ? 1 : row > 6 ? 7 : 4
    let regCol = column < 4 ? 0 : column > 6 ? 6 : 3
    let region = []
    region.push(puzStrArray[regRow * 9 - 9 + regCol])
    region.push(puzStrArray[regRow * 9 - 8 + regCol])
    region.push(puzStrArray[regRow * 9 - 7 + regCol])
    region.push(puzStrArray[regRow * 9 + regCol])
    region.push(puzStrArray[regRow * 9 + 1 + regCol])
    region.push(puzStrArray[regRow * 9 + 2 + regCol])
    region.push(puzStrArray[regRow * 9 + 9 + regCol])
    region.push(puzStrArray[regRow * 9 + 10 + regCol])
    region.push(puzStrArray[regRow * 9 + 11 + regCol])

    return region.includes(String(value)) ? true : false
  }

  solve(puzzleString) {

    if (this.validate(puzzleString) && this.validatePuzzle(puzzleString)) {
    let startBoard = []
    for (let i = 0; i < 9; i++) { startBoard.push(puzzleString.slice(i * 9, (i + 1) * 9).split('')); }

    function isValid(board, row, col, num) {
      for (let x = 0; x < 9; x++) {
        if (board[row][x] == num || board[x][col] == num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] == num) { return false; }
      }
      return true;
    }
    function solve(board) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (board[row][col] == '.') {
            for (let num = 1; num <= 9; num++) {
              if (isValid(board, row, col, num)) {
                board[row][col] = num.toString();
                if (solve(board)) { return true; } board[row][col] = '.';
              }
            }
            return false;
          }
        }
      }
      return true;
    }
    solve(startBoard);
    
    return startBoard.flat().join('');
  }
  else {return false}
  }
}


const solver = new SudokuSolver()
//let board = []; for (let i = 0; i < 9; i++) { board.push(testString.slice(i * 9, (i + 1) * 9).split('')); }
const testString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
//console.log(solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,4,5)),
//console.log(solver.solve(testString))
module.exports = SudokuSolver

