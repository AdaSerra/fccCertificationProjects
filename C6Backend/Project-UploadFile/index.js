const port = 3000;
const cors = require('cors');
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({ dest: './upload/' })

app.use(cors()); 
app.use(express.urlencoded({ extended: true }));

app.use("/public",express.static(`${__dirname}/public`));




app.get('/', (req, res) => {

    res.sendFile(`${__dirname}/index.html`);
  
  });

app.post('/api/fileanalyse', upload.single('upfile'),(req,res) => {
 res.json({
    name:req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size
 })
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });