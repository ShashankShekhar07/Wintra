const Stripe= require("stripe")
const PORT=4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt  =require("jsonwebtoken");
const multer =require("multer");
const path = require("path"); //get access to backend directory in express app
const cors= require("cors");

const dotenv = require("dotenv");

dotenv.config({path: "config.env"});

app.use(express.json());
app.use(cors()); //React js will connect to backend on 4000 port


//Database connection with mongodb
mongoose.connect(process.env.CONNECTION_URL);
app.get("/",(req,res)=>{
    res.send("Let's go")
})

//Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})

//Creating upload Endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    })
})

//Schema for creating Products
const Product = mongoose.model("Product",{
    id: {
        type:Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type : String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    available:{
        type: Boolean,
        default: true,
    }
})

app.post("/addproduct",async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product =last_product_array[0];
        id=last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name: req.body.name,
    })
})

app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id: req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);

})

//User Schema 
const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type:Date,
        default: Date.now(),
    }
})


//Creating end point for creating user
app.post('/signup',async(req,res)=>{
    
     
    let check = await(User.findOne({email: req.body.email}));
    if(check){
        return res.status(400).json({success: false,errors: "Existing user found with same email id"});
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    
    const user = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    const data = {
        user: {
            id: user.id
        }
    }
   

    const token = jwt.sign(data,'secret_ecom');
    res.json({success: true,token})
})

app.post('/login',async(req,res)=>{
    let user = await User.findOne({email: req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({
                success: true,
                token
            })
        }
        else{
            res.json({success: false,error: "Wrong Password"});
        }
       
    }
    else{
        res.json({success: false, errors: "Wrong email id"});
    }
})

//newcollection
app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    // console.log("All Products Fetched");
    let newcollection = products.slice(1).slice(-8);
    res.send(newcollection);
})
//popularinwomen
app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category: "women"});
    // console.log("All Products Fetched");
    let popularinwomen = products.slice(0,4);
    res.send(popularinwomen);
})
//creating middleware to fetch user
const fetchUser = async(req,res,next) => {
    const token = req.header('auth-token');
    // const token = req.body.token;
    if(!token){
        res.status(401).send({errors: "Please authenticate using valid token"})
    }
    else{
        try{
            const data= jwt.verify(token,'secret_ecom');
            req.user = data.user;
            console.log(req.user.id);
            next();
        }
        catch(error){
            res.status(401).send({errors: "please authenticate using a valid token"});
        }
    }
}

//Creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    // console.log(req.body,req.user);
    console.log("added",req.body.itemId);
    let userdata =await User.findOne({_id: req.user.id});
    // console.log(userdata);
    userdata.cartData[req.body.itemId] +=1;
    await User.findOneAndUpdate(
        {_id: req.user.id},
        {cartData: userdata.cartData}
    )
    res.send("Added")
})

//creating endpoint to remove producct from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userdata =await User.findOne({_id: req.user.id});
    console.log("removed",req.body.itemId);
    if(userdata.cartData[req.body.itemId]>0){
        userdata.cartData[req.body.itemId] -=1;
    }
    await User.findOneAndUpdate(
        {_id: req.user.id},
        {cartData: userdata.cartData}
    )
    res.send("Removed")
})

//Creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("getcart");
    let userdata =await User.findOne({_id: req.user.id});
    res.json(userdata.cartData);
})

const Order = mongoose.model("Order",{
    userId: {
        type:String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type : Object,
        required: true,
    },
    status: {
        type: String,
        default: "Placed Order",
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    payment:{
        type: Boolean,
        default: false,
    }
})
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/place",fetchUser,async(req,res)=>{
    const frontend_url = "http://localhost:3000"
    try{
        console.log(req.body.id);
        const newOrder = new Order({
            userId: req.user.id,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });
        await newOrder.save();

        let cart ={};
        for(let index=0; index<300+1; index++){
            cart[index]=0;
        }
        await User.findByIdAndUpdate(req.user.id,{cartData: cart});
        // console.log("YES")
        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency: "inr",
                product_data:{
                    name: item.name
                },
                unit_amount: item.new_price*100*80
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "inr",
                product_data:{
                    name: "Delivery Charges"
                },
                unit_amount: 2*100*80
            },
            quantity: 1
        })
// console.log(line_items);
// console.log(`${frontend_url}/verify?success=true&orderId=${newOrder._id}`)

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`

        })

        res.json({success: true, session_url : session.url})
    }
    catch(err){
        console.log(err);
        res.json({success: false,message: "Error"})
    }
})

app.post("/verify",async(req,res)=>{
    const {orderId,success} = req.body;
    try{
        if(success==="true"){
            await Order.findByIdAndUpdate(orderId,{payment: true});
            res.json({success: true,message: "Paid"})
        }
        else{
            await Order.findByIdAndDelete(orderId);
            res.json({success: false,message: "Not Paid"});
        }
    }
    catch(err){
        console.log(err)
        res.json({success: false,message: "Error"})
    }
})

//user orders for frontend
app.post("/userorders",fetchUser,async(req,res)=>{
    try{
        const orders= await Order.find({userId: req.user.id})
        res.json({success: true, data: orders})
    }catch(err){
        console.log(err);
        res.json({success: false,message: "Error"})
    }
})

//Api for listing orders for admin panel

app.get("/list",async(req,res)=>{
    try{
        const orders= await Order.find({});
        res.json({success: true,data: orders});
    }
    catch(err){
        console.log(err);
        res.json({success: false,message: "error"});
    }
})

//api for updating order status;
app.post("/status",async(req,res)=>{
    try{
        await Order.findByIdAndUpdate(req.body.orderId,{status: req.body.status})
        res.json({success: true,message: "Status Updated"});
    }
    catch(err){
        console.log("Error")
        res.json({success: false,message: "Error"})
    }
})

//API CREATION
app.listen(PORT, (err)=>{
    if(!err){
        console.log("server running on port"+PORT)
    }
    else{
        console.log("error" + err)
    }
})