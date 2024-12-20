const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect =chai.expect;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve",(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:'5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3'})
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.equal(res.body.solution,'568913724342687519197254386685479231219538467734162895926345178473891652851726943')
            done()
        })
    });
    test("Solve a puzzle with missing puzzle string: POST request to /api/solve",(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzze:null})
        .end((err,res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error,'Required field missing')
            done()
        })
    
    });
    test("Solve a puzzle with invalid characters: POST request to /api/solve",(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:"fff91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"})
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.equal(res.body.error,"Invalid characters in puzzle")
            done()
        })
    });
    test("Solve a puzzle with incorrect length: POST request to /api/solve",(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:"2.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"})
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.equal(res.body.error,"Expected puzzle to be 81 characters long")
            done()
        })
    });
    test("Solve a puzzle that cannot be solved: POST request to /api/solve",(done)=>{
        chai.request(server)
        .post('/api/solve')
        .send({puzzle:"54691372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"})
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.equal(res.body.error,"Puzzle cannot be solved")
            done()
        })
    })
    test("Check a puzzle placement with all fields: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"54691372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3",
            coordinate:"a1",
            value:"1"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.property(res.body,"valid")
            done()
        })
    })
    test("Check a puzzle placement with single placement conflict: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"a4",
            value:"7"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.isFalse(res.body.valid)
            assert.property(res.body,"conflict")
            expect(res.body.conflict).to.have.lengthOf(1)
            done()
        })
    })
    test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"a2",
            value:"2"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.isFalse(res.body.valid)
            assert.property(res.body,"conflict")
            assert.isAbove(res.body.conflict.length,1)
            done()
        })
    });
    test("Check a puzzle placement with all placement conflicts: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"a2",
            value:"5"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.isFalse(res.body.valid)
            assert.property(res.body,"conflict")
            expect(res.body.conflict).to.have.lengthOf(3)
            done()
        })
    });
    test("Check a puzzle placement with missing required fields: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:null,
            value:"5"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
          
           assert.equal(res.body.error,"Required field(s) missing")
            done()
        })
    });
    test("Check a puzzle placement with invalid characters: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"0.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"a1",
            value:"5"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
          
           assert.equal(res.body.error,"Invalid characters in puzzle")
            done()
        })
    });
    test("Check a puzzle placement with incorrect length: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"a1",
            value:"5"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
          
           assert.equal(res.body.error,"Expected puzzle to be 81 characters long")
            done()
        })
    });
    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"Z1",
            value:"5"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
          
           assert.equal(res.body.error,"Invalid coordinate")
            done()
        })
    });
    test("Check a puzzle placement with invalid placement value: POST request to /api/check",(done)=>{
        chai.request(server)
        .post('/api/check')
        .send({puzzle:"..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..",
            coordinate:"a1",
            value:"50"
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
          
           assert.equal(res.body.error,"Invalid value")
            done()
        })
    });
});

