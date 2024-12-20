'use strict';
require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

let issueSchema = new mongoose.Schema({

  assigned_to:{
    type:String,
    default:""
  },
  status_text:{type:String,default:""},
  open:{type:Boolean,default:true},
  issue_title:{
    type:String,
    required:true
  },
  issue_text:{
    type:String,
    required:true
  },
  created_by:{
    type:String,
    required:true
  },

  created_on:{type:Date,default: new Date()},
  updated_on:{type:Date, default: new Date()},
 
  
  project_id:{
    type:String,
    
  }

},{versionKey:false})

let issue = mongoose.model('issue',issueSchema)

issueSchema.pre('save', function(next) { this.updated_on = Date.now(); next(); });

let projectSchema = new mongoose.Schema({
  project:{type:String,required:true},
 
},{versionKey:false})



let project = mongoose.model('project',projectSchema)

module.exports = function (app) {

  app.route('/api/issues/:project')
    
    .get( async function (req, res){
        const queryparams = req.query
      try {
        const findProject = await project.findOne({project:req.params.project})
        if (findProject) {
          queryparams.project_id=findProject._id
           
          const findIssue=await issue.find(queryparams)
          return res.json(findIssue)
        }
        else {
          return res.json({})
        }
      }

      catch(err) {
        return  res.status(500).json(err)
       }
  
    })
    
    .post( async function (req, res){
      
      const {issue_title,issue_text,created_by} = req.body
      
      if ( !issue_title || !issue_text || !created_by) {
        return res.json({error: 'required field(s) missing' })
      }
      let pId
      const findProject = await project.findOne({project:req.params.project})
      if (findProject) {
        pId=findProject._id
        
      }
      else {
        const newProject = new project({project:req.params.project});
        const savedProject= await newProject.save()
        pId=savedProject._id
        
       
      }


      const newIssue = new issue({
      project_id:pId,
      issue_title: req.body.issue_title,
      issue_text: req.body.issue_text,
      created_by:req.body.created_by,
      assigned_to: req.body.assigned_to,
      status_text:req.body.status_text,
      open:true,
      created_on:new Date(),
     
      })
     try {
      const saveIssue = await newIssue.save();
      const savedIssue = await issue.findById(saveIssue._id).select('-project_id')
      return res.json(savedIssue)
     }
     catch(err) {
      return res.status(500).json(err)
     }
    })
    
    .put( async function (req, res){
      const {_id,issue_title,issue_text,created_by,assigned_to,status_text,open} = req.body
      
      if (!_id) {return res.json({error: 'missing _id'})}
      if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text){
       return res.json({error: 'no update field(s) sent',_id: _id})
      }
      try {
          const findIssue = await issue.findById(_id);
          if (findIssue) {
            const updateValue = {
              issue_title:issue_title? issue_title : findIssue.issue_title,
              issue_text:issue_text? issue_text: findIssue.issue_text,
              created_by:  created_by?  created_by : findIssue.created_by,
              assigned_to: assigned_to? assigned_to : findIssue.assigned_to,
              status_text: status_text? status_text : findIssue.status_text,
              updated_on:new Date(),
              open:open? open:findIssue.open
            }
            const updateIssue = await issue.findByIdAndUpdate(_id,updateValue, {new:true})
            await updateIssue.save()
            return res.json({result: 'successfully updated',_id: _id })
          }

          else {return res.json({error: 'could not update',_id: _id})}
      }
      catch(err) {
        return res.json({error: 'could not update',_id: _id})
      }
     
      
    })
    
    .delete(async function (req, res){
      if (!req.body._id){return res.json({error: 'missing _id'})}
    try{
        const deleteIssue = await issue.findByIdAndDelete(req.body._id)
        if (deleteIssue) {return res.json({ result: 'successfully deleted',_id:req.body._id})}
        else { return res.json({error: 'could not delete',_id:req.body._id})}
       
    }
      catch{
        return res.json({error: 'could not delete',_id:req.body._id})
      }
    });

   
    
};
