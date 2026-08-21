import Header from "../components/Header";
import AboutComponent from "../components/About";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn more about AARAMBH CMS, our mission to empower creators, and our live learning platform."
      />
      <Header />
      <main className="pt-20">
        <AboutComponent />
      </main>
      <Footer />
    </>
  );
}
