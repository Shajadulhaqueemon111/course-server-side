const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors=require("cors")
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.7auoehb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri)
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

    const courseList=client.db("course-list").collection("course")


    app.get('/course',async(req,res)=>{
        const cursor=courseList.find();
        const result=await cursor.toArray()
        res.send(result)
       
      })

      app.get('/course/:id',async(req,res)=>{
        const id=req.params.id;
        const query={_id:new ObjectId(id)}
        const options = {
        
          projection: {image:1, course_name:1, Instructor_name:1, Description:1, Enrollment_status:1, Course_duration:1, Schedule:1,
            Location:1, Prequisites:1, Syllabus:1  },
           
       
        };
        
        const result=await courseList.findOne(query)
        res.send(result)
       
    })
    
    // await client.connect();
   
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})