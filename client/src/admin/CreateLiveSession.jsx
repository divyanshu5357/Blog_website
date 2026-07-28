import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateLiveSession({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    title: "",
    speaker: "",
    description: "",
    date: "",
    duration: "",
    maxSeats: "",
    meetingLink: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:8000/api/live-sessions",
        {
          ...form,
          duration: Number(form.duration),
          maxSeats: Number(form.maxSeats),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Session created");

      onSuccess();

      onClose();

    } catch (err) {
      toast.error("Failed to create session");
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-8 w-[650px] space-y-4"
      >

        <h2 className="text-2xl font-bold">
          Create Live Session
        </h2>

        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="speaker"
          placeholder="Speaker"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="datetime-local"
          name="date"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="duration"
          placeholder="Duration"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="maxSeats"
          placeholder="Maximum Seats"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="meetingLink"
          placeholder="Meeting Link"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <div className="flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            className="bg-violet-700 text-white px-5 py-2 rounded-lg"
          >
            Save
          </button>

        </div>

      </form>

    </div>
  );
}