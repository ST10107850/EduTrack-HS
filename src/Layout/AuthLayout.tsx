import { Navbar } from "../components/Navbar";
import { Newsletter } from "../components/Newsletter";
import { Contact } from "../components/Contact";
// import { NewUsers } from "../Pages/NewUsers";
import About from "../components/About";
import Staff from "../components/Staff";
import Footer from "../components/Footer";
import { NewUsers } from "../Pages/NewUsers";

export const AuthLayout = () => {
  return (
    <>
      <Navbar />
      <section id="hero">
        <Newsletter />
      </section>
      <section id="about">
        <About />
        <Staff />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer/>
    </>
  );
};
