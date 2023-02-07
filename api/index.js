import express from "express";//import express from express
import mysql from "mysql";//import mysql from mysql
import cors from "cors"//import cors from cors
const app= express () // creating the expressserver
// const app = express()

app.use(express.json()) // app.use(express.json)....this middleware allow us post and get json file from the client and server
//install cors and add cors middleware
app.use(cors()) // cors is a middleware which allows application to speak to the backend server

/*Connecting to the database
    const db  = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"root2022",
        database:"store"
    })

    
    */
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root2022",
    database: "store",
    //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '16527324';
    
})

/*How to reach the backend server.....we get to the backend server using route
 app.get("/", (req,res)=>{
    res.jon("Connection to the backend successful")
 })

*/
app.get("/", (req,res)=>{
    res.json("connection to backend complete")
})

//fetching data from the database
app.get("/books", (req,res)=>{
    const q = "SELECT * FROM books"
    db.query(q, (err, data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
//another route
app.post("/books", (req, res)=>{
    const q = "INSERT INTO books (`title`, `desc`,`cover`, `price`) VALUES (?)"
    const values=[
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        res.json("Book has been created successfuly");
    })
})

//creating another end-point for deleting a book from the database
app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
     //database query
     const q = "DELETE FROM books WHERE id =?"

     db.query(q,[bookId],(err,data)=>{
        //checking for error in the backend
        if (err) return res.json(err)
        res.json("book has been deleted successfuly")
     })

})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})













/*
creating a backend express server
import express from "express"
const app =express()
 app.listen(3000,()=>{
    console.log("Connected to backend")
 })
})*/