'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
        const {puzzle,coordinate,value} = req.body
        if (!puzzle || !coordinate || !value) {return res.json({error: 'Required field(s) missing'})}
        if(!solver.validate(puzzle)) {return res.json({error: "Expected puzzle to be 81 characters long"})}
        if (!/^[1-9]$/.test(value)) {return res.json({error: "Invalid value"})}
        
        if(!solver.validatePuzzle(puzzle)) {return res.json({error: "Invalid characters in puzzle"})}
        const validRow = solver.validRow(coordinate[0])
        const validCol = solver.validColumn(coordinate.slice(1))
        if (validCol === false || validRow === false) {return res.json({error: "Invalid coordinate"})}
        else {
          let conflict =[]
          if (solver.checkRowPlacement(puzzle,validRow,value)) {conflict.push("row")}
          if (solver.checkColPlacement(puzzle,validCol,value)) {conflict.push("column")}
          if (solver.checkRegionPlacement(puzzle,validRow,validCol,value)) {conflict.push("region")}
          if ( puzzle[(validRow-1)*9+(validCol-1)] == value) { return res.json({valid:true})}
          
          if (conflict.length === 0 ) {
            
            return res.json({valid:true}) 
          }
          else {
           
            return res.json({valid:false,conflict:conflict})
          }
         
          
          
        }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const {puzzle}=req.body
      if (!puzzle) {
        return res.json({error: 'Required field missing'})
      }
      if(!solver.validate(puzzle)) {return res.json({error: "Expected puzzle to be 81 characters long"})}
      if(!solver.validatePuzzle(puzzle)) {return res.json({error: "Invalid characters in puzzle"})}
      else {
       
        const solution = solver.solve(puzzle)
        if (solution !=puzzle && !solution.includes('.')) {
          return res.json({solution:solution})
        }
        else {return res.json({error: 'Puzzle cannot be solved' })}
       
      }
    });
};
