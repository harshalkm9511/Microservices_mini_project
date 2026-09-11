const express = require("express");
const {randomBytes} = require("crypto");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let posts = {};
app.get("/posts", (req, res)=>{
    res.send(posts);
});

app.post("/posts", (req, res)=>{
    let {title} = req.body;
    let id = randomBytes(16).toString("hex");
    posts[id] = {
        id,
        title
    };
    res.status(200).send(posts[id]);
});

app.listen(1000, ()=>{
    console.log("server is running on port 1000");
});