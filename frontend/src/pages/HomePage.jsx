import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import AddTask from "../components/AddTask";
import DateTimeFilter from "../components/DateTimeFilter";
import StatsAndFilter from "../components/StatsAndFilter";
import TaskList from "../components/TaskList";
import TaskListPagination from "../components/TaskListPagination";
import Footer from "../components/Footer";
import { toast } from "sonner";
import axios from "axios";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";
const HomePage = () => {
  const [taskBuffer,settaskBuffer] = useState([]);
  const [dateQuery, setDateQuery] = useState('Hôm nay');
  const [page, setPage] = useState(1);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState('all')
  useEffect(()=>{
    setPage(1);
    fetchTasks();
  },[dateQuery,filter]);
  const fetchTasks = async()=>{
    try{
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      settaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
      console.log(res.data);
      console.log("FULL RESPONSE:", res.data);
      console.log("TASKS:", res.data.tasks);
      console.log("IS ARRAY:", Array.isArray(res.data.tasks));
    }catch(error){
      console.log("lỗi rồi",error);
      toast.error("Lỗi truy xuất task")
    }
  };
  const handleNewTaskChanged = () =>{
    fetchTasks();
  }
  const handleNext = () =>{
    if(page < totalPages){
      setPage((prev)=> prev + 1);
    }
  }
  const handlePrev = () =>{
    if(page > 1){
      setPage((prev)=> prev - 1);
    }
  }

  const handlePageChange = (newPage) =>{
    setPage(newPage);
  }



  const filteredTasks = taskBuffer.filter((task) =>{
    switch(filter){
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "complete";
      default:
        return true;
    }
  });

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if(visibleTasks.length === 0){
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);



  return (
      <div className="min-h-screen w-full bg-[#f9fafb] relative">
  {/* Diagonal Fade Grid Background - Top Left */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
      backgroundSize: "32px 32px",
      WebkitMaskImage:
        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
      maskImage:
        "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
    }}
  />
     {/* Your Content/Components */}
     
  <div className="container pt-8 mx-auto relative z-10"> 
            <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                {/* Đầu trang */}
                <Header/>
                {/* tạo nhiệm vụ */}
                <AddTask handleNewTaskAdded={handleNewTaskChanged}/>
                {/* thống kê và bộ lọc */}
                <StatsAndFilter
                    filter={filter}
                    setFilter={setFilter}
                    activeTasksCount={activeTaskCount}
                    completedTasksCount={completeTaskCount}
                />
                <div className="min-h-[100px]">
                  <TaskList
                    filteredTasks={visibleTasks}
                    filter={filter}
                    handleTaskChange={handleNewTaskChanged}
                  />
                </div>
                {/* phân trang và lọc theo date time */}
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <TaskListPagination handleNext={handleNext} handlePrev={handlePrev} page={page} totalPages={totalPages} handlePageChange={handlePageChange}/>
                    <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                </div>
                {/* chân trang */}
                <Footer
                  activeTasksCount={activeTaskCount}
                  completedTasksCount={completeTaskCount}
                />
            </div>
        </div>
</div>
    );
};

export default HomePage;
