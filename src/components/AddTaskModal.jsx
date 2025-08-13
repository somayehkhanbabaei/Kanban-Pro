import React from "react";

export default function AddTaskModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-[#0a1f3d] via-[#0b2a4a] to-[#0d3b66] rounded-lg p-6 w-full max-w-md text-white">
        <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

        <form className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Task Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block mb-1 text-sm font-medium">Description</label>
            <textarea
              placeholder="Enter task description"
              className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows="3"
            ></textarea>
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block mb-1 text-sm font-medium">Status</label>
            <select className="w-full p-2 rounded bg-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-purple-500 hover:bg-purple-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
