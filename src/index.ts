import express ,{Request, Response}  from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/myUserRoute';
import { v2 as cloudinary } from 'cloudinary';
import MyRestaurantRoute from './routes/MyRestaurantRoute';
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";


mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => console.log("Connected to database"));

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const app = express();

app.use(cors());

// for validation and security reasons we validate using raw not converting the data into json for stripes you do this
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*"}));

app.use(express.json());

app.get("/health",async(req:Request,res:Response) => {
    res.send({message:"health OK!"});
});


app.use("/api/my/user",myUserRoute);

app.use("/api/my/restaurant", MyRestaurantRoute);

app.use("/api/restaurant",restaurantRoute);

app.use("/api/order", orderRoute);


app.listen(5090, () => {
    console.log("Server has started on port 5090");
})