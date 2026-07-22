import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../components/admin/Card";
import Button from "../components/admin/Button";

import {
  getCategories,
  updateCategory,
} from "../services/category.service";

import { getCategory } from "../services/category.service";

export default function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [parents, setParents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: "",
  });

  useEffect(() => {
    loadParents();
    loadCategory();
  }, []);

  const loadParents = async () => {
    const res = await getCategories();
    setParents(res.data);
  };

  const loadCategory = async () => {
    const res = await getCategory(id);

    const cat = res.data;

    setForm({
      name: cat.name || "",
      slug: cat.slug || "",
      description: cat.description || "",
      image: cat.image || "",
      parentId: cat.parentId || "",
    });
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name"
        ? { slug: slugify(value) }
        : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateCategory(id, form);

    navigate("/admin/categories");
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold mb-8">
        Edit Category
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          rows={4}
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <select
          name="parentId"
          value={form.parentId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            No Parent
          </option>

          {parents
            .filter((c) => c.id !== id)
            .map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}
        </select>

        <Button type="submit">
          Update Category
        </Button>
      </form>
    </Card>
  );
}