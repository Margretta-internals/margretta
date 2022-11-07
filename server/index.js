// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL)
//     console.log(`MongoDB Connected : ${conn.connection.host}`)
//   } catch (error) {
//     console.log(`Error: ${error.message}`)
//     process.exit(1)
//   }
// }

// connectDB()

// const port = process.env.PORT || 5000

// app.listen(port, () => {
//   console.log(`Server started at http://localhost/${port}`)
// })

const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const morgan = require("morgan");
app.use(morgan("tiny"));

app.set("port", process.env.PORT || 8081);

// create schema
const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true,
    },
    kitchen: {
      type: Date,
      default: Date.now() + 4 * 60 * 1000,
    },
    served: {
      type: Date,
      default: Date.now() + 6 * 60 * 1000,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

app.get("/", (req, res) => {
  res.send("Welcome to the margreeta!");
});

app.post("/create-order", async (req, res) => {
  console.log(req.body);
  const { orderId } = req.body;
  try {
    const product = new Order({
      orderId: orderId,
    });
    const savedProduct = await product.save();
    return res.json({
      message: "ordered successfully",
      product: savedProduct,
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get("/kitchen", async (req, res) => {
  // what should i do? i should check in every order
  // check their currentTimeStamp && what is time in the kitchen field
  // if they have greater value && then drop them from the table
  try {
    const orders = await Order.updateMany(
      { kitchen: Date.now() },
      { $set: { status: true } }
    );
    return res.json(orders);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.get("/served", async (req, res) => {
  try {
    const orders = await Order.updateMany(
      { kitchen: Date.now() },
      { $set: { status: true } }
    );
    return res.json(orders);
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.post("/stop", async (req, res) => {
  try {
    const deletedOrder = await Order.deleteMany();
    res.json(deletedOrder);
  } catch (error) {
    res.json(error.message);
  }
});

app.use((req, res, next) => {
  console.log(req);
  const error = new Error(`Not found - ${req.url}`);
  res.status(404);
  next(error);
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
  console.log("connected to MongoDB");

  app.listen(app.get("port"), function () {
    console.log("API server listening on port " + app.get("port") + "!");
  });
});
