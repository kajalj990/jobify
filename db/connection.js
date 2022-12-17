import mongoose from "mongoose";


const connectDB = (url) => {
  console.log("connected success")
  return mongoose.connect(url);
}

export default connectDB