const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const port = 4000
const cors = require('cors')
const mongoose = require('mongoose')

const MONGO_URL = `mongodb+srv://khang2:tHcOGM1Loh6yTpGw@cluster0.cupsw.mongodb.net/test?authSource=admin&replicaSet=atlas-vyloa8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`
const connectDb = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://khang2:tHcOGM1Loh6yTpGw@cluster0.cupsw.mongodb.net/test?authSource=admin&replicaSet=atlas-vyloa8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true',
    )
    console.log('Connect successful')
  } catch (error) {
    console.log(error)
  }
}
connectDb()

const Schema = mongoose.Schema
const productsSchema = new Schema(
  {
    name: String,
    price: String,
    type: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

const ProductModel = mongoose.model('products', productsSchema)

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    limit: '5mb',
    extended: true,
  }),
)

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await ProductModel.find()
    res.status(200).send({ products })
  } catch (error) {
    res.send(error)
  }
})

// Add data product
app.post('/api/products', async (req, res) => {
    const { name, price,type } = req.body
    try {
      const product = await ProductModel.create({ name, price,type })
      res.status(201).send({ success: true, message: 'Created success', product })
    } catch (error) {
      res.status(500).send({
        success: false,
        message: error.message || 'Invalid Server Error',
        error,
      })
    }
  })
app.get('/', (req, res) => {
  res.send('Welcome to my api!. To continue please /api/products')
})

app.listen(process.env.PORT || port)
