const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


app.use(cors({optionsSuccessStatus: 200})); 
app.use(express.urlencoded({ extended: true }));

app.use("/public",express.static(`${__dirname}/public`));



app.get('/', (req, res) => {

  res.sendFile(`${__dirname}/index.html`);

});

app.post('/api', (req, res) => {
     
    const unix = req.body.unix;
    const utc = req.body.utc;
    unix?res.redirect((`/api/${unix}`)):res.redirect((`/api/${utc}`))
 
  });


app.get('/api/:date?',(req,res)=> {
    
    let date 
 
    if (!req.params.date) {date=new Date()}
    else {/^\d+$/.test(req.params.date)?date=new Date(Number(req.params.date)):date=new Date(req.params.date)}
    
    if (isNaN(date.getTime())) { return res.json({error:"Invalid date"})}
    else {res.json({unix:Number(date.getTime()),utc:date.toUTCString()})}
    
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});