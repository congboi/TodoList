import express from "express";
import taskRouter from "./routes/tasksRouters.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

//giúp đọc biến môi trường từ file .env
//
import dotenv from "dotenv";

dotenv.config();


//sau khi gọi dotenv.config() thì sẽ load các biến môi trường vào trong process.env
// nhằm bảo mật thông tin tránh ghi vào đây dễ bị lộ thông tin khi đẩy code lên github, đồng thời cũng giúp dễ dàng thay đổi cấu hình mà ko cần phải sửa code
const PORT = process.env.PORT;

const app = express();


//hệ thống middleware để chuyển đổi từ json sang object để có thể sử dụng được trong các route
// middleware này 1 chiều từ client gửi dạng json và phải đi qua middleware này để chuyển đổi sang object để có thể sử dụng được trong các route, sau đó khi trả về kết quả thì ko cần đi qua middleware này nữa vì res.json() sẽ tự động chuyển đổi object sang json để trả về cho client
// hệ thống kiểm tra xem dữ liệu gửi lên có phải là json hay ko, nếu là json thì sẽ chuyển đổi sang object để có thể sử dụng được trong các route
app.use(express.json());
app.use(cors());


//gọi api của tasksrouters 
//khi muốn đổi tiền tố thì đổi ở đây ko cần phải đổi từng cái 1 trong taskRouter nữa

app.use("/api/tasks", taskRouter);


//gọi hàm kết nối database
connectDB().then(()=>{   
    //chạy server
    app.listen(PORT, () => {
        console.log(`đang chạy trên cổng ${PORT}`);
    });
});



