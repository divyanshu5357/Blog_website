import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import CategoriesSection from "../components/CategoriesSection";
import FeaturedArticles from "../components/FeaturedArticles";
import LiveSessions from "../components/LiveSessions";
import MostRead from "../components/MostRead";
import Resources from "../components/Resources";
import Subscribe from "../components/Subscribe";
import Community from "../components/Community";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <CategoriesSection />
        <FeaturedArticles />
        <LiveSessions />
        <MostRead />
        <Resources />
        <Subscribe />
        <Community />
      </main>
      <Footer />
    </>
  );
}