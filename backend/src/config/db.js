const mongoose= require("mongoose");

async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
            family: 4,
            tls: true
        });
        console.log("Mongo DB connected");
    }catch(error){
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
}
module.exports= connectDB;
