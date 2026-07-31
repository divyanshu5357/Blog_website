import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

function About() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="about-aarambh">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
        >
          {/* Left Side: Sticky Heading */}
          <motion.div variants={fadeUp} className="max-w-xl lg:sticky lg:top-32">
            <p className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-4">
              {t("about.kicker")}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-extrabold text-[#4A2B4D] leading-tight mb-6">
              {t("about.title")}
            </h2>
          </motion.div>

          {/* Right Side: Prose & Proofs */}
          <motion.div variants={staggerContainer} className="flex flex-col gap-8">
            <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed">
              {t("about.description1")}
            </motion.p>
            <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed">
              {t("about.description2")}
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-[#fefaf8] border border-[#4A2B4D]/10 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 size={24} className="text-amber-600 shrink-0" />
                <span className="font-semibold text-[#4A2B4D]">{t("about.proof.evidenceAware")}</span>
              </div>
              <div className="flex items-center gap-3 bg-[#fefaf8] border border-[#4A2B4D]/10 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle2 size={24} className="text-amber-600 shrink-0" />
                <span className="font-semibold text-[#4A2B4D]">{t("about.proof.practical")}</span>
              </div>
              <div className="flex items-center gap-3 bg-[#fefaf8] border border-[#4A2B4D]/10 px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <CheckCircle2 size={24} className="text-amber-600 shrink-0" />
                <span className="font-semibold text-[#4A2B4D]">{t("about.proof.humanCentred")}</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;