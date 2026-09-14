const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
    const event = req.body;
    events.push(event);

    await axios.post(`http://localhost:1000/events`, { event });
    await axios.post(`http://localhost:1001/events`, { event });
    await axios.post(`http://localhost:1002/events`, { event });
    await axios.post(`http://localhost:1003/events`, { event }).catch((err) => {
        console.log("moderation service is down!");
    });

    res.send({ status: "ok" });
});

app.get("/events", (req, res)=>{
    res.send(events);
});

app.listen(4000, () => {
    console.log("Event-Bus server is running on port 4000");
});