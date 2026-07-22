import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  getCategories,
  deleteCategory,
} from "../services/category.service";

import Button from "../components/admin/Button";
import Card from "../components/admin/Card";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;

    await deleteCategory(id);

    loadCategories();
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <p className="text-gray-500">
            Manage all categories
          </p>
        </div>

        <Button
          onClick={() =>
            navigate("/admin/categories/new")
          }
        >
          + New Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <EmptyState
          title="No Categories"
          description="Create your first category."
        />
      ) : (
        <Card>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">
                  Name
                </th>

                <th>Slug</th>

                <th>Parent</th>

                <th>Created</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat.id}
                  className="border-b"
                >
                  <td className="py-4">
  <div className="font-semibold">
    {cat.name}
  </div>

  {cat.parent && (
    <div className="text-sm text-gray-500">
      Child of: {cat.parent.name}
    </div>
  )}
</td>

                  <td>{cat.slug}</td>

                  <td>
                    {cat.parent?.name || "-"}
                  </td>

                  <td>
                    {new Date(
                      cat.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          navigate(
                            `/admin/categories/edit/${cat.id}`
                          )
                        }
                      >
                        <Pencil size={18} />
                      </Button>

                      <Button
                        variant="danger"
                        onClick={() =>
                          handleDelete(cat.id)
                        }
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}