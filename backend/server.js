const express = require("express");
const db = require("./modules/db");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get('/products', async (req, res) => {
    try {
        const result = await db.pool.query("select * from product");
        res.send(result);
    } catch (error) {
        throw error;
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));