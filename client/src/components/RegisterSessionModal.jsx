import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { generateGoogleCalendarLink } from "../utils/googleCalendar";
import QRCode from "react-qr-code";
import { API_BASE_URL } from "../config/api";

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
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    if (!open) {
      setRegistered(false);
      setForm({
        name: "",
        email: "",
      });
    }
  }, [open]);

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
        `${API_BASE_URL}/live-sessions/${session.id}/register`,
        form
      );

      toast.success(data.message);

      setRegistered(true);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= SUCCESS SCREEN =================

  if (registered) {
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-xl text-center">

          <div className="text-6xl mb-4">🎉</div>

          <h2 className="text-2xl font-bold mb-3">
            Registration Successful!
          </h2>

          <p className="text-gray-600 mb-6">
            You have successfully registered for
            <br />
            <strong>{session.title}</strong>
          </p>

          <div className="space-y-3">

            <button
              onClick={() =>
                window.open(
                  generateGoogleCalendarLink(session),
                  "_blank"
                )
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
            >
              📅 Add to Google Calendar
            </button>

            {session.meetingLink && (
              <a
                href={session.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-center"
              >
                🔗 Join Meeting
              </a>
            )}

            <button
              onClick={() => {
                setRegistered(false);
                onClose();
              }}
              className="w-full border rounded-lg py-3 hover:bg-gray-100"
            >
              Close
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ================= REGISTRATION FORM =================

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
              type="submit"
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