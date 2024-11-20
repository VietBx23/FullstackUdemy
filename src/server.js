require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const createDatabaseConnection = require("./config/database");

const app = express();
const port = process.env.PORT || 8082;

configViewEngine(app);
app.use("/v1", webRouter);

const initializeApp = async () => {
  try {
    const connection = await createDatabaseConnection();
    const [results, fields] = await connection.query("SELECT * FROM Users u");
    console.log(">>> Results:", results);
    console.log(">>> Fields:", fields);
  } catch (err) {
    console.error("Error during app initialization:", err.message);
  }
};

initializeApp();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
