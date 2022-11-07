const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

// create schema
const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: Number,
      required: true,
      unique: true
    },
    kitchen: {
      type: Date,
      default: Date.now() + 4 * 60 * 1000
    },
    served: {
      type: Date,
      default: Date.now() + 6 * 60 * 1000
    }
  },
  { timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)

app.get('/', (req, res) => {
  res.send('Welcome to the margreeta!')
})

app.post('/create-order', async (req, res) => {
  console.log(req.body)
  const { orderId } = req.body
  try {
    const product = new Order({
      orderId: orderId
    })
    const savedProduct = await product.save()
    return res.json({
      message: 'ordered successfully',
      product: savedProduct
    })
  } catch (error) {
    return res.json({
      message: error.message
    })
  }
})

app.get('/kitchen', async (req, res) => {
  // what should i do? i should check in every order
  // check their currentTimeStamp && what is time in the kitchen field
  // if they have greater value && then drop them from the table
  try {
    const orders = await Order.find()
    return res.json(orders)
  } catch (error) {
    return res.json({
      message: error.message
    })
  }
})

app.get('/served', async (req, res) => {
  // less or equal to current time i will pass you
})

app.post('/stop', async (req, res) => {
  const { orderId } = req.body
  try {
    const order = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: true }
    )
    return res.json({
      message: 'Successfully updated',
      order: order
    })
  } catch (error) {
    return res.json({
      message: error.message
    })
  }
})

app.use((req, res, next) => {
  console.log(req)
  const error = new Error(`Not found - ${req.url}`)
  res.status(404)
  next(error)
})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL)
    console.log(`MongoDB Connected : ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

connectDB()

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server started at http://localhost/${port}`)
})
