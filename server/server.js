  
const connectDB = require("./config/connectDB");
const express = require("express")
const admin = require('./routes/admin')
const customer = require('./routes/customer')

const app = express()

app.use(express.json())

 connectDB();

//Importer les routes 
app.use('/admin',admin)

app.use('/',customer)



// run server
const PORT = process.env.PORT || 8000;
app.listen(PORT, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port http://localhost:${PORT}`);
});