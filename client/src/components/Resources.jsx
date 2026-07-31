import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { resources } from "../data/resources";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } }
};

function Resources() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#fefaf8] border-t border-[#4A2B4D]/5" id="resources">
      <div className="max-w-7xl mx-auto px-5">
        <div className="mb-12">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3"
          >
            {t("resources.kicker")}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-extrabold text-[#4A2B4D]"
          >
            {t("resources.title")}
          </motion.h2>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {resources.map((resource) => (
            <motion.a 
              variants={fadeUp}
              href="#contact" 
              key={resource}
              className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-[#4A2B4D]/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="bg-[#fefaf8] text-[#4A2B4D] p-3 rounded-xl group-hover:bg-[#4A2B4D] group-hover:text-white transition-colors">
                <Download size={24} />
              </div>
              <span className="font-semibold text-gray-800 group-hover:text-[#4A2B4D] transition-colors">
                {t(`resources.items.${resource}`)}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Resources;