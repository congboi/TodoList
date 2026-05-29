import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import api from "@/lib/axios";

const AddTask = ({handleNewTaskAdded}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () => {
        if(newTaskTitle.trim()){
            try{
                await api.post("/tasks",{title:newTaskTitle});
                toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào`);
                handleNewTaskAdded();
            } catch(error){
                console.error("Lỗi xảy ra khi thêm task mới:", error);
                toast.error(`lỗi xảy ra khi thêm nhiệm vụ mới`)
            }
            setNewTaskTitle("");
        }else{
            toast.error("Vui lòng nhập tên nhiệm vụ")
        }
    }
    const handleKeyPress = (event) => {
        if(event.key === "Enter"){
            addTask();
        }
    }
    return (
        <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                    type="text"
                    placeholder="Thêm Task"
                    className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                    value={newTaskTitle}
                    onChange={(event) => setNewTaskTitle(event.target.value)}
                    onKeyPress ={handleKeyPress}
                />
                <Button
                    size="xl"
                    className="bg-gradient-primary hover:bg-gradient-primary/80 text-white px-6"
                    onClick={addTask}
                    disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5" />
                </Button>
            </div>
        </Card>
    );
};

export default AddTask;