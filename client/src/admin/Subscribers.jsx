import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Users, Mail, Calendar, AlertTriangle } from "lucide-react";
import {
  getSubscribers,
  deleteSubscriber,
} from "../services/subscriber.service";

const tableVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // States for the custom confirmation modal
  const [subscriberToDelete, setSubscriberToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const res = await getSubscribers();
      setSubscribers(res.subscribers || res.data || []); // Adjusted for common API structures
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  // Function to actually execute the deletion
  const confirmDelete = async () => {
    if (!subscriberToDelete) return;

    try {
      setIsDeleting(true);
      await deleteSubscriber(subscriberToDelete.id);
      
      toast.success("Subscriber removed successfully.");
      

      setSubscribers((prev) => 
        prev.filter((sub) => sub.id !== subscriberToDelete.id)
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed.");
    } finally {
      setIsDeleting(false);
      setSubscriberToDelete(null);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Users className="text-indigo-600" size={32} />
            Subscribers
          </h1>
          <p className="text-slate-500 mt-1">Manage your newsletter audience.</p>
        </div>

        {!loading && (
          <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-sm">
            Total Subscribers 
            <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-xs">
              {subscribers.length}
            </span>
          </div>
        )}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Subscriber Email
                </th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date Joined
                </th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {loading ? (
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-slate-100 animate-pulse">
                    <td className="p-6"><div className="h-4 bg-slate-200 rounded w-48"></div></td>
                    <td className="p-6"><div className="h-4 bg-slate-200 rounded w-32"></div></td>
                    <td className="p-6 text-right"><div className="h-8 bg-slate-200 rounded w-20 ml-auto"></div></td>
                  </tr>
                ))}
              </tbody>
            ) : subscribers.length > 0 ? (
              <motion.tbody
                variants={tableVariants}
                initial="hidden"
                animate="show"
                className="divide-y divide-slate-100"
              >
                {subscribers.map((subscriber) => (
                  <motion.tr
                    variants={rowVariants}
                    key={subscriber.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
                          <Mail size={16} className="text-indigo-500" />
                        </div>
                        <span className="font-medium text-slate-800">
                          {subscriber.email}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <Calendar size={14} />
                        {new Date(subscriber.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setSubscriberToDelete(subscriber)}
                        className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="3" className="py-16 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-400 mb-4">
                      <Users size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-1">No subscribers yet</h3>
                    <p className="text-slate-500 text-sm">When people subscribe, they will appear here.</p>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>

      <AnimatePresence>
        {subscriberToDelete && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => !isDeleting && setSubscriberToDelete(null)}
            />

            {/* Modal Dialog */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-6 pointer-events-auto"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Remove Subscriber?
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-1">
                      Are you sure you want to remove <span className="font-semibold text-slate-800">{subscriberToDelete.email}</span> from your list?
                    </p>
                    <p className="text-slate-500 text-sm">
                      This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSubscriberToDelete(null)}
                    disabled={isDeleting}
                    className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={isDeleting}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isDeleting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Removing...
                      </>
                    ) : (
                      "Yes, remove them"
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}