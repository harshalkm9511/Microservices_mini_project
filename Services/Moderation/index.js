const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handleEvent = async (type, data) => {
    if (type === "created_Comment") {

        data.status = data.content.includes("orange") ? "rejected" : "approved";

        await axios.post("http://localhost:4000/events", {
            type: "comment_moderated",
            data
        });
    }
}

app.post("/events", async (req, res) => {
    const { type, data } = req.body.event;
    await handleEvent(type, data);
    res.send({});
});

app.listen(1003, async () => {
    try {
        const res = await axios.get("http://localhost:4000/events");
        console.log(res.data);
        for (let event of res.data) {
            const { type, data } = event;
            handleEvent(type, data);
        }
    } catch (err) {
        console.log("something went wrong in handling event");
    };
    console.log("Moderation service is running on port 1003");
});