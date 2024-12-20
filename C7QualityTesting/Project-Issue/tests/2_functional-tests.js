const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect
const server = require('../server');

chai.use(chaiHttp);

let _idtest
suite('Functional Tests', function() {
    suite('POST /api/issues/{project}', function() {
     
        test('Every field filled in', function(done) {
         chai.request(server)
          .post('/api/issues/test')
          .send({
            issue_title: 'Title',
            issue_text: 'text',
            created_by: 'Functional Test - Every field filled in',
            assigned_to: 'Chai and Mocha',
            status_text: 'In QA',
           

          })
          .end(function(err, res){
            expect(err).to.be.null;
            assert.equal(res.status, 200);
            assert.property(res.body, 'issue_title');
            assert.property(res.body, 'issue_text');
            assert.property(res.body, 'created_on');
           
            assert.property(res.body, 'created_by');
            assert.property(res.body, 'assigned_to');
            assert.property(res.body, 'open');
            assert.property(res.body, 'status_text');
            assert.property(res.body, 'updated_on');
            assert.property(res.body, '_id');
            _idtest=res.body._id
            done();
          });
        });
        test('Only requested field filled in', function(done) {
            chai.request(server)
             .post('/api/issues/test')
             .send({
               issue_title: 'Title',
               issue_text: 'text',
               created_by: 'Functional Test - Only field filled in',

   
             })
             .end(function(err, res){
               expect(err).to.be.null;
               assert.equal(res.status, 200);
               assert.property(res.body, 'issue_title');
               assert.property(res.body, 'issue_text');
               assert.property(res.body, 'created_on');
              
               assert.property(res.body, 'created_by');
               assert.property(res.body, 'assigned_to');
               assert.property(res.body, 'open');
               assert.property(res.body, 'status_text');
               assert.property(res.body, 'updated_on');
               assert.property(res.body, '_id');
               done();
             });
           });
           test('Missing requested field filled in', function(done) {
            chai.request(server)
             .post('/api/issues/test')
             .send({
               issue_title: '',
               issue_text: null,
               created_by: undefined,

   
             })
             .end(function(err, res){
               expect(err).to.be.null;
               assert.equal(res.status, 200);
               assert.equal(res.text, '{"error":"required field(s) missing"}');
 
               done();
             });
           });
           test('View an issue in project test', function(done) {
            chai.request(server)
             .get('/api/issues/test')
             .query({})
            
             .end(function(err, res){
                assert.isArray(res.body)
               assert.equal(res.status, 200);
               assert.property(res.body[0], 'issue_title');
               assert.property(res.body[0], 'issue_text');
               assert.property(res.body[0], 'created_on');
               assert.property(res.body[0], 'updated_on');
               assert.property(res.body[0], 'created_by');
               assert.property(res.body[0], 'assigned_to');
               assert.property(res.body[0], 'open');
               assert.property(res.body[0], 'status_text');
               assert.property(res.body[0], '_id');
               done();
             });
           });
           test('View an issue in project test with filter', function(done) {
            chai.request(server)
             .get('/api/issues/test')
             .query({created_by: "Functional Test - Only field filled in"})
            
             .end(function(err, res){
                assert.isArray(res.body)
               assert.equal(res.status, 200);
               assert.equal(res.body[0]['created_by'], 'Functional Test - Only field filled in');
               assert.property(res.body[0], 'issue_title');
               assert.property(res.body[0], 'issue_text');
               assert.property(res.body[0], 'created_on');
               assert.property(res.body[0], 'updated_on');
               assert.property(res.body[0], 'created_by');
               assert.property(res.body[0], 'assigned_to');
               assert.property(res.body[0], 'open');
               assert.property(res.body[0], 'status_text');
               assert.property(res.body[0], '_id');
               done();
             });
           });
           test('View an issue in project test with multiple filter', function(done) {
            chai.request(server)
             .get('/api/issues/test')
             .query({assigned_to: "Chai and Mocha",
                    issue_text:"text",
                    open:true

             })
            
             .end(function(err, res){
                assert.isArray(res.body)
               assert.equal(res.status, 200);
               assert.equal(res.body[0]['assigned_to'], 'Chai and Mocha');
               assert.equal(res.body[0]['issue_text'], 'text');
               expect(res.body[0]['open']).to.be.true;
               assert.property(res.body[0], 'issue_title')
               assert.property(res.body[0], 'issue_text');
               assert.property(res.body[0], 'created_on');
               assert.property(res.body[0], 'updated_on');
               assert.property(res.body[0], 'created_by');
               assert.property(res.body[0], 'assigned_to');
               assert.property(res.body[0], 'open');
               assert.property(res.body[0], 'status_text');
               assert.property(res.body[0], '_id');
               done();
             });
           });
           test('One field to update', function(done) {
            chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: '675552083416ab94c432c13b',
              assigned_to: "Chai update"
            })
            .end(function(err, res){
                expect(err).to.be.null
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"result":"successfully updated","_id":"675552083416ab94c432c13b"}') 
              done();
            });
          }); 
          test('Multiple fields to update', function(done) {
            chai.request(server)
            .put('/api/issues/test')
            .send({
              _id: '675552093416ab94c432c13f',
              assigned_to: "Chai update",
              issue_text:"text update"
            })
            .end(function(err, res){
                expect(err).to.be.null
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"result":"successfully updated","_id":"675552093416ab94c432c13f"}') 
              done();
            });
          }); 
          test('Update with missing _id', function(done) {
            chai.request(server)
            .put('/api/issues/test')
            .send({
              
              assigned_to: "Chai update",
              issue_text:"text update"
            })
            .end(function(err, res){
             
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"error":"missing _id"}') 
              done();
            });
          }); 
          test('Update with all empty fields', function(done) {
            chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: '675552093416ab94c432c13f',
                
            })
            .end(function(err, res){
             
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"error":"no update field(s) sent","_id":"675552093416ab94c432c13f"}') 
              done();
            });
          }); 
          test('Update with invalid _id', function(done) {
            chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: '000002093416ab94c432c13f',
                issue_title: "no update"
            })
            .end(function(err, res){
             
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"error":"could not update","_id":"000002093416ab94c432c13f"}') 
              done();
            });
          });
          test('Delete an issue', function(done) {
            chai.request(server)
            .delete('/api/issues/test')
            .send({
                _id: _idtest,
            
            })
            .end(function(err, res){
             
              assert.equal(res.status, 200);
              assert.equal(res.text, `{"result":"successfully deleted","_id":"${_idtest}"}`) 
              done();
            });
          }); 
         test('Delete with invalid _id', function(done) {
            chai.request(server)
            .delete('/api/issues/test')
            .send({
                _id: '000002093416ab94c432c13f',
            
            })
            .end(function(err, res){
             
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"error":"could not delete","_id":"000002093416ab94c432c13f"}') 
              done();
            });
          });  
          test('Delete with missing _id', function(done) {
            chai.request(server)
            .delete('/api/issues/test')
            .send({
                _id: null,
            
            })
            .end(function(err, res){
             
              assert.equal(res.status, 200);
              assert.equal(res.text, '{"error":"missing _id"}') 
              done();
            });
          });                                               
    })
});        
