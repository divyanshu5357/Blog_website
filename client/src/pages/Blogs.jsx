import Header from "../components/Header";
import CategoriesComponent from "../components/Categories";
import ArticlesComponent from "../components/Articles";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Blogs() {
  return (
    <>
      <SEO
        title="All Articles & Blogs"
        description="Browse through our full library of published blogs, tutorials, and technology insights."
      />
      <Header />
      <main className="pt-20">
        <CategoriesComponent />
        <ArticlesComponent />
      </main>
      <Footer />
    </>
  );
}
