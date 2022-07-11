import config from "./config/config";
import app from "./express";
import mongoose from "mongoose";

mongoose.connect(config.maison);
mongoose.connection.on("error", () => {
  throw new Error(`[-] Unable to connect to MongoDB instance`);
});

app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`[+] Express started on localhost:${config.port}`);
});
