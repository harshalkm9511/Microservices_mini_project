const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/events", async (req, res) => {

    await axios.post(`http://localhost:1000/events`, { event: req.body });
    await axios.post(`http://localhost:1001/events`, { event: req.body });
    await axios.post(`http://localhost:1002/events`, { event: req.body });

    res.send({ status: "ok" });
});

app.listen(4000, () => {
    console.log("Event-Bus server is running on port 4000");
});