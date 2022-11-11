const express = require("express");
const apiroute = require("./routes/apiroute");
const db = require("./modules/db");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const app = express();
app.use(express.json())
const port = process.env.PORT || 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// How long token will live
const TIME_TO_LIVE = 3600000 * 2; // 2h

createToken = () => {
    let token = crypto.randomBytes(64);
    return token.toString("hex");
}

isUserLogged = async (req, res, next) => {
    // if token is missing
    if (!req.headers.token) {
        return res.status(403).json({ message: "Forbidden" });
    }
    try {
        const result = await db.pool.query(
            "SELECT * FROM admin_session WHERE token = ?", [req.headers.token]
        );
        console.log(result);
        if (result[0] !== undefined) {
            return res.status(403).json({ message: "Forbidden" });
        }
        let now = Date.now();
        // is token dead?
        if (now > result[0].ttl) {
            const deleteResult = await db.pool.query(
                "DELETE FROM admin_session " +
                "WHERE token=?",
                [req.headers.token]
            );
            return res.status(403).json({ message: "Forbidden" });
        }
        const updateResult = await db.pool.query(
            "UPDATE admin_session SET ttl = ? WHERE token = ?",
            [now + TIME_TO_LIVE, req.headers.token]
        );
        req.session = {};
        req.session.user = result[0].admin_id;
        return next();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

//Register

app.post("/register/admin", function (req, res) {
    if (!req.body) {
        return res.status(400).json({ message: "Bad request" });
    }
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Bad request" });
    }
    if (req.body.username.length < 1 || req.body.password.length < 12) {
        return res.status(400).json({ message: "Bad request" });
    }
    bcrypt.hash(req.body.password, 14, async function (err, hash) {
        if (err) {
            return res.status(500).json({ message: "Internal server error" })
        }
        try {
            // Check if username already exist
            const check = await db.pool.query(
                "SELECT username FROM admin WHERE UPPER(username) = ?", [req.body.username.toUpperCase()]
            );

            if (check[0] !== undefined) {
                return res.status(409).json({ message: "Username taken" });
            }
            // Add new admin
            const result = await db.pool.query(
                "INSERT INTO admin (username, password, access_level)" +
                "VALUES (?,?,?)",
                [req.body.username, hash, 0]
            );
            return res.status(201).json({ message: "Success" });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error. Error: " + error })
        }
    })

})

// Login
// Check credintials and add session if credintials are ok
app.post("/login/admin", async function (req, res) {
    if (!req.body) {
        return res.status(400).json({ message: "Bad Request" });
    }
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Bad Request" });
    }
    if (req.body.username.length < 1 || req.body.password.length < 12) {
        return res.status(400).json({ message: "Bad Request" });
    }

    try {
        // Get user data by username
        const result = await db.pool.query(
            "SELECT * FROM admin WHERE UPPER(username) = ?", [req.body.username.toUpperCase()]
        );

        const user = JSON.stringify(result);

        if (user === []) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //Check if password hashes matches
        bcrypt.compare(req.body.password, result[0].password, async function (err, success) {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }
            if (!success) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            let token = createToken();
            let now = Date.now();

            try {
                //add session
                const session_result = await db.pool.query(
                    "INSERT INTO admin_session (admin_id, token, ttl) " +
                    "VALUES (?,?,?)", [result[0].id, token, (now + TIME_TO_LIVE).toString()]
                );
                return res.status(200).json({ token: token });
            } catch (error) {
                return res.status(500).json({ message: "Internal server error", error });
            }

        })
    } catch (error) {
        return res.status(500).json({ message: "Internal server error. Error: " + error })
    }

});

//Logout
// Destroy session
app.post("/logout/admin", async function (req, res) {
    console.log()
    if (!req.headers.token) {
        return res.status(404).json({ message: "Not found" })
    }
    try {
        result = await db.pool.query(
            "DELETE FROM admin_session " +
            "WHERE token=?",
            [req.headers.token]
        );
        return res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.log("Failed to remove session when logging out. Reason:", error);
    }
})

app.use("/api", isUserLogged, apiroute)

app.listen(port, () => console.log(`Listening on port ${port}`));