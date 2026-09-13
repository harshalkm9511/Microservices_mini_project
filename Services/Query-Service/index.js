const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const event = req.body.event;

    if (event.type == "created_Post") {
        const post = event.data;
        post.comments = [];
        posts[event.data.id] = post;
    }
    else if (event.type == "created_Comment") {
        const post = posts[event.data.id];
        post.comments.push({
            id: event.data.commentId,
            content: event.data.content
        });
    }

    res.send({});
});

app.listen(1002, () => {
    console.log("Query Service is running on port 1002");
});
