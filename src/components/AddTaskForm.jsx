import React, { useState } from "react";
import Input from "./Input";
import ButtonLayout from "./‌ButtonLayout";
import { ListChecks, Tag, Calendar as Cal, Flag, FileText } from "lucide-react";

export default function AddTaskForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    dueDate: "",
    priority: "Medium",
    status: "Pending",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }

    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate,
        tag: formData.tag.trim(),
        description: formData.description.trim(),
      });

      // Reset form
      setFormData({
        title: "",
        tag: "",
        dueDate: "",
        priority: "Medium",
        status: "Pending",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Task title */}
      <div>
        <Input
          type="text"
          placeholder="Task title"
          icon={ListChecks}
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        {errors.title && (
          <p className="text-red-400 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Enter task description..."
          className="w-full p-3 rounded-lg backdrop-blur-xl bg-white/10 border border-white/15 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
          rows="3"
        />
      </div>

      {/* Tag / Label */}
      <Input
        type="text"
        placeholder="Tag (e.g., UI, Backend)"
        icon={Tag}
        value={formData.tag}
        onChange={(e) => handleInputChange("tag", e.target.value)}
      />

      {/* Due date */}
      <div>
        <Input
          type="date"
          placeholder="Due date"
          icon={Cal}
          value={formData.dueDate}
          onChange={(e) => handleInputChange("dueDate", e.target.value)}
        />
        {errors.dueDate && (
          <p className="text-red-400 text-sm mt-1">{errors.dueDate}</p>
        )}
      </div>

      {/* Priority */}
      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          Priority
        </label>
        <select
          value={formData.priority}
          onChange={(e) => handleInputChange("priority", e.target.value)}
          className="w-full p-3 rounded-lg backdrop-blur-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="Low" className="bg-gray-800">
            Low
          </option>
          <option value="Medium" className="bg-gray-800">
            Medium
          </option>
          <option value="High" className="bg-gray-800">
            High
          </option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-white/70 text-sm font-medium mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => handleInputChange("status", e.target.value)}
          className="w-full p-3 rounded-lg backdrop-blur-xl bg-white/10 border border-white/15 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="Pending" className="bg-gray-800">
            Pending
          </option>
          <option value="In Progress" className="bg-gray-800">
            In Progress
          </option>
          <option value="Completed" className="bg-gray-800">
            Completed
          </option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-white/70 hover:bg-white/15 transition"
        >
          Cancel
        </button>
        <ButtonLayout type="submit">Add Task</ButtonLayout>
      </div>
    </form>
  );
}
