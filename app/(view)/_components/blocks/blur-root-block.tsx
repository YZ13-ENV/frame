"use client"
import { cn } from "@/lib/utils"
import { DocShotData } from "@darkmaterial/api"
import { motion } from "framer-motion"
import MediaBlock from "./media-block"

type Props = {
  shot: DocShotData
}
const BlurRootBlock = ({ shot }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: .6 }}
      transition={{ duration: 1, delay: .4 }}
      className={cn(
        "lg:scale-75 md:scale-90 scale-100",
        "lg:top-0 md:top-28 top-44",
        "lg:blur-[500px] md:blur-[250px] blur-[125px]",
        "opacity-60",
        "absolute w-full z-[-2] aspect-video flex items-center justify-center"
      )}
    >
      <MediaBlock key={shot.rootBlock.id + '-' + shot.rootBlock.type + '-shot'} attachments={shot.attachments} block={shot.rootBlock} />
    </motion.div>
  )
}

export default BlurRootBlock