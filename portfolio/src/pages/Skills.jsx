import { motion } from "framer-motion";

import { assets } from "../assets/assets";

const Skills = () => {
  const skills = [
    {
      name: "HTML",
      image: assets.skill1,
    },
    {
      name: "CSS",
      image: assets.skill2,
    },
    {
      name: "Java Script",
      image: assets.skill3,
    },
    {
      name: "Java",
      image: assets.skill4,
    },
    {
      name: "React",
      image: assets.skill5,
    },
    {
      name: "Tailwind CSS",
      image: assets.skill6,
    },
    {
      name: "Node.js",
      image: assets.skill7,
    },
    {
      name: "Express.js",
      image: assets.skill6,
    },
    {
      name: "MongoDB",
      image: assets.skill9,
    },
    {
      name: "Git",
      image: assets.skill10,
    },
  ];

  return (
    <section
      id="skills"
      className="
        relative
        w-full
        overflow-hidden
        pt-8
        pb-10
        sm:pt-12
        sm:pb-16
      "
    >
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="relative z-10 mb-12 text-center sm:mb-16">

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.3em]
            text-white/45
            sm:text-xs
          "
        >
          Skills & Expertise
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.1,
          }}
          className="
            text-4xl
            font-black
            tracking-[-0.05em]
            text-white
            sm:text-5xl
            lg:text-6xl
          "
        >
          My Tech Stack
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mx-auto
            mt-4
            max-w-xl
            text-sm
            leading-7
            text-white/40
            sm:text-base
          "
        >
          Technologies I use to build modern,
          scalable and interactive digital experiences.
        </motion.p>

      </div>


      {/* =====================================================
          MARQUEE
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          overflow-hidden
          select-none
        "
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        {/* =================================================
            MOVING TRACK
        ================================================== */}

        <div
          className="
            skills-marquee
            flex
            w-max
            items-center
          "
        >

          {/* FIRST SET */}

          <div className="flex items-center">

            {skills.map((skill, index) => (
              <SkillCard
                key={`first-${index}`}
                skill={skill}
              />
            ))}

          </div>


          {/* SECOND SET
              Required for seamless loop
          */}

          <div className="flex items-center">

            {skills.map((skill, index) => (
              <SkillCard
                key={`second-${index}`}
                skill={skill}
              />
            ))}

          </div>

        </div>


        {/* =================================================
            ANIMATION
        ================================================== */}

        <style>{`

          .skills-marquee {
            animation: skillsScroll 20s linear infinite;
            will-change: transform;
          }

          .skills-marquee:hover {
            animation-play-state: paused;
          }

          @keyframes skillsScroll {

            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }

          }

          @media (prefers-reduced-motion: reduce) {

            .skills-marquee {
              animation: none;
            }

          }

        `}</style>

      </div>


      {/* =====================================================
          BOTTOM TEXT
      ====================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.8,
          delay: 0.4,
        }}
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-3
          sm:mt-8
        "
      >

        <span
          className="
            h-px
            w-8
            bg-white/10
          "
        />

        <span
          className="
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.25em]
            text-white/25
          "
        >
          Hover to explore
        </span>

        <span
          className="
            h-px
            w-8
            bg-white/10
          "
        />

      </motion.div>

    </section>
  );
};


// =============================================================
// SKILL CARD
// =============================================================

const SkillCard = ({ skill }) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.08,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 18,
      }}
      className="
        group
        relative
        mx-3
        flex
        h-36
        w-28
        shrink-0
        flex-col
        items-center
        justify-center
        gap-3

        sm:mx-4
        sm:h-40
        sm:w-32
      "
    >

      {/* ===================================================
          CIRCULAR SKILL ICON
      ==================================================== */}

      <div className="
        relative
        flex
        h-20
        w-20
        items-center
        justify-center
        rounded-full
        border
        border-white/[0.12]
        backdrop-blur-xl
        transition-all
        duration-500
        group-hover:scale-105
        group-hover:border-white/[0.25]
        sm:h-24
        sm:w-24
      ">
        <div className="
          pointer-events-none
          absolute
          inset-0
          rounded-full
          bg-cyan-400/0
          blur-2xl
          transition-colors
          duration-500
          group-hover:bg-cyan-400/20
        " />

        <motion.img
          src={skill.image}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="
            relative
            z-10
            h-10
            w-10
            object-contain
            grayscale
            opacity-60
            transition-all
            duration-500
            ease-out
            group-hover:scale-110
            group-hover:grayscale-0
            group-hover:opacity-100
            group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]
            sm:h-12
            sm:w-12
          "
        />
      </div>


        {/* NAME */}

        <p
          className="
            text-center
            text-[11px]
            font-semibold
            text-white/35
            transition-all
            duration-500
            group-hover:text-white
          "
        >
          {skill.name}
        </p>

    </motion.div>
  );
};


export default Skills;