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
        return res.status(503).json({ message: "Database currently not available. Error: " + error })
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
        return res.status(503).json({ message: "Database currently not available. Error: " + error })
    }
});

// Get product allergies by product id
app.get("/products/allergies/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const result = await db.pool.query(
            "SELECT name " +
            "FROM allergy " +
            "INNER JOIN product_allergy ON product_allergy.allergy_id = allergy.id " +
            "WHERE product_allergy.product_id = ?",
            [id]
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(503).json({ message: "Database currently not available. Error: " + error })
    }
});

// Get product by category id
app.get("/products/categories/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const result = await db.pool.query(
            "SELECT product.* " +
            "FROM product " +
            "INNER JOIN product_category ON product_category.product_id = product.id " +
            "WHERE product_category.category_id = ?",
            [id]
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(503).json({ message: "Database currently not available. Error: " + error })
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));