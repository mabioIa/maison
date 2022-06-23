process.env.NODE_ENV !== "production" ? require("dotenv").config() : false;

const { MongoClient } = require("mongodb");
const uri = process.env.URI;
const PORT = 8000 || process.env.PORT;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json("hello");
});

app.post("/signup", (req, res) => {
  res.json("hello database");
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();

    const database = client.db("app-data");
    const users = database.collection("users");
    const dbUsers = await users.find().toArray();

    res.send(dbUsers);
  } catch (e) {
    console.log(e);
  } finally {
    client.close();
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
