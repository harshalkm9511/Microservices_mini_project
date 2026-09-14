const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (event) => {

    if (event.type === "created_Post") {
        const post = event.data;
        post.comments = [];
        posts[event.data.id] = post;
    }

    if (event.type === "created_Comment") {

        const post = posts[event.data.id];
        post.comments.push({
            id: event.data.commentId,
            content: event.data.content,
            status: event.data.status
        });
    }

    if (event.type === "comment_updated") {

        const post = posts[event.data.id];
        const comments = post.comments;

        let comment = comments.find(comment => {
            return comment.id === event.data.commentId;
        });

        comment.status = event.data.status;
    }
}

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/events", (req, res) => {
    const event = req.body.event;
    handleEvent(event);
    res.send({});
});

app.listen(1002, async () => {
    try {
        const res = await axios.get("http://localhost:4000/events");
        console.log(res.data);
        for (let event of res.data) {
            handleEvent(event);
        }
    } catch (err) {
        console.log("something went wrong in handling event");
    };
    console.log("Query Service is running on port 1002");
});
