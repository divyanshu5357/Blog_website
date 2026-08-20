import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { uploadImage } from "../services/posts.service";
import { API_BASE_URL } from "../config/api";

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
const [uploading, setUploading] = useState(false);
const [preview, setPreview] = useState(session?.image || "");


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

    setPreview(session.image || "");
  }
}, [session]);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
      image: res.data.url,
    }));

    setPreview(res.data.url);

    toast.success("Image uploaded successfully.");
  } catch (err) {
    console.error(err);
    toast.error("Image upload failed.");
  } finally {
    setUploading(false);
  }
};
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    if (session) {

  await axios.put(
    `${API_BASE_URL}/live-sessions/${session.id}`,
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
    `${API_BASE_URL}/live-sessions`,
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
    <div>
  <label className="block mb-2 font-medium">
    Session Banner
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full border p-3 rounded-lg"
  />

  {uploading && (
    <p className="text-blue-600 mt-2">
      Uploading...
    </p>
  )}

  {preview && (
    <img
      src={preview}
      alt="Session Banner"
      className="mt-4 w-72 h-40 object-cover rounded-lg border"
    />
  )}
</div>

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