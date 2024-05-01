const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// import { MongoClient } from "mongodb";
require('dotenv').config()
const cors = require('cors')
const app = express()
const port = 27282



// const corsConfig = {
//     origin:["http://localhost:5173","https://b9aten.web.app"],
//     credential:true,
//     methods:["GET","POST","PUT","DELETE"]
// }




// corsConfig

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // You can add other CORS headers as needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
// console.log(process.env.DB_USER)






// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sufjc8m.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const database = client.db("artcraft");
    const haiku = database.collection("homeart");
    const allart = database.collection("allarts");
    const Mydata = database.collection("myallarts");

   
    

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('home')
})






app.listen(port,()=>{
console.log('express running')
})