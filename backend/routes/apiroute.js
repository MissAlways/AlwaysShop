const express = require("express");

const router = express.Router();

// GET

// Get all products
router.get('/products', async (req, res) => {
    try {
        const result = await db.pool.query(
            "select * from product"
        );
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

// Get product images by product id
router.get("/products/images/:id", async (req, res) => {
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
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

// Get product allergies by product id
router.get("/products/allergies/:id", async (req, res) => {
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
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

// Get product by category id
router.get("/products/categories/:id", async (req, res) => {
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
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

// POST

// Add new product
router.post("/products", async (req, res) => {
    let product = req.body;
    let name = product.name;
    if (!name || name === "") {
        return res.status(403).json({ message: "Name can not be empty" })
    }
    if (!product.hasOwnProperty('status')) {
        return res.status(403).json({ message: "Status can not be empty" })
    }
    let status = parseInt(product.status);
    let description = product.description ? product.description : null;
    let ingredients = product.ingredients ? product.ingredients : null;
    let manufacturer = product.manufacturer ? product.manufacturer : null;
    let price = product.price ? product.price : null;
    let original_price = product.original_price ? product.original_price : null;
    let discount = product.discount ? product.discount : null;
    let weight = product.weight ? product.weight : null;
    let unit = product.unit ? product.unit : null;

    try {
        const result = await db.pool.query(
            "INSERT INTO product (name, status, description, ingredients, manufacturer, price, original_price, discount, weight, unit)" +
            "VALUES (?,?,?,?,?,?,?,?,?,?)",
            [name, status, description, ingredients, manufacturer, price, original_price, discount, weight, unit]);
        return res.status(201).json({ message: "Success" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

// PUT

// Edit product by id
router.put("/products/:id", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Bad Request" });
    }
    let product = req.body;
    let tempId = parseInt(req.params.id);
    let name = product.name;
    if (!name || name === "") {
        return res.status(403).json({ message: "Name can not be empty" })
    }
    if (!product.hasOwnProperty('status')) {
        return res.status(403).json({ message: "Status can not be empty" })
    }
    let status = parseInt(product.status);
    let description = product.description ? product.description : null;
    let ingredients = product.ingredients ? product.ingredients : null;
    let manufacturer = product.manufacturer ? product.manufacturer : null;
    let price = product.price ? product.price : null;
    let original_price = product.original_price ? product.original_price : null;
    let discount = product.discount ? product.discount : null;
    let weight = product.weight ? product.weight : null;
    let unit = product.unit ? product.unit : null;

    try {
        const result = await db.pool.query(
            "UPDATE product " +
            "SET name = ?, status = ?, description = ?, ingredients = ?, manufacturer = ?, price = ?, original_price = ?, discount = ?, weight = ?, unit = ? " +
            "WHERE id = ?; ",
            [name, status, description, ingredients, manufacturer, price, original_price, discount, weight, unit, tempId]);
        return res.status(201).json({ message: "Success" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

// DELETE

// Delete product by id
router.delete("/products/:id", async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ message: "Bad Request" });
    }
    let tempId = parseInt(req.params.id);
    try {
        const result = await db.pool.query(
            "DELETE FROM product " +
            "WHERE id = ?; ",
            [tempId]);
        return res.status(200).json({ message: "Success" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error. Error: " + error })
    }
});

module.exports = router;