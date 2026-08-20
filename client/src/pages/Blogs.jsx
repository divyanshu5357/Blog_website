import Header from "../components/Header";
import CategoriesComponent from "../components/Categories";
import ArticlesComponent from "../components/Articles";
import Footer from "../components/Footer";

export default function Blogs() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <CategoriesComponent />
        <ArticlesComponent />
      </main>
      <Footer />
    </>
  );
}
