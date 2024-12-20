const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({optionsSuccessStatus: 200}));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use("/public",express.static(`${__dirname}/public`));

app.get('/', (req, res) => {

    const ip=req.ip;
    const language=req.headers['accept-language'];
    const user_agent=req.headers['user-agent'];
   // res.sendFile(`${__dirname}/index.html`);
   res.render('index',{ip:ip,language:language,user_agent:user_agent})
  
  });




app.get('/api/whoami', (req,res) => {
    
    res.json({ipaddress:req.ip,language:req.headers['accept-language'],software:req.headers['user-agent']})
}) 



  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });