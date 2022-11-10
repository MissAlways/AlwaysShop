const express = require("express");
const apiroute = require("./routes/apiroute");
const db = require("./modules/db");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json())
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use("/api", apiroute)

app.listen(port, () => console.log(`Listening on port ${port}`));