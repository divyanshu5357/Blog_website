import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Settings as SettingsIcon, Save, ShieldAlert, Globe, Mail, Share2, ToggleLeft, ToggleRight } from "lucide-react";
import { getSettings, updateSettings } from "../services/settings.service";

export default function Settings() {
  const [form, setForm] = useState({
    siteName: "",
    siteDescription: "",
    contactEmail: "",
    footerText: "",
    maintenanceMode: false,
    socialTwitter: "",
    socialGithub: "",
    socialLinkedin: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      if (data.settings) {
        setForm({
          siteName: data.settings.siteName || "",
          siteDescription: data.settings.siteDescription || "",
          contactEmail: data.settings.contactEmail || "",
          footerText: data.settings.footerText || "",
          maintenanceMode: Boolean(data.settings.maintenanceMode),
          socialTwitter: data.settings.socialTwitter || "",
          socialGithub: data.settings.socialGithub || "",
          socialLinkedin: data.settings.socialLinkedin || "",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await updateSettings(form);
      toast.success(res.message || "Settings updated successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center text-slate-500">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <SettingsIcon size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Settings</h1>
          <p className="text-slate-500 mt-0.5">Manage general configurations and platform metadata.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Site Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-lg border-b pb-4">
            <Globe className="text-indigo-600" size={20} />
            General Information
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Site Name
              </label>
              <input
                type="text"
                name="siteName"
                value={form.siteName}
                onChange={handleChange}
                placeholder="AARAMBH CMS"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  name="contactEmail"
                  value={form.contactEmail}
                  onChange={handleChange}
                  placeholder="contact@aarambh.com"
                  className="w-full border border-slate-300 rounded-xl pl-11 pr-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Site Description
            </label>
            <textarea
              name="siteDescription"
              rows={3}
              value={form.siteDescription}
              onChange={handleChange}
              placeholder="Brief description of the platform..."
              className="w-full border border-slate-300 rounded-xl p-3 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Footer Text
            </label>
            <input
              type="text"
              name="footerText"
              value={form.footerText}
              onChange={handleChange}
              placeholder="© 2026 Aarambh CMS. All rights reserved."
              className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
            />
          </div>
        </div>

        {/* Maintenance & System Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-lg border-b pb-4">
            <ShieldAlert className="text-amber-500" size={20} />
            Maintenance & System Controls
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <h3 className="font-semibold text-slate-900">Maintenance Mode</h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Enable to show maintenance banner and restrict non-admin access.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForm((prev) => ({ ...prev, maintenanceMode: !prev.maintenanceMode }))}
              className="text-slate-700 hover:text-indigo-600 transition"
            >
              {form.maintenanceMode ? (
                <ToggleRight className="text-indigo-600" size={38} />
              ) : (
                <ToggleLeft className="text-slate-400" size={38} />
              )}
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-lg border-b pb-4">
            <Share2 className="text-blue-500" size={20} />
            Social Profiles
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Twitter / X URL</label>
              <input
                type="url"
                name="socialTwitter"
                value={form.socialTwitter}
                onChange={handleChange}
                placeholder="https://x.com/username"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub URL</label>
              <input
                type="url"
                name="socialGithub"
                value={form.socialGithub}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="socialLinkedin"
                value={form.socialLinkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? "Saving Changes..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}
