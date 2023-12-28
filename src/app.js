const express = require('express');
const app = express();
const connectDB = require('./db/connection')
const cors = require('cors');
require('dotenv').config()
const PORT = process.env.PORT || 3000;
const BannerImage = require('./Controllers/Products/BannerImage');
const categoryRoute = require('./Controllers/Products/Category');
const productsRoutes = require('./Controllers/Products/Product');
 

app.use(cors());
app.get("/", (req, res) => {
    res.send("Hi, I am live");
})
app.use(express.json());
app.use('/api/BannerImage', BannerImage);
app.use('/api/Category', categoryRoute);
app.use('/api/Products', productsRoutes)
const start = async() => {
    try{
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`${process.env.PORT} yes i am connected`);
        })
    }catch(err){
        console.log(err.message);
    }
}

start();