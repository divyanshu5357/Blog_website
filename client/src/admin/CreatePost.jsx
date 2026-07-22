import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Button from "../components/admin/Button";
import Card from "../components/admin/Card";
import { uploadImage } from "../services/posts.service";
import TiptapEditor from "../components/admin/editor/TiptapEditor";

import {createPost,getCategories,} from "../services/posts.service";

import { useNavigate, useParams } from "react-router-dom";


export default function CreatePost() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  categoryId: "",
  coverImage: "",
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

      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
};

 const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  setForm((prev) => {
    const updated = {
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    };

    if (name === "title") {
      updated.slug = generateSlug(value);
    }

    return updated;
  });
};

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    const res = await uploadImage(file);

    setForm((prev) => ({
      ...prev,
      coverImage: res.data.url,
    }));

    setPreview(res.data.url);
  } catch (err) {
    console.error(err);
  } finally {
    setUploading(false);
  }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    // Beautiful Toast Promise that tracks the saving state
    toast.promise(
      createPost(form),
      {
        loading: 'Creating post...',
        success: () => {
          // Redirect to posts manager after successful creation
          setTimeout(() => navigate("/admin/posts"), 1000);
          return <b>Post created successfully!</b>;
        },
        error: <b>Failed to create post. Please try again.</b>,
      },
      {
        style: {
          minWidth: '250px',
          borderRadius: '8px',
          background: '#333',
          color: '#fff',
        },
      }
    );
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

<div>

  <label className="block mb-2 font-medium">
    Cover Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
  />

  {uploading && (
    <p className="text-blue-600 mt-2">
      Uploading...
    </p>
  )}

  {preview && (
    <img
      src={preview}
      alt=""
      className="mt-4 rounded-lg w-60"
    />
  )}

</div>
        <textarea
          rows="3"
          className="w-full border rounded-lg p-3"
          placeholder="Excerpt"
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
        />

        <div>

  <label className="block mb-2 font-medium">
    Content
  </label>

  <TiptapEditor
    value={form.content}
    onChange={(content) =>
      setForm((prev) => ({
        ...prev,
        content,
      }))
    }
  />

</div>

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

        <Button type="submit">
  Save Post
</Button>

      </form>

    </Card>
  );
}