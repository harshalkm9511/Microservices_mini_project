const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

let posts = {};
app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", async (req, res) => {
    let { title } = req.body;
    let id = randomBytes(16).toString("hex");

    posts[id] = {
        id,
        title
    };

    await axios.post("http://localhost:4000/events", {
        type: "created_Post",
        data: { id, title }
    });

    res.status(200).send(posts[id]);
});

app.post("/events", (req, res) => {
    res.send({});
});

app.listen(1000, () => {
    console.log("server is running on port 1000");
});