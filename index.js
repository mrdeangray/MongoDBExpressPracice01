const express = require('express')
const res = require('express/lib/response')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })




app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));


app.listen(3000, ()=>{
    console.log("APP is listening on port 3000")
})

app.get('/products/new',(req, res)=>{
    //res.send("hello new")
    res.render('products/new')

})
app.post('/products', async(req, res)=>{
    //console.log(req.body)
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)
    //res.send(`the new product is: ${newProduct}`)

})


app.get('/products',async (req, res)=> {
    const products = await Product.find({})
    console.log(products)
    res.render("products/index", {products})
})



app.get('/products/:id', async(req, res)=> {
    const {id} = req.params
    const product = await Product.findById(id)
    console.log(product)
    
    //res.send(`show details for ${product.name}`)
    res.render("products/show", {product})
})


app.get('/products/:id/edit', async(req, res)=> {
    const {id} = req.params
    const product = await Product.findById(id)
    //console.log(product)
    res.render("products/edit", {product})
})

app.put('/products/:id', async (req, res)=> {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators:true, new: true})
    res.redirect(`/products/${product._id}`)
    // res.render("products/edit", {product})
})

app.delete('/products/:id', async (req, res)=> {
    //res.send("You made to the delete page")
     const {id} = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect("/products")
 
})

app.get('/cat', (req, res) => {
  res.send("MEOW2")
})
 



