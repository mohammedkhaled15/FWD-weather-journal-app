// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Require Express to run server and routes
const express = require("express")

// Start up an instance of app
const app = express()

/* Middleware*/
const bodyParser = require("body-parser")
const cors = require("cors")

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3333
const server = app.listen(port,()=>{console.log(`Here is my port: ${port}`)})

/*************************************************************************************************/

app.post("/geo",(req,res)=>{
    const newEntry={
        temp:req.body[0].main.temp,
        feelings:req.body[1],
        name:req.body[0].name,
        icon:req.body[0].weather[0].icon
    }
    projectData.unshift(newEntry)
    // console.log(req.body[0].weather[0].icon)
})

app.get("/allData",(req,res)=>{
    res.status(200).send(projectData[0])
    // console.log(projectData[0]) 
})