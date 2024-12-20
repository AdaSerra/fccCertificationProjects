const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const cors = require('cors');
const mongoose = require('mongoose')
//const monbgodb =require('mongodb')

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

app.use("/public",express.static(`${__dirname}/public`));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const idregex = /^[a-f0-9]{24}$/i;

let userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    log: [{description:String,
        duration:Number,
        date:Date
    }]
})

let user = mongoose.model('User',userSchema)



app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/index.html`);

});


app.post('/api/users',  async (req,res)=>{

 try { 
    
    const nUser = new user({
    username:req.body.username
   
 });
    await nUser.save();
    res.json({username:nUser.username,_id:nUser._id})

 }

 catch (err) {console.log(err)}
});

app.get('/api/users', async (req,res) => {

try {const alluser = await user.find({});
    res.json(alluser)}  
    
catch (err) {console.log(err)}

})


app.post('/api/users/:_id/exercises', async (req,res) => {

    try{
        const exer =req.body
        
        const finduser =await user.findById(exer[':_id']||req.params._id)
        if(finduser) {
            
            
            const validate= exer.date?new Date(exer.date):new Date()
            const validur=parseInt(exer.duration)?parseInt(exer.duration):0

            const update = { 
                description:exer.description,
                duration:validur,
                date:validate
            }

            finduser.log.push(update)
            await finduser.save()

            res.json({username:finduser.username,description:exer.description,duration:validur,date:validate.toDateString(),_id:finduser._id})
        }
        else {res.json({error: "No user found"})}
    }

    catch(err) {console.log(err)}
       

});

app.get('/api/users/:_id/logs', async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
  
    
    try {

        let finduser
        if (idregex.test(_id)) {finduser = await user.findById(_id).lean().exec();}
        else {res.status(404).json({error: "No user found"});}
  
      if (!finduser) {
        return res.status(404).json({error: "No user found"});
      }
  
      let logs =  finduser.log;
  
      if (from) {
        console.log(from)
        const fromDate = new Date(from);
        console.log(fromDate)
        logs = logs.filter(log => log.date >= fromDate)
      }
  
      if (to) {
        const toDate = new Date(to);
        logs = logs.filter(log => log.date <= toDate);
      }
  
      if (limit) {
        logs = logs.slice(0, parseInt(limit));
      }
      
      logs = logs.map(obj => { const {_id, ...rest } = obj; return {...rest,date:obj.date.toDateString()}})
      
      
            res.json({
        username: finduser.username,
        count: logs.length,
        _id: finduser._id,
        log: logs
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });