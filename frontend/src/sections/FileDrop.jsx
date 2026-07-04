import SketchArea from "../components/SketchArea";
import MyDropzone from "../components/Dropzone";
import ImageText from "../components/ImageText";

const FileDrop = ({ setIsModalOpen }) => {
  const handleFiles = (files) => {
    console.log("Received files:", files);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pt-8 pb-4">
      <MyDropzone onDrop={handleFiles} />
      <SketchArea />
      <ImageText setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default FileDrop;
