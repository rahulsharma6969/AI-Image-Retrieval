import Header from "../sections/Header.jsx";
import Hero from "../sections/Hero.jsx";
import Features from "../sections/Features.jsx";
import Faq from "../sections/Faq.jsx";
import Demo from "../sections/Demo.jsx";
import Footer from "../sections/Footer.jsx";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Features />
      <Faq />
      <Demo />
      <Footer />
    </main>
  );
};

export default Home;
