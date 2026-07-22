import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../components/admin/Card";
import Button from "../components/admin/Button";

import {
  createCategory,
  getCategories,
} from "../services/category.service";

export default function CreateCategory() {
  const navigate = useNavigate();

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
  }, []);

  const loadParents = async () => {
    const res = await getCategories();
    setParents(res.data);
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

    await createCategory(form);

    navigate("/admin/categories");
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold mb-8">
        Create Category
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          name="name"
          placeholder="Category Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="slug"
          placeholder="Slug"
          value={form.slug}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={4}
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

          {parents.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <Button type="submit">
          Save Category
        </Button>
      </form>
    </Card>
  );
}