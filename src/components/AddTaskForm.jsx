import React from "react";
import Input from "./Input";
import ButtonLayout from "./‌ButtonLayout";
import { ListChecks, Tag, Calendar as Cal } from "lucide-react";

export default function AddTaskForm() {
  return (
    <form className="space-y-4">
      {/* Task title */}
      <Input type="text" placeholder="Task title" icon={ListChecks} />

      {/* Tag / Label */}
      <Input type="text" placeholder="Tag (e.g., UI, Backend)" icon={Tag} />

      {/* Due date */}
      <Input type="date" placeholder="Due date" icon={Cal} />

      {/* Actions */}
      <div className="flex gap-2">
        <ButtonLayout type="submit">Add Task</ButtonLayout>
      </div>
    </form>
  );
}
