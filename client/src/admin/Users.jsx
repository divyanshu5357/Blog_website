import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

import {
  getUsers,
  deleteUser,
} from "../services/user.service";

import Card from "../components/admin/Card";
import Button from "../components/admin/Button";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      loadUsers();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
     <div className="flex justify-between items-center mb-8">
  <div>
    <h1 className="text-3xl font-bold">
      Users
    </h1>

    <p className="text-gray-500">
      Manage all users
    </p>
  </div>

  <Button
    onClick={() =>
      navigate("/admin/users/new")
    }
  >
    + New User
  </Button>
</div>

      {users.length === 0 ? (
        <EmptyState
          title="No Users"
          description="No users found."
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 text-left">
                    Avatar
                  </th>

                  <th className="py-4 text-left">
                    Name
                  </th>

                  <th>Email</th>

                  <th>Role</th>

                  <th>Status</th>

                  <th>Created</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
                          {user.firstName?.charAt(0)}
                        </div>
                      )}
                    </td>

                    <td className="font-medium">
                      {user.firstName} {user.lastName}
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "SUPER_ADMIN"
                            ? "bg-purple-100 text-purple-700"
                            : user.role === "ADMIN"
                            ? "bg-blue-100 text-blue-700"
                            : user.role === "EDITOR"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role.replace("_", " ")}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : user.status === "INACTIVE"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      {new Date(
                        user.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      <div className="flex gap-2 justify-center">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            navigate(
                              `/admin/users/edit/${user.id}`
                            )
                          }
                        >
                          <Pencil size={18} />
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() =>
                            handleDelete(user.id)
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
          </div>
        </Card>
      )}
    </div>
  );
}