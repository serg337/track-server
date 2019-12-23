require("./models/user");
require("./models/track");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const requireAuth = require("./middleware/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:.test.@track-app-backend-e8ife.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo instance");
});

mongoose.connection.on("error", error => {
  console.error("Error connecting to mongo", error);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your Email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening on Port 3000");
});
