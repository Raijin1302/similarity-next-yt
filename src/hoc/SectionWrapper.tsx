import { FC } from "react"
import { motion } from "framer-motion"

import { staggerContainer } from "@/helpers/motion"
interface SectionWrapperProps {
  Component: React.FC<any>
  idName: string
}

const SectionWrapper: FC<SectionWrapperProps> = ({ Component, idName }) => {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <span className="hash-span" id={idName}>
        &nbsp;
      </span>
      <Component />
    </motion.div>
  )
}

export default SectionWrapper
