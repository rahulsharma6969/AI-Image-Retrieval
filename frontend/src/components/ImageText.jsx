import { useState } from "react";
import { Modal } from "./Modal";

function Button({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function ImageText({ setIsModalOpen }) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 border-2 border-dashed border-gray-300 rounded-lg p-8 shadow-lg py-20">
      <p className="text-xl font-semibold text-white text-center">
        Search with Image and Your Caption/Description
      </p>
      <Button onClick={openModal} className="px-6 py-3 text-lg font-medium bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition">
        Upload Image
      </Button>
      {open && <Modal onClose={closeModal} />}
    </div>
  );
}
