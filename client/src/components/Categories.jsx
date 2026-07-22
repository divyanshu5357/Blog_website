import { useEffect, useState } from "react";
import { Brain } from "lucide-react";
import { getPublicCategories } from "../services/category.service";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getPublicCategories();

      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="section" id="blogs">
      <div className="section-heading">
        <p className="section-kicker">
          Explore Categories
        </p>

        <h2>
          Blogs that meet real life where it happens.
        </h2>
      </div>

      <div className="category-grid">
        {categories.map((category) => (
<Link
  key={category.id}
  to={`/category/${category.slug}`}
  className="category-card"
>
            <Brain size={28} />

            <h3>
              {category.name}
            </h3>

            <p>
              {category.description ||
                "Explore articles from this category."}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;