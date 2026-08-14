import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../components/admin/Button";
import Card from "../components/admin/Card";

import {
  createPost,
  getCategories,
} from "../services/posts.service";

export default function CreatePost() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categoryId: "",
    status: "DRAFT",
    visibility: "PUBLIC",
    featured: false,
    allowComments: true,
    readingTime: 5,
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();

      setCategories(res.data.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createPost(form);

      alert("Post Created");

      navigate("/admin/posts");
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <Card>

      <h2 className="text-3xl font-bold mb-8">
        Create Post
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
        />

        <textarea
          rows="3"
          className="w-full border rounded-lg p-3"
          placeholder="Excerpt"
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
        />

        <textarea
          rows="10"
          className="w-full border rounded-lg p-3"
          placeholder="Content"
          name="content"
          value={form.content}
          onChange={handleChange}
        />

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="DRAFT">
            Draft
          </option>

          <option value="PUBLISHED">
            Publish
          </option>
        </select>

        <label className="flex gap-2 items-center">

          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          Featured

        </label>

        <Button>
          Save Post
        </Button>

      </form>

    </Card>
  );
}