//thư viện mongoose để kết nối database mongodb
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        //lấy biến môi trường MONGODB_CONNECTIONSTRING từ file .env để kết nối đến database mongodb
        await mongoose.connect(process.env.MONGODB_CONNECTIONSTRING);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        //khi có lỗi kết nối thì cass luôn server để tránh chạy tiếp
        //nếu ko có thì app vẫn chạy nhưng ko kết nối được database, client sẽ ko biết và có thể sẽ gây ra lỗi
        process.exit(1);
    }
};