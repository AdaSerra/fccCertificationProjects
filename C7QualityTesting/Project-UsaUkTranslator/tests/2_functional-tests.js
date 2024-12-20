const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect
const server = require('../server.js');

chai.use(chaiHttp);



suite('Functional Tests', () => {

    test("Translation with text and locale fields: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            locale:"american-to-british",
            text:"something"
        })
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.isString(res.body.translation)
            done()
        })
    })

    test("Translation with text and invalid locale field: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            locale:"american-to-spanish",
            text:"something"
        })
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.equal(res.body.error,"Invalid value for locale field")
            done()
        })
    });

    test("Translation with missing text field: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            locale:"american-to-british",
           
        })
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.equal(res.body.error,"Required field(s) missing")
            done()
        })
    });

    test("Translation with missing locale field: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            locale:null,
            text:"something"
        })
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.equal(res.body.error,"Required field(s) missing")
            done()
        })
    })

    test("Translation with empty text: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            locale:"american-to-british",
            text:""
        })
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.equal(res.body.error,"No text to translate")
            done()
        })
    });

    
    test("Translation with text that needs no translation: POST request to /api/translate", (done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            locale:"american-to-british",
            text:"This text no need to translate."
        })
        .end((err,res)=>{
            expect(err).to.be.null
            assert.equal(res.status, 200);
            assert.equal(res.body.translation,"Everything looks good to me!")
            done()
        })
    })
});
