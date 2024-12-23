"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import {Spotlight} from "@/components/ui/spotlight";

export default function MainHero() {
  return (
      <div className='h-screen w-full mb-24'>
        <HeroHighlight>
          <Spotlight
              className="-top-40 left-0 md:left-20 md:-top-56"
              fill="black"
          />
          <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: [20, -5, 0],
              }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0.0, 0.2, 1],
              }}
              className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            With giftGenerator, every gift is possible. No matter what kind of recipient you have, you
            <Highlight className="text-black dark:text-white">
              will get the Perfect Gift.
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </div>
  );
}
