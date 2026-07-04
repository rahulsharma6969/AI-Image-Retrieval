import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { useCallback } from "react";

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
      className="w-full h-80 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-200 hover:border-blue-500"
    >
      <input {...getInputProps()} />
      <Upload className="text-blue-500 mb-2" size={24} />
      <p className="text-lg font-semibold text-blue-500">Upload Image</p>
      <p className="text-gray-500 text-sm">or drop a file here</p>
    </div>
  );
};

export default MyDropzone;
