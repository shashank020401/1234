import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircleCheckIcon,
  Quote,
  ArrowUpRight,
  Users,
  Code2,
  CheckCircle2,
} from "lucide-react";

import { assets } from "../assets/assets";


// ============================================================
// PEOPLE / TESTIMONIAL DATA
// ============================================================
// Replace the names, quotes and image assets with your real
// friends / project leaders and their actual feedback.
// ============================================================

const people = [
  {
    id: 1,

    type: "Friend",

    name: "Vignesh",

    role: "College Friend",

    image: assets.friend,

    quote:
      "Shashank is someone who is always curious to learn something new. He turns ideas into working projects and never hesitates to experiment with new technologies.",

    highlight: "Curious & Creative",

    project: "Curato",
  },

  {
    id: 2,

    type: "Project Leader",

    name: "Madhav",

    role: "Project Lead",

    image: assets.friend,

    quote:
      "Working with Shashank was a great experience. He takes ownership of his work, understands problems quickly and consistently looks for better ways to build things.",

    highlight: "Strong Problem Solver",

    project: "Thesis Guard",
  },

  {
    id: 3,

    type: "Friend",

    name: "Pavan",

    role: "CSE Student",

    image: assets.friend,

    quote:
      "What stands out about Shashank is his interest in building things instead of just learning theory. He is always working on something new and improving his skills.",

    highlight: "Always Building",

    project: "AdsPrint",
  },
];


// ============================================================
// FILTERS
// ============================================================

const filters = [
  {
    id: "All",
    label: "Everyone",
    icon: Users,
  },

  {
    id: "Friend",
    label: "Friends",
    icon: Users,
  },

  {
    id: "Project Leader",
    label: "Project Leaders",
    icon: Code2,
  },
];


// ============================================================
// CARD ANIMATION
// ============================================================

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.94,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },

  exit: {
    opacity: 0,
    y: -30,
    scale: 0.96,

    transition: {
      duration: 0.35,
    },
  },
};


// ============================================================
// PEOPLE SAY CARD
// ============================================================

