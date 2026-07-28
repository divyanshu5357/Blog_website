import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function RegisterSessionModal({
  open,
  onClose,
  session,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open || !session) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `http://localhost:8000/api/live-sessions/${session.id}/register`,
        form
      );

      toast.success(data.message);

      setForm({
        name: "",
        email: "",
      });

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-xl">

        <h2 className="text-2xl font-bold mb-2">
          Register
        </h2>

        <p className="text-gray-500 mb-6">
          {session.title}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="px-6 py-2 rounded-lg bg-violet-600 text-white"
            >
              {loading
                ? "Registering..."
                : "Register"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}