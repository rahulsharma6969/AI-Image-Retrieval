import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { ImageSearch } from "./pages/ImageSearch";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/image-search" element={<ImageSearch />} />
      </Routes>
    </>
  );
};

export default App;
