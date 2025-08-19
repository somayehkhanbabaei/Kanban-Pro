import React from "react";
import Input from "./Input";
import ButtonLayout from "./‌ButtonLayout";
import { FileText, Users, Calendar as Cal } from "lucide-react";

export default function AddProjectForm() {
  return (
    <form className="space-y-4">
      {/* Project name */}
      <Input type="text" placeholder="Project name" icon={FileText} />

      {/* Team members (just a number for UI) */}
      <Input type="number" placeholder="Team members" icon={Users} />

      {/* Due date */}
      <div className="flex gap-2">
        <div className="flex-1">
          <Input type="date" placeholder="Due date" icon={Cal} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <ButtonLayout type="submit">Create Project</ButtonLayout>
      </div>
    </form>
  );
}
