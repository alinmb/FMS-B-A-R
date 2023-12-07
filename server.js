require("dotenv").config();

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API French Fighters by Ali",
      version: "1.0.0",
      description:
        "Dans cette API seront regroupés les profils des combattants de MMA Français à travers le monde.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./swagger.yaml"],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const fightersRouter = require("./routes/fighters");
app.use("/fighters", fightersRouter);

// app.listen(PORT, () => console.log(`App listening on port ${PORT}`));

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
  } catch (error) {
    console.log({ message: error.message });
  }
};

start();
