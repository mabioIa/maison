process.env.NODE_ENV !== "production" ? require("dotenv").config() : false;

const { MongoClient } = require("mongodb");
const PORT = 8000 || process.env.PORT;
const { v4: uuidv4 } = require("uuid");

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const client = new MongoClient(process.env.URI);
  const { email, password } = req.body;
  const generatedUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists, please login");
    }

    const sanitisedEmail = email.toLowerCase();
    const data = {
      user_id: generatedUserId,
      email: sanitisedEmail,
      password: hashedPassword,
    };
    const insertedUser = await users.insertOne(data);
    const token = jwt.sign(insertedUser, sanitisedEmail, {
      expiresIn: 60 * 24,
    });

    res
      .status(201)
      .json({ token, userId: generatedUserId, email: sanitisedEmail });
  } catch (e) {
    console.log(e);
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(process.env.URI);
  const { email, password } = req.body;

  try {
    await client.connect();

    const database = client.db("app-data");
    const users = database.collection("users");
    const user = users.findOne({ email });
    const matchedPassword = await bcrypt.compare(password, user.hashedPassword);

    if (user && matchedPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 72,
      });

      res.status(201).json({ token, userId: user.user_id, email });
    }
    res.status(400).send("Invalid Credentials");
  } catch (e) {
    console.log(e);
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(process.env.URI);
  try {
    await client.connect();

    const database = client.db("app-data");
    const users = database.collection("users");
    const dbUsers = await users.find().toArray();

    res.send(dbUsers);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
