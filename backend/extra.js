// const Order = mongoose.model("Order",{
//     id: {
//         type:String,
//         required: true,
//     },
//     items: {
//         type: Array,
//         required: true,
//     },
//     amount: {
//         type: Number,
//         required: true,
//     },
//     address: {
//         type : Object,
//         required: true,
//     },
//     status: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now(),
//     },
//     payment:{
//         type: Boolean,
//         default: false,
//     }
// })
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  
// app.post("/place",fetchUser,async(req,res)=>{
//     const frontend_url = "http://localhost:3000"
//     try{
//         const newOrder = new Order({
//             id: req.body.id,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//         });
//         await newOrder.save();
//         await User.findByIdAndUpdate(req.body.id,{cartData: {}});
//         console.log("YES")
//         const line_items = req.body.items.map((item)=>({
//             price_data: {
//                 currency: "inr",
//                 product_data:{
//                     name: item.name
//                 },
//                 unit_amount: item.price*100*80
//             },
//             quantity: item.quantity
//         }))
//         line_items.push({
//             price_data: {
//                 currency: "inr",
//                 product_Data:{
//                     name: "Delivery Charges"
//                 },
//                 unit_amount: 2*100*80
//             },
//             quantity: 1
//         })

//         const session = await stripe.checkout.session.create({
//             line_items: line_items,
//             mode: 'payment',
//             success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//             cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`

//         })

//         res.json({success: true, session_url : session.url})
//     }
//     catch(err){
//         console.log(err);
//         res.json({success: false,message: "Error"})
//     }
// })
