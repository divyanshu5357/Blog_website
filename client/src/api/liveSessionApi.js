import axios from "axios";

export const getPublicSessions = async () => {
  const res = await axios.get(
    "http://localhost:8000/api/live-sessions/public"
  );

  return res.data.data;
};
export const getSessionRegistrations = async (
  sessionId
) => {

  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/api/live-sessions/${sessionId}/registrations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.data;
};