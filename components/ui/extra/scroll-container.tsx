"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { DocShotData } from "api";
import ShotCard from "@/components/shared/shot-card";
export const ContainerScroll = ({
  data,
  titleComponent,
}: {
  data: DocShotData[];
  titleComponent: string | React.ReactNode;
}) => {
  const containerRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[80rem] w-full flex items-center justify-center relative py-20 px-6"
      ref={containerRef}
    >
      <div
        className="py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card
          rotate={rotate}
          translate={translate}
          scale={scale}
          data={data}
        />
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl w-full mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  data,
}: {
  rotate: any;
  scale: any;
  translate: any;
  data: DocShotData[];
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate, // rotate in X-axis
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="max-w-5xl md:aspect-[4/3] aspect-[9/16] -mt-12 mx-auto min-h-[30rem] md:min-h-[40rem] w-full border-4 p-3 bg-card rounded-[30px] shadow-2xl"
    >
      <div className="w-full h-full rounded-2xl bg-background overflow-hidden">
        <div className="h-fit w-full grid preview-screen-grid gap-4 overflow-hidden px-6 pt-32">
          {
            !!data.length &&
            data.map((item, idx: number) => {
            return <motion.div
              key={`user-${idx}`}
              className="bg-transparent cursor-pointer relative aspect-[4/3] w-full"
              style={{ translateY: translate }}
              whileHover={{
                boxShadow:
                  "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              }}
            >
              <ShotCard shot={item} enableFooter={false} />
            </motion.div>
          })}
        </div>
      </div>
    </motion.div>
  );
};
