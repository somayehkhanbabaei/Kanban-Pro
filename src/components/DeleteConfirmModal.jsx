import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="backdrop-blur-xl bg-white/10 border border-white/15 rounded-xl p-6 w-full max-w-md relative shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/70 hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Warning icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-red-500/20">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-white text-xl font-semibold text-center mb-2">
          Delete Task?
        </h2>

        {/* Message */}
        <p className="text-white/70 text-center mb-6">
          Are you sure you want to delete{" "}
          <span className="text-white font-medium">"{taskTitle}"</span>?
          <br />
          <span className="text-red-300 text-sm">
            This action cannot be undone.
          </span>
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/15 text-white/70 hover:bg-white/15 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
