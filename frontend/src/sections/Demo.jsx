import { Element } from "react-scroll";

const Demo = () => {
  return (
    <section>
      <Element
        name="demo"
        className="g7 relative pb-32 pt-24 max-lg:pb-24 max-md:py-16 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-6">Demo Video</h2>
        <video
          className="w-full max-w-3xl rounded-lg shadow-lg"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="MindFlix.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Element>
    </section>
  );
};

export default Demo;
