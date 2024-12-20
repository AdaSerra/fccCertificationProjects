const express = require('express');
const app = express();
require('dotenv').config();
const port = 3000;
const cors = require('cors');
const dns = require('dns')
const mongoose = require('mongoose')

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

app.use("/public",express.static(`${__dirname}/public`));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


function rdus(url) {

    if (url.startsWith('https://')) {
        url = url.slice(8);
      } else if (url.startsWith('http://')) {
        url = url.slice(7);
      }

    const lastSlashIndex = url.indexOf('/');


    if (lastSlashIndex !== -1) {
        
        return url.slice(0, lastSlashIndex);
        
    }
    return url; // Se non c'è nessun '/', restituisce la stringa originale
}

let raccoltaSchema = new mongoose.Schema({
    url:{
        type: String,
        unique:true,
        required: true
    },

})

let raccolta

raccolta = mongoose.model('raccolta',raccoltaSchema)

async function findAndSave(link)  {

    let ll = []
    let doc
    ll.push(await raccolta.find().sort({_id:1}).exec())

    const lunghezza = ll[0].length
    

    await raccolta.findOne({url:link})
    .then((docs)=>{
        doc=docs
        console.log("Find: " + docs);
    })
    .catch((err)=>{
        console.log("Error: "+err);})
        
    

    if (doc != null) {
        
        for (i=0;i<lunghezza;i++)
        {
            
            if (ll[0][i].url==link) { return i}
        }
        
        

        }
    else {
        const saveUrl= new raccolta ({
            url:link
        })
        await saveUrl.save()
        .then((docs)=>{
            console.log("New save: " + docs)
        })
        .catch((err) => {
            console.log("Error: "+err)
        })
        return lunghezza
    }
}

app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/index.html`);

});

app.post('/api/shorturl', (req,res) => {
    
   
    let sito=req.body.url
    
    //console.log(`req.body: ${JSON.stringify(req.body, null, 2)}`);
    sito=rdus(sito)
    //sito.replace(/^https?:\/\//, '')
    dns.lookup(sito, async (err, address, family) =>{ 
    console.log('address: %j family: IPv%s', address, family)
    if (!err) {
        
        let id=  await findAndSave(req.body.url)
        
        res.json({original_url:req.body.url,short_url:id})
    }
    else {res.json({error: "Invalid url"})}
});
    
})

app.get('/api/shorturl/:number', async (req,res) => {

    let number = req.params.number
    
    let ll = []
    
    ll.push(await raccolta.find().sort({_id:1}).exec())

    try {const link = ll[0][number].url
            if (number<=ll[0].length) {
        link.startsWith('http')?res.redirect(link):res.redirect("https://"+link)
        }
            else {res.json({error:"No short URL found for the given input"})}

    }

    catch {res.json ({error: "Wrong format"})}

   
})

app.listen(port,'0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${port}`);
  });