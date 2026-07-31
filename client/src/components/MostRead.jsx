import { mostRead } from "../data/mostRead";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const fadeRight = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

function MostRead() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-5">
        <div className="mb-12 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-3"
          >
            {t("mostRead.kicker")}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-extrabold text-[#4A2B4D]"
          >
            {t("mostRead.title")}
          </motion.h2>
        </div>

        <motion.ol 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col gap-4"
        >
          {mostRead.map((item, index) => (
            <motion.li 
              variants={fadeRight}
              key={item} 
              className="group flex items-center gap-6 p-4 md:p-6 rounded-2xl hover:bg-[#fefaf8] transition-colors cursor-pointer border border-transparent hover:border-[#4A2B4D]/10"
            >
              <span className="text-4xl md:text-5xl font-serif font-black text-[#4A2B4D]/10 group-hover:text-amber-200 transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-lg md:text-xl font-bold text-gray-800 group-hover:text-[#4A2B4D] transition-colors">
                {t(`mostRead.items.${item}`)}
              </span>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

export default MostRead;