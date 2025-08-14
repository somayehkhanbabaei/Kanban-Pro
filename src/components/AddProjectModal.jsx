import Modal from "./Modal.jsx";
import AddProjectForm from "./AddProjectForm.jsx";

export default function AddProjectModal({ isOpen, onClose }) {
  return (
    <Modal open={isOpen} onClose={onClose} title="Create Project">
      <AddProjectForm />
    </Modal>
  );
}