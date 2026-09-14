const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    let { id } = req.params;
    let comments = commentsByPostId[id] || [];
    res.status(200).send(comments);
});

app.post("/posts/:id/comments", async (req, res) => {
    let { id } = req.params;
    let { content } = req.body;
    let commentId = randomBytes(4).toString("hex");

    const comments = commentsByPostId[id] || [];
    comments.push({ commentId, content, status: "Pending" });
    commentsByPostId[id] = comments;

    await axios.post("http://localhost:4000/events", {
        type: "created_Comment",
        data: { id, commentId, content, status: "pending" }
    });

    res.status(200).send(comments);
});

app.post("/events", async (req, res) => {
    const { type, data } = req.body.event;

    if (type === "comment_moderated") {
        const comments = commentsByPostId[data.id];
        let comment = comments.find((c) => {
            return c.commentId === data.commentId;
        });

        comment.status = data.status;

        await axios.post("http://localhost:4000/events", {
            type: "comment_updated",
            data:{
                id: data.id,
                commentId: data.commentId,
                content:data.content,
                status:data.status
            }
        });
    }
    res.send({});
});

app.listen(1001, () => {
    console.log("server is running on the port of 1001");
});