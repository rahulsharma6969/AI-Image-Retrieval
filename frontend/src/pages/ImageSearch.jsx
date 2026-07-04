import React, { useState } from "react";
import SearchBar from "../sections/SearchBar";
import ImageGrid from "../sections/ImageGrid";
import FileDrop from "../sections/FileDrop";

export const ImageSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SearchBar />
      <FileDrop setIsModalOpen={setIsModalOpen} />
      <div className={isModalOpen ? "fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" : ""}>
        <ImageGrid />
      </div>
    </>
  );
};
