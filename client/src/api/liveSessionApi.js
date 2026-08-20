import axios from "axios";
import { API_BASE_URL } from "../config/api";

export const getPublicSessions = async () => {
  const res = await axios.get(
    `${API_BASE_URL}/live-sessions/public`
  );

  return res.data.data;
};
export const getSessionRegistrations = async (
  sessionId
) => {

  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/live-sessions/${sessionId}/registrations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data.data;
};