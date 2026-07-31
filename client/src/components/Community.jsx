import { UsersRound } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

function Community() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#fefaf8] border-t border-[#4A2B4D]/5 text-center" id="community">
      <div className="max-w-3xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100 }}
          className="mx-auto w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-8 shadow-sm"
        >
          <UsersRound size={40} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">
            {t("community.kicker")}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#4A2B4D] mb-6">
            {t("community.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {t("community.description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Community;