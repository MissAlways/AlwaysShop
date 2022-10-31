const express = require("express");
const db = require("./modules/db");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET

// Get all products
app.get('/products', async (req, res) => {
    try {
        const result = await db.pool.query(
            "select * from product"
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(503).json({ message: "Database currently not available. Error: " + error})
    }
});

// Get product images by product id
app.get("/products/images/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const result = await db.pool.query(
            "SELECT url " +
            "FROM product_image " +
            "WHERE product_id = ?",
            [id]
            );
            return res.status(200).json(result);
        } catch (error) {
        return res.status(503).json({ message: "Database currently not available. Error: " + error})
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));