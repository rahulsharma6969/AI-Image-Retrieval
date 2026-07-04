import React, { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";

const MyDropzone = ({ onDrop }) => {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      console.log("Dropped files:", acceptedFiles);
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: "image/*",
  });

  return (
    <div
      {...getRootProps()}
      className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-200 hover:border-blue-500"
    >
      <input {...getInputProps()} />
      <Upload className="text-blue-500 mb-2" size={24} />
      <p className="text-lg font-semibold text-blue-500">Upload Image</p>
      <p className="text-gray-500 text-sm">or drop a file here</p>
    </div>
  );
};

export const Modal = ({ onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white/10 backdrop-blur-lg shadow-2xl border border-white/20 rounded-2xl p-8 flex flex-col gap-6 items-center text-white max-w-xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-full transition duration-200"
            >
              <X size={24} className="text-white" />
            </button>

            <h1 className="text-4xl font-extrabold text-center">
              IMAGE RETRIEVAL
            </h1>
            <p className="text-xl font-semibold text-center">
              Transforming the Way Images Are Searched – Forever!
            </p>

            <form className="w-full flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter Your Caption"
                required
                className="w-full px-4 py-3 text-black bg-white rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 transition"
              />
              <div className="w-full">
                <MyDropzone />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-500 hover:bg-indigo-600 transition text-white font-semibold py-3 rounded-lg shadow-md"
              >
                Search Now
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
