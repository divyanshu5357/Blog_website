import Header from "../components/Header";
import AboutComponent from "../components/About";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <AboutComponent />
      </main>
      <Footer />
    </>
  );
}