function PeopleCard({ person, index }) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        delay: index * 0.08,
      }}
      whileHover={{
        y: -10,
      }}
      className="
        group
        relative
        h-full
      "
    >

      {/* ======================================================
          OUTER GLOW
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -inset-[1px]
          rounded-[30px]
          bg-gradient-to-br
          from-cyan-300/20
          via-transparent
          to-violet-500/20
          opacity-0
          blur-sm
          transition-all
          duration-500

          group-hover:opacity-100
        "
      />


      {/* ======================================================
          CARD
      ====================================================== */}

      <div
        className="
          relative
          flex
          min-h-[390px]
          flex-col
          overflow-hidden
          rounded-[30px]
          border
          border-white/[0.08]
          bg-white/[0.035]
          p-6
          backdrop-blur-2xl
          transition-all
          duration-500

          group-hover:border-white/[0.16]
          group-hover:bg-white/[0.05]

          sm:p-7
        "
      >

        {/* ==================================================
            BACKGROUND GLOW
        ================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-60
            w-60
            rounded-full
            bg-cyan-400/[0.04]
            blur-[100px]
          "
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        {/* ==================================================
            TOP ROW
        ================================================== */}

        <div
          className="
            relative
            z-10
            flex
            items-center
            justify-between
          "
        >

          {/* PERSON */}

          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 3,
              }}
              className="
                h-14
                w-14
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.10]
                bg-white/[0.05]
              "
            >

              <img
                src={person.image}
                alt={person.name}
                className="
                  h-full
                  w-full
                  object-cover
                "
                draggable={false}
              />

            </motion.div>


            <div>

              <h3
                className="
                  text-sm
                  font-bold
                  text-white
                "
              >
                {person.name}
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-white/35
                "
              >
                {person.role}
              </p>

            </div>

          </div>


          {/* TYPE */}

          <div
            className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.035]
              px-3
              py-2
              text-[8px]
              font-bold
              uppercase
              tracking-[0.15em]
              text-white/30
            "
          >

            {person.type === "Friend" ? (
              <Users size={11} />
            ) : (
              <Code2 size={11} />
            )}

            {person.type}

          </div>

        </div>


        {/* ==================================================
            QUOTE ICON
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-8
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-300/[0.12]
            bg-cyan-300/[0.04]
            text-cyan-200
          "
        >

          <Quote
            size={18}
            fill="currentColor"
            className="opacity-70"
          />

        </div>


        {/* ==================================================
            QUOTE
        ================================================== */}

        <p
          className="
            relative
            z-10
            text-left
            mt-5
            text-[15px]
            leading-7
            tracking-[-0.01em]
            text-white/55
          "
        >
          "{person.quote}"
        </p>


        {/* ==================================================
            HIGHLIGHT
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-auto
            pt-7
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-3
            "
          >

            {/* HIGHLIGHT */}

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-300/[0.10]
                bg-cyan-300/[0.035]
                px-3
                py-2
              "
            >

              <CheckCircle2
                size={12}
                className="text-cyan-300"
              />

              <span
                className="
                  text-[9px]
                  font-medium
                  text-cyan-100/55
                "
              >
                {person.highlight}
              </span>

            </div>


            {/* PROJECT */}

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.16em]
                text-white/20
              "
            >
              {person.project}
            </span>

          </div>

        </div>


        {/* ==================================================
            BOTTOM ACCENT
        ================================================== */}

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: "100%",
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.9,
            delay: index * 0.08,
          }}
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            bg-gradient-to-r
            from-cyan-300
            via-blue-400
            to-violet-500
          "
        />

      </div>

    </motion.article>
  );
}


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function PeopleSay() {

  const [activeFilter, setActiveFilter] = useState("All");


  const filteredPeople =
    activeFilter === "All"
      ? people
      : people.filter(
        (person) => person.type === activeFilter
      );


  return (
    <section
      id="reviews"
      className="
        relative
        overflow-hidden
        px-5
        pt-10
        pb-12

        sm:px-8
        sm:pt-12
        sm:pb-16

        lg:px-12
        lg:pt-16
        lg:pb-20
      "
    >

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[5%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-cyan-400/[0.025]
          blur-[160px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          right-[-15%]
          bottom-[5%]
          h-[650px]
          w-[650px]
          rounded-full
          bg-violet-500/[0.025]
          blur-[170px]
        "
      />


      {/* ======================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
        "
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            text-center
          "
        >

          {/* LABEL */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.35em]
              text-white/30
            "
          >

            <MessageCircleCheckIcon
              size={15}
              className="text-cyan-300"
            />

            People Say

          </div>


          {/* TITLE */}

          <h2
            className="
              text-5xl
              font-black
              tracking-[-0.06em]
              text-white

              sm:text-6xl
              lg:text-7xl
            "
          >
            What People Say.
          </h2>


          {/* LINE */}

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 70,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="
              mx-auto
              mt-5
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-cyan-300
              to-violet-500
            "
          />


          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-center
              text-sm
              leading-7
              text-white/35
            "
          >
            A few words from the people I've had the
            opportunity to learn, build and work with.
          </p>

        </motion.div>


        {/* ====================================================
            FILTER BUTTONS
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >

          {filters.map((filter) => {

            const Icon = filter.icon;

            const active =
              activeFilter === filter.id;

            return (
              <motion.button
                key={filter.id}
                onClick={() =>
                  setActiveFilter(filter.id)
                }
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className={`
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-4
                  py-2.5
                  text-[10px]
                  font-semibold
                  transition-all
                  duration-300

                  ${active
                    ? `
                        border-cyan-300/20
                        bg-cyan-300/[0.08]
                        text-cyan-200
                      `
                    : `
                        border-white/[0.07]
                        bg-white/[0.025]
                        text-white/30
                        hover:border-white/[0.14]
                        hover:text-white/60
                      `
                  }
                `}
              >

                <Icon size={13} />

                {filter.label}

              </motion.button>
            );
          })}

        </motion.div>


        {/* ====================================================
            TESTIMONIAL GRID
        ==================================================== */}

        <motion.div
          layout
          className="
            mt-14
            grid
            grid-cols-1
            gap-6

            md:grid-cols-2

            xl:grid-cols-3
          "
        >

          <AnimatePresence mode="popLayout">

            {filteredPeople.map(
              (person, index) => (
                <PeopleCard
                  key={person.id}
                  person={person}
                  index={index}
                />
              )
            )}

          </AnimatePresence>

        </motion.div>


        {/* ====================================================
            BOTTOM MESSAGE
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-16
            flex
            justify-center
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-5
              py-3
              backdrop-blur-xl
            "
          >

            <div
              className="
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-cyan-300/[0.08]
              "
            >

              <MessageCircleCheckIcon
                size={14}
                className="text-cyan-300"
              />

            </div>


            <span
              className="
                text-[9px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              Built with people, not just code
            </span>


            <ArrowUpRight
              size={13}
              className="text-white/20"
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
}