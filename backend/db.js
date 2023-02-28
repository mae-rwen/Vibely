const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const connect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
    } catch (error) {
        throw error;
    }
}

// mongoose.connect.on("disconnected", () => {
//     console.log("MongoDB disconnected!")
// })

// mongoose.connect.on("connected", () => {
//     console.log("MongoDB connected!")
// })
mongoose.connect(process.env.CONNECTION_STRING);