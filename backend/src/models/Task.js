import mongoose from "mongoose";

//tạo schema cho task, schema là cấu trúc dữ liệu của task trong database mongodb, 
// nó sẽ định nghĩa các trường và kiểu dữ liệu của task, 
// ở đây mình sẽ tạo 1 schema có trường title là string, status là string có giá trị là "active" hoặc "complete", completedAt là date để lưu thời gian hoàn thành task
const taskSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            //required có nghĩa là trường này bắt buộc phải có, nếu ko có sẽ trả về lỗi khi tạo task mới
            required: true,
            // loại bỏ khoảng trắng ở đầu và cuối chuỗi 
            trim: true,
        },

        status:{
            type: String,
            enum: ["active","complete"],
            default:"active",
        },
        //completedAt có nghĩa là thời gian hoàn thành task, nếu status là complete thì sẽ lưu thời gian hoàn thành vào trường này, nếu status là active thì sẽ để null
        completedAt:{
            type: Date,
            default: null,
        },
    },
    {
        //
        timestamps: true  //tự động tạo createdAt và updatedAt
    }
)
//tạo model cho task, model là đối tượng để tương tác với database mongodb,là công cụ để làm việc với collection trong database
// nó là cầu nối giữa codejs và mongodb
// model cung cấp các hàm có sẵn như:
// Task.find()
// Task.findById()
// Task.create()
// Task.findByIdAndUpdate()
// Task.deleteOne()
// // nó sẽ cung cấp các phương thức để thực hiện các thao tác với database mongodb như tạo, đọc, cập nhật, xóa task
const Task = mongoose.model("Task",taskSchema);

export default Task;

