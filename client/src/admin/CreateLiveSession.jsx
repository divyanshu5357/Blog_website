import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateLiveSession({
  onClose,
  onSuccess,
  session,
}) {
  const [form, setForm] = useState({
  title: session?.title || "",
  speaker: session?.speaker || "",
  description: session?.description || "",
  date: session?.date
    ? new Date(session.date).toISOString().slice(0, 16)
    : "",
  duration: session?.duration || "",
  maxSeats: session?.maxSeats || "",
  meetingLink: session?.meetingLink || "",
  image: session?.image || "",
});

useEffect(() => {
  if (session) {
    setForm({
      title: session.title || "",
      speaker: session.speaker || "",
      description: session.description || "",
      date: session.date
        ? new Date(session.date).toISOString().slice(0, 16)
        : "",
      duration: session.duration || "",
      maxSeats: session.maxSeats || "",
      meetingLink: session.meetingLink || "",
      image: session.image || "",
    });
  }
}, [session]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    if (session) {

  await axios.put(
    `http://localhost:8000/api/live-sessions/${session.id}`,
    {
      ...form,
      date: new Date(form.date).toISOString(),
      duration: Number(form.duration),
      maxSeats: Number(form.maxSeats),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  toast.success("Session Updated");

} else {

  await axios.post(
    "http://localhost:8000/api/live-sessions",
    {
      ...form,
      date: new Date(form.date).toISOString(),
      duration: Number(form.duration),
      maxSeats: Number(form.maxSeats),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );

  toast.success("Session Created");

}

      onSuccess();

      onClose();

    } catch (err) {
  console.log(err.response?.data);
  toast.error(
    err.response?.data?.message || "Failed to create session"
  );
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
  value={form.title}
  onChange={handleChange}
  placeholder="Title"
  className="w-full border p-3 rounded-lg"
/>
        <input
  name="speaker"
  value={form.speaker}
  onChange={handleChange}
  placeholder="Speaker"
  className="w-full border p-3 rounded-lg"
/>

        <textarea
  name="description"
  value={form.description}
  onChange={handleChange}
  placeholder="Description"
  className="w-full border p-3 rounded-lg"
/>

        <input
  type="datetime-local"
  name="date"
  value={form.date}
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
  value={form.maxSeats}
  onChange={handleChange}
  placeholder="Maximum Seats"
  className="w-full border p-3 rounded-lg"
/>

       <input
  name="meetingLink"
  value={form.meetingLink}
  onChange={handleChange}
  placeholder="Meeting Link"
  className="w-full border p-3 rounded-lg"
/>
     <input
  name="image"
  value={form.image}
  onChange={handleChange}
  placeholder="Image URL"
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