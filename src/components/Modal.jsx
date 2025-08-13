import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, children, title }) {
  if (!open) return null;

  // lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = prev);
  }, []);

  const ui = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-[92%] max-w-lg rounded-2xl p-6 bg-white/10 border border-white/15 backdrop-blur-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-white text-xl font-semibold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );

  return createPortal(ui, document.body);
}
