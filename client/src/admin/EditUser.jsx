import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../components/admin/Card";
import Button from "../components/admin/Button";

import {
  getUser,
  updateUser,
} from "../services/user.service";

export default function EditUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    role: "AUTHOR",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const res = await getUser(id);

      setForm({
        firstName: res.data.firstName || "",
        lastName: res.data.lastName || "",
        username: res.data.username || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        role: res.data.role,
        status: res.data.status,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateUser(id, form);

    navigate("/admin/users");
  };

  return (
    <Card>
      <h2 className="text-3xl font-bold mb-8">
        Edit User
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="SUPER_ADMIN">
            Super Admin
          </option>

          <option value="ADMIN">
            Admin
          </option>

          <option value="EDITOR">
            Editor
          </option>

          <option value="AUTHOR">
            Author
          </option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>

          <option value="BLOCKED">
            Blocked
          </option>
        </select>

        <Button type="submit">
          Update User
        </Button>
      </form>
    </Card>
  );
}