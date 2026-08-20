import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Categories from "../components/Categories";
import Articles from "../components/Articles";
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
        <About />
        <Categories />
        <Articles />
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