import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LiveSessionsAdmin() {
  const [sessions, setSessions] = useState([]);

  const [registrations, setRegistrations] = useState([]);
  const [selectedSession, setSelectedSession] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const token = localStorage.getItem("token");

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/live-sessions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessions(data.data);

    } catch (err) {
      toast.error("Failed to load sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const viewRegistrations = async (
    session
  ) => {

    try {

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:8000/api/live-sessions/${session.id}/registrations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(data.data);

      setSelectedSession(session);

      setShowModal(true);

    } catch (err) {

      toast.error(
        "Failed to fetch registrations."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Live Sessions
        </h1>

        <button className="bg-violet-700 text-white px-5 py-2 rounded-lg">
          + Add Session
        </button>

      </div>

      <div className="space-y-5">

        {sessions.map((session) => (

          <div
            key={session.id}
            className="border rounded-xl p-6 bg-white shadow-sm"
          >

            <h2 className="text-xl font-semibold">
              {session.title}
            </h2>

            <p className="text-gray-500">
              {session.speaker}
            </p>

            <p className="mt-2">
              {new Date(
                session.date
              ).toLocaleString()}
            </p>

            <p className="mt-1">
              Seats : {session.maxSeats}
            </p>

            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-green-100 text-green-700">
              {session.status}
            </span>

            <div className="mt-5">

              <button
                onClick={() =>
                  viewRegistrations(session)
                }
                className="bg-violet-700 text-white px-4 py-2 rounded-lg"
              >
                👥 View Registrations
              </button>

            </div>

          </div>

        ))}

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white w-4/5 max-w-5xl rounded-2xl p-8">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">

                {selectedSession.title}

              </h2>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="text-2xl"
              >
                ✕
              </button>

            </div>

            {loading ? (

              <p>Loading...</p>

            ) : registrations.length === 0 ? (

              <p>
                No registrations yet.
              </p>

            ) : (

              <table className="w-full border">

                <thead className="bg-gray-100">

                  <tr>

                    <th className="p-3 border">
                      Name
                    </th>

                    <th className="p-3 border">
                      Email
                    </th>

                    <th className="p-3 border">
                      Registered At
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {registrations.map(
                    (user) => (

                      <tr key={user.id}>

                        <td className="p-3 border">
                          {user.name}
                        </td>

                        <td className="p-3 border">
                          {user.email}
                        </td>

                        <td className="p-3 border">
                          {new Date(
                            user.createdAt
                          ).toLocaleString()}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            )}

          </div>

        </div>

      )}

    </div>
  );
}