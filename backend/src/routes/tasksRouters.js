//đây là file định nghĩa các route cho các api liên quan đến tasks, trong đó sẽ gọi các hàm controller để xử lý logic của từng api

//khai báo router của express để định nghĩa các route 
import express from "express";
//import các hàm controller để xử lý logic của từng api
import { createTask, getAllTasks, updateTask, deleteTask } from "../controllers/taskController.js";
//tạo router
const router = express.Router();



//tạo các api
//các tiền tố / có nghĩa là api sẽ bắt đầu từ /api/tasks vì đã định nghĩa ở server.js là app.use("/api/tasks", taskRouter);


//api lấy tất cả các task 
// /app/tasks
router.get("/", getAllTasks);

//api tạo task mới
// /app/tasks
router.post("/", createTask);


//api cập nhật task theo id
// /app/tasks/:id
router.put("/:id", updateTask);

//api xóa task theo id
// /app/tasks/:id
router.delete("/:id", deleteTask);

//export router để sử dụng trong server.js
export default router