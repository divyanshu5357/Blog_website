import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Edit2, 
  Trash2, 
  Plus, 
  X, 
  Calendar, 
  User as UserIcon,
  Loader2,
  Download
} from "lucide-react";

import CreateLiveSession from "./CreateLiveSession";
import DeleteModal from "../components/DeleteModal";
import CountdownTimer from "../components/CountdownTimer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function LiveSessionsAdmin() {
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const token = localStorage.getItem("accessToken");

  const fetchSessions = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/live-sessions",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSessions(data.data);
    } catch (err) {
      toast.error("Failed to load sessions");
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const viewRegistrations = async (session) => {
    try {
      setLoading(true);
      setSelectedSession(session);
      setShowModal(true);

      const { data } = await axios.get(
        `http://localhost:8000/api/live-sessions/${session.id}/registrations`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRegistrations(data.data);
    } catch (err) {
      toast.error("Failed to fetch registrations.");
    } finally {
      setLoading(false);
    }
  };

  const requestDelete = (id) => {
    setSessionToDelete(id);
  };

  const confirmDelete = async () => {
    if (!sessionToDelete) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/live-sessions/${sessionToDelete}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Session deleted successfully.");
      setSessionToDelete(null);
      fetchSessions();
    } catch (err) {
      toast.error("Failed to delete session.");
    }
  };

  const openAddForm = () => {
    setSelectedSession(null);
    setShowForm(true);
  };

  const openEditForm = (session) => {
    setSelectedSession(session);
    setShowForm(true);
  };

  const exportRegistrations = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/live-sessions/${id}/export`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.setAttribute(
        "download",
        "registrations.csv"
      );

      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("CSV downloaded successfully.");

    } catch (err) {
      toast.error("Failed to export CSV.");
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Live Sessions</h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">Manage your upcoming and past events.</p>
        </div>
        <button
          onClick={openAddForm}
          className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <Plus size={20} />
          Add Session
        </button>
      </div>

      {/* Sessions Grid */}
      {sessions.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-violet-50 rounded-full flex items-center justify-center mx-auto mb-4 text-violet-500">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No Live Sessions</h3>
          <p className="text-gray-500 mt-2">Get started by creating your first session.</p>
        </div>
      ) : (
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
        >
          {sessions.map((session) => {
            const now = new Date();
            const sessionDate = new Date(session.date);
            let badge = {
              text: "Upcoming",
              className: "bg-blue-100 text-blue-700",
            };
            if (sessionDate <= now) {
              badge = {
                text: "🔴 Live",
                className: "bg-red-100 text-red-700",
              };
            }

            return (
              <motion.div
            
                variants={itemVariants}
                key={session.id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-full overflow-hidden"
              >
                {session.image && (
  <img
    src={session.image}
    alt={session.title}
    className="w-full h-52 object-cover"
  />
)}
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                      <Calendar size={14} className="text-violet-500" />
                      {new Date(session.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className={`px-3 py-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg ${badge.className}`}>
                      {badge.text}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-2 leading-tight font-sans line-clamp-2" title={session.title}>
                    {session.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-5">
                    <UserIcon size={16} className="text-gray-400" />
                    <span className="font-medium line-clamp-1">{session.speaker}</span>
                  </div>

                  <div className="mb-5 w-full">
                    <CountdownTimer targetDate={session.date} />
                  </div>

                  <div className="mt-auto grid grid-cols-3 gap-2 bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                    <div>
                      <p className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Seats</p>
                      <p className="text-lg sm:text-xl font-black text-gray-900">{session.maxSeats}</p>
                    </div>
                    <div className="border-l border-gray-200">
                      <p className="text-[10px] sm:text-xs text-blue-500 uppercase font-bold tracking-wider mb-1">Reg</p>
                      <p className="text-lg sm:text-xl font-black text-blue-600">{session._count?.registrations || 0}</p>
                    </div>
                    <div className="border-l border-gray-200">
                      <p className="text-[10px] sm:text-xs text-green-500 uppercase font-bold tracking-wider mb-1">Left</p>
                      <p className="text-lg sm:text-xl font-black text-green-600">{session.maxSeats - (session._count?.registrations || 0)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 flex flex-wrap sm:flex-nowrap gap-2 items-center">
                  <button
                    onClick={() => viewRegistrations(session)}
                    className="flex-1 min-w-[120px] bg-white hover:bg-violet-50 text-gray-700 hover:text-violet-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
                  >
                    <Users size={16} />
                    <span>Attendees</span>
                  </button>
                  <button
                    onClick={() => exportRegistrations(session.id)}
                    className="flex-1 min-w-[120px] bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm"
                  >
                    <Download size={16} />
                    <span>Export</span>
                  </button>
                  
                  <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <button
                      onClick={() => openEditForm(session)}
                      className="flex-1 sm:flex-none bg-white hover:bg-blue-50 text-gray-400 hover:text-blue-600 p-2.5 rounded-lg transition-colors border border-gray-200 shadow-sm flex justify-center items-center"
                      title="Edit Session"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => requestDelete(session.id)}
                      className="flex-1 sm:flex-none bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 p-2.5 rounded-lg transition-colors border border-gray-200 shadow-sm flex justify-center items-center"
                      title="Delete Session"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-4xl rounded-2xl p-6 shadow-2xl flex flex-col max-h-[85vh]"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedSession?.title}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Attendee Roster</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 pr-2">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                    <Loader2 size={32} className="animate-spin mb-4 text-violet-500" />
                    <p>Loading attendees...</p>
                  </div>
                ) : registrations.length === 0 ? (
                  <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl">
                    <Users size={48} className="mx-auto mb-3 text-gray-300" />
                    <p className="font-medium text-gray-600">No registrations yet.</p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                        <tr>
                          <th className="p-4">Name</th>
                          <th className="p-4">Email</th>
                          <th className="p-4">Registered At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {registrations.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="p-4 font-medium text-gray-900">{user.name}</td>
                            <td className="p-4 text-gray-600">{user.email}</td>
                            <td className="p-4 text-gray-500">
                              {new Date(user.createdAt).toLocaleString([], {
                                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {showForm && (
        <CreateLiveSession
          session={selectedSession}
          onClose={() => {
            setShowForm(false);
            setSelectedSession(null);
          }}
          onSuccess={fetchSessions}
        />
      )}


      <DeleteModal 
        isOpen={sessionToDelete !== null} 
        onClose={() => setSessionToDelete(null)} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
}