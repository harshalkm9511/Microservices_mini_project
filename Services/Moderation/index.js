const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", async (req, res) => {

    const { type, data } = req.body.event;
    if (type === "created_Comment") {

        data.status = data.content.includes("orange") ? "rejected" : "approved";

        await axios.post("http://localhost:4000/events", {
            type: "comment_moderated",
            data
        });
    }
    res.send({});
    
});

app.listen(1003, () => {
    console.log("Moderation service is running on port 1003");
});