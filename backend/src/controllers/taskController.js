import express from "express";
//import model từ task , đây là cầu nối để làm việc với database
import Task from "../models/Task.js";

//logic xử lý api get
export const getAllTasks = async(req, res) => {
    const {filter = 'Hôm nay'} = req.query;
    const now = new Date();
    let startDate;

    switch (filter) {
        case 'Hôm nay':
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        case 'Tuần này':
            const mondayDate = now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        case 'Tháng này':
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        case 'Tất cả':
        default:
            startDate = null;
            break;
    }
    const query = startDate ? {createdAt: {$gte: startDate}} : {};
    try {
        //tạo 1 biến lấy tất cả các task trong database bằng hàm find() của mongoose, hàm này sẽ trả về 1 mảng các task
        // const tasks = await Task.find().sort({createdAt: -1}); //có thể thay bằng desc = 1 đều là sắp xếp giảm dần theo createdAt, tức là task mới sẽ được trả về trước, nếu muốn sắp xếp tăng dần thì thay bằng 1 hoặc asc
        const result = await Task.aggregate([
            {$match: query},
            {
                $facet: {
                    tasks: [{$sort: {createdAt: -1}}],
                    activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
                    completeCount: [{ $match: { status: "complete" } }, { $count: "count" }]
                },
            }
        ]);
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;
        // const activeCount = await Task.countDocuments({status: "active"});
        // const deletedCount = await Task.countDocuments({status: "delete"});
        // trả về kết quả dạng json nếu thành công, status 200 có nghĩa là thành công, 
        res.status(200).json({tasks, activeCount, completeCount});
        console.log("Lấy dữ liệu thành công");
    } catch (error) {

        console.log("Lỗi gọi danh sách mẹ m rồi",error);
        //nếu có lỗi sẽ trả về status 500 và json có nghĩa là lỗi hệ thống
        res.status(500).json({message:"lỗi hệ thống"})
    }
};


//logic xử lý api post
export const createTask = async(req, res) => {
    try{
        // tạo 1 destructuring để lấy trường title từ req.body, req.body là dữ liệu gửi lên từ client, ở đây mình chỉ cần trường title để tạo task mới, còn các trường khác sẽ có giá trị mặc định đã định nghĩa trong schema
        const {title} = req.body
        //tạo 1 biến task tham chiếu đến model Task
        // new Task là tạo 1 bản ghi mới (chưa lưu vào database)
        // {title} là dữ liệu đưa vào để tạo task mới 
        const task = new Task({title});

        //tạo một biến newTask
        // gọi hàm save() của model để lưu task mới vào database,
        const newTask = await task.save();

        //trả về kết quả dạng json 
        res.status(201).json(newTask);
        console.log("Tạo task thành công");
    }
    catch(error){
        console.log("Lỗi tạo task mẹ m rồi",error);
        res.status(500).json({message:"lỗi hệ thống"})
    }
}                    

export const updateTask = async (req, res) => {
    try{
        const {title, status, completedAt} = req.body;
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            {new: true}
        );
        if(!updatedTask){
            return res.status(404).json({message:"Task không tồn tại"});
        }
        console.log("Cập nhật task thành công");
        res.status(200).json(updatedTask);
    } catch(error){
        console.error("Lỗi cập nhật task mẹ m rồi", error);
        res.status(500).json({message:"lỗi hệ thống"});
    }

}

export const deleteTask =async (req, res) => {
    try{
        const deletedTask = await Task.findByIdAndDelete(
            req.params.id,
        );
        if(!deletedTask){
            return res.status(404).json({message:"Task không tồn tại"});
        }
        console.log("Xóa task thành công");
        res.status(200).json(deletedTask);
    }catch(error){
        console.error("Lỗi xóa task mẹ m rồi", error);
        res.status(500).json({message:"lỗi hệ thống"});
    }
}