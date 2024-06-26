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

   
    app.get('/art/:id',async(req,res)=>{
        const ide = req.params.id
        const query = {_id: new ObjectId(ide)}
        const result = await haiku.findOne(query)
        res.send(result)
    })

    app.get('/subcategorysec/:allsu', async(req,res)=> {
        const amarid = req.params.allsu
        // console.log(amarid)
        const nunu = haiku.find({Subcategory:amarid})
        const newre = await nunu.toArray()
        res.send(newre)
    })

    app.get('/myallart/:id',async(req,res)=>{
        const idy = req.params.id
        const queryp = {_id: new ObjectId(idy)}
        const resultl = await Mydata.findOne(queryp)
        res.send(resultl)
    })
    app.delete('/myallart/:id',async(req,res)=>{
        const idyp = req.params.id
        const queryp = {_id: new ObjectId(idyp)}
        const resultlo = await Mydata.deleteOne(queryp)
        res.send(resultlo)
    })

    app.put('/myallart/:id', async(req,res)=>{
        const id = req.params.id
        const filter = {_id: new ObjectId(id)}
        const options = { upsert : true }
        const newupdatedata = req.body
        const updatedata = {
            $set: {
                customization:newupdatedata.customizationi,
                name:newupdatedata.namei,
                item:newupdatedata.itemi,
                imgi:newupdatedata.imgii,
                stock:newupdatedata.stocki,
                Rating:newupdatedata.Ratingi,
                Processing:newupdatedata.Processingi,
                email:newupdatedata.emaili,
                Price:newupdatedata.Pricei,
                Short:newupdatedata.Shorti,
                Subcategory:newupdatedata.Subcategoryi

            }
        }
        const resultp = await Mydata.updateOne(filter,updatedata,options)
        res.send(resultp)
    })
    
    app.get('/art', async (req,res)=> {
       const newresult = haiku.find()
       const newresul = await newresult.toArray()
        res.send(newresul)
    })

    app.post('/art', async (req,res)=> {
        const dat = req.body
        const result = await haiku.insertOne(dat)
        res.send(result)
    })
    app.post('/myallart', async (req,res)=> {
        const daty = req.body
        const resultp = await Mydata.insertOne(daty)
        res.send(resultp)
    })
    
    app.get('/myallart', async (req,res)=> {
        const newresultip = Mydata.find()
        const newresip = await newresultip.toArray()
         res.send(newresip)
     })

     app.get('/myallart:id',async(req,res)=>{
        const idery = req.params.id
        const querw = {_id: new ObjectId(idery)}
        const resultol = await allart.findOne(querw)
        res.send(resultol)
    })

    app.post('/allart', async (req,res)=> {
        const allars = req.body
        const result = await allart.insertOne(allars)
        res.send(result)
    })

    app.get('/allart', async (req,res)=> {
        const newresulty = allart.find()
        const newresu = await newresulty.toArray()
         res.send(newresu)
     })

     app.get('/allcraftart/allart/:id',async(req,res)=>{
        const ider = req.params.id
        const quer = {_id: new ObjectId(ider)}
        const resulto = await allart.findOne(quer)
        res.send(resulto)
    })

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