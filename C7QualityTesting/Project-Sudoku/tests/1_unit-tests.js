const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('Unit Tests', () => {
    test("Logic handles a valid puzzle string of 81 characters", ()=> {
        assert.isTrue(
            
            solver.validate('82..4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'),
            'Correctly validate 81 length'
        );
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", ()=>{
        assert.isFalse(
            solver.validatePuzzle('80!ghf4..6...16..89...98315.749.157.............53..4...96.415..81..7632..3...28.51'),
            "Correctly validate invalid character")
    });
    test("Logic handles a puzzle string that is not 81 characters in length", () => {
        assert.isFalse(
            solver.validate('82..4..6...16..89...9831'),
            'Correctly validate not 81 length'
        )
    });
    test("Logic handles a valid row",() => {
        assert.match(
            solver.validRow("B"),
             /^[1-9]$/i,
            'Correcty valid Row'
        )
    });
    test("Logic handles a invalid row",() => {
        assert.isFalse(
            solver.validRow("k"),
            'Correct invalid Row'
        )
    });
    test("Logic handles a valid row placement",()=>{
        assert.isFalse(
            solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,2),
            'Correct valid row placement'
        )
    });
    test("Logic handles a invalid row placement",()=>{
        assert.isTrue(
            solver.checkRowPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,9),
            'Correct invalid row placement'
        )
    });
    test("Logic handles a valid column placement",()=>{
        assert.isFalse(
            solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',4,2),
            'Correct valid column placement'
        )
    });
    test("Logic handles a invalid column placement",()=>{
        assert.isTrue(
            solver.checkColPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',4,7),
            'Correct invalid column placement'
        )
    });
    test("Logic handles a valid region placement",()=>{
        assert.isFalse(
            solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,4,7),
            'Correct valid region placement'
        )
    });
    test("Logic handles a invalid region placement",()=>{
        assert.isTrue(
            solver.checkRegionPlacement('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',1,4,5),
            'Correct invalid region placement'
        )
    });
    test("Valid puzzle strings pass the solver", ()=>{
            const solution =solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..')
        assert.isString(
            solution,'Correct, validate and validatePuzzle done this before puzzle has passed to solver');
        assert.match(solution,/^[1-9]+$/,'Correct matching numbers')
        assert.equal(solution.length,81,'Correct length solution')
    })
    test("Invalid puzzle strings fail the solver", ()=>{
        assert.isFalse(
            solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.'),
        'Correct, invalid string fails the solver')
        });
    test("Solver returns the expected solution for an incomplete puzzle", ()=>{
        assert.strictEqual(
            solver.solve('..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'),
            '218396745753284196496157832531672984649831257827549613962415378185763429374928561',
            'Correctly solved incomplete puzzle'
        )
    })
});
