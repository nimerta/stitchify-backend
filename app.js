const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const morgan = require("morgan");

app.use(cors());

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: false }));

const allRoutes = require("./routes/index");

app.use("/api", allRoutes);

app.listen(4000, () => {
  console.log("Stitchify API Is Running On PORT: 4000");

  mongoose
    .connect(
      "mongodb+srv://nimerta:nimerta123.@cluster0.vtstzo8.mongodb.net/stitchifyDB"
    )
    .then((success) => {
      console.log("Stitchify Database Connection Established!");
    })
    .catch((error) => {
      console.log("Error Occurred While Connecting To Database: ", error);
    });
});
