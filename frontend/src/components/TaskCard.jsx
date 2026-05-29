import { cn } from '@/lib/utils';
import { Calendar, CheckCircle, CheckCircle2, Trash2 } from 'lucide-react';
import React from 'react'
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { SquarePen } from 'lucide-react';
import { Circle } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';
import { useState } from 'react';

const TaskCard = ({task, index, handleTaskChange }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");


  const deleteTask = async (taskId) =>{
    console.log("DELETE ID:", taskId);
    try{
      await api.delete(`/tasks/${taskId}`);
      toast.success("Đã xoá nhiệm vụ");
      handleTaskChange();
    }catch(error){
      console.error("Lỗi khi xoá nhiệm vụ",error);
      toast.error("Lỗi khi xoá nhiệm vụ");
    }
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      updateTask();
    }
  }
  const updateTask = async () => {
    try{
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`,{
        title: updateTaskTitle,
      });
      toast.success("Đã cập nhật nhiệm vụ");
      handleTaskChange();
    }catch(error){
      console.error("Lỗi khi cập nhật nhiệm vụ",error);
      toast.error("Lỗi khi cập nhật nhiệm vụ");
    }
  }


  const toggleTaskCompleteButton = async () =>{
    try {
      if(task.status === "active"){
        await api.put(`/tasks/${task._id}`,{
          status: "complete",
          completedAt: new Date(),
        });
        toast.success("Đã hoàn thành nhiệm vụ");
      } else{
        await api.put(`/tasks/${task._id}`,{
          status: "active",
          completedAt: null,
        });
        toast.success("Đã hoàn tác nhiệm vụ");
      }
      handleTaskChange();
    } catch (error) {
      console.error("Lỗi khi cập nhật nhiệm vụ",error);
      toast.error("Lỗi khi cập nhật nhiệm vụ");
    }
  }

  return (
    <Card className = {cn(
      "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
      task.status === "complete" && "opacity-75"
    )}
    style = {{animationDelay: `${index * 50}ms`}}
    >
    <div className='flex items-center gap-4'>
      {/* nút tròn */}
      <Button variant = 'ghost'size="icon" className={cn("flex-shrink-0 size-8 rounded-full transition-all duration-200",
        task.status === "complete"
        ? "text-success hover:text-success/80"
        : "text-muted-foreground hover:text-primary"
      )}
      onClick={toggleTaskCompleteButton}
      >
        {task.status === 'complete' ? (
          <CheckCircle2 className='size-5'/>
        ) : (
          <Circle className='size-5'/>
        )}
      </Button>
      {/* hiển thị hoặc chỉnh sửa tiêu đề */}
      <div className='flex-1 min-w-0'>
        {isEditting ? (
          <Input
            placeholder = 'Cần phải làm gì?'
            className = "flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
            type = "text"
            value = {updateTaskTitle}
            onChange = {(e)=>{
              setUpdateTaskTitle(e.target.value);
            }}
            onKeyPress = {
              handleKeyPress
            }
            onBlur = {() =>{
              setIsEditting(false);
              setUpdateTaskTitle(task.title || "");
            }}
          />
        ) : (
          <p className={cn(
            "text-base transition-all duration-200",
            task.status === 'complete' ?
            "line-through text-muted-foreground"
            : "text-foreground"
          )}> {task.title}</p>
        )
        }
        {/* ngày tạo và ngày hoàn thành */}
      <div className='flex items-center gap-2 mt-1'>
        <Calendar className = "size-3 text-muted-foreground" />
        <span className='text-xs text-muted-foreground'>
          {new Date(task.createdAt).toLocaleString()}
        </span>
        {task.completedAt && (
          <>
          <span className='text-xs text-muted-foreground'> - </span>
          <Calendar className="size-3 text-muted-foreground"/>
          <span className="text-xs text-muted-foreground">
            {new Date(task.completedAt).toLocaleString()}
          </span>
          </>
        )}
      </div>
      </div>
      {/* nút chỉnh và xoá */}
      <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
        {/* nút edit */}
        <Button variant='ghost' size="icon" className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info" onClick={()=>{setIsEditting(true); setUpdateTaskTitle(task.title || "");}}>
          <SquarePen className="size-4"/>
        </Button>
        {/* nút xoá */}
        <Button variant='ghost' size="icon" className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive" onClick={() => deleteTask(task._id)}>
          <Trash2 className="size-4"/>
        </Button>
      </div>
    </div>
    </Card>
  )
}

export default TaskCard