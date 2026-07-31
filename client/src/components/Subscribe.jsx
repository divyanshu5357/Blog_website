import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import toast from "react-hot-toast";
import { subscribe } from "../services/subscriber.service";

function Subscribe() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email.");
    }

    try {
      setLoading(true);

      const data = await subscribe(email);

      toast.success(data.message);

      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="subscribe" id="contact">
      <div>
        <p className="section-kicker">{t("subscribe.kicker")}</p>
        <h2>{t("subscribe.title")}</h2>
      </div>

      <form
        className="subscribe-form"
        onSubmit={handleSubscribe}
      >
        <label htmlFor="email">
          {t("subscribe.emailLabel")}
        </label>

        <div>
          <input
            id="email"
            type="email"
            placeholder={t("subscribe.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="button primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Subscribing..." : t("subscribe.button")}
            <Mail size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}

export default Subscribe;