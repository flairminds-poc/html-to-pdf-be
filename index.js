const express = require("express");
const cors = require('cors');
const { PORT } = require('./config/index.js').DB_CONFIG
const docController  = require('./controller/docController.js');
const userCtrl = require('./controller/userController')

const app = express(); 
const port = PORT ||  5050; 
app.use(express.json()); 
app.use(cors());


app.post('/addUser', userCtrl.addUser);
app.get('/getDocuments',docController.getDocumentsCtrl);
app.get('/download/:filename', docController.downloadPdf);

app.listen(port, ()=> {
  console.info(`Server running on port ${port}`);
});