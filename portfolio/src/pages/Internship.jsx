import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

import { assets } from "../assets/assets";


// ============================================================
// INTERNSHIP DATA
// ============================================================

const internships = [
  {
    id: 1,
    number: "01",

    side: "left",

    organization: "Internship Studio",

    role: "Data Analytics Internship",

    logo: assets.internship1Logo,

    duration: "10 July 2026 – 13 October 2026",

    location: "Online",

    description:
      "Completed a Data Analytics internship, gaining practical experience in data analysis, interpretation, visualization, and data-driven problem solving.",

    skills: [
      'Data Analysis',
      'Data Interpretation',
      'Data Visualization',
      'Power BI'
    ],

    cid: 'Credential ID: ISDTAI3433081',
  },

  {
    id: 2,
    number: "02",

    side: "right",

    organization: "Amazon Web Services (AWS)",

    role: "Cloud Foundations - Training Badge",

    logo: assets.internship2Logo,

    duration: "20 hours",

    location: "Online",

    description:
      'Completed 20 hours of AWS Academy Cloud Foundations training, gaining foundational knowledge of cloud computing, AWS services, infrastructure, security, and storage.',
    skills: [
      "AWS Cloud Foundations",
      "Cloud Computing",
      "AWS Core Services",
      "Cloud Infrastructure",
    ],

    link: "https://www.credly.com/badges/decacc85-e394-442c-9a4e-3f590e124dd2/linked_in_profile",
  },

  {
    id: 3,
    number: "03",

    side: "left",

    organization: "Edu Skills",

    role: "Java Full Stack Development Intern",

    logo: assets.internship3Logo,

    duration: "10 Weeks",

    location: "Online",

    description:
      "Completed a Full Stack Development internship covering responsive web design, JavaScript, React.js, Java, Spring Boot, Hibernate, and MySQL, with hands-on exposure to modern web application development.",

    skills: [
      'jQuery',
      'Core Java',
      'Advanced Java',
      'Spring Framework',
    ],

    cid: 'Certificate ID: 2026-5C325DAF75',
  },

  {
    id: 4,
    number: "04",

    side: "right",

    organization: "Amazon Web Services (AWS)",

    role: "Cloud Security Foundations - Training Badge",

    logo: assets.internship2Logo,

    duration: "20 Hours",

    location: "Online",

    description:
      "Completed 20 hours of AWS Academy Cloud Security Foundations training, gaining foundational knowledge of cloud security concepts, AWS security practices, and secure cloud environments.",

    skills: [
      'AWS Security Concepts',
      'Cloud Infrastructure Security',
      'Identity & Access Management',
      'Data Protection',
    ],

    link: "https://www.credly.com/badges/975e1c9b-eba9-48e1-8671-48595fae8648/linked_in_profile",
  },
];


// ============================================================
// MAIN INTERNSHIP ITEM
// ============================================================

function InternshipItem({ internship }) {
  const ref = useRef(null);

  // false = animation happens again when scrolling back
  const isInView = useInView(ref, {
    once: false,
    amount: 0.35,
  });

  const isLeftIdentity = internship.side === "left";

  return (
    <div
      ref={ref}
      className="
        relative
        grid
        w-full
        grid-cols-1

        md:grid-cols-[1fr_110px_1fr]
      "
    >

      {/* ======================================================
          LEFT SIDE
      ====================================================== */}

      <div
        className="
          flex
          min-h-[390px]
          items-center
          justify-center

          md:justify-end
          md:pr-10
        "
      >

        {isLeftIdentity ? (
          /* -----------------------------------------------
             LEFT = IDENTITY
          ------------------------------------------------ */

          <IdentityContent
            internship={internship}
            isInView={isInView}
            direction="left"
          />

        ) : (
          /* -----------------------------------------------
             LEFT = DETAILS
          ------------------------------------------------ */

          <DetailsContent
            internship={internship}
            isInView={isInView}
            direction="left"
          />
        )}

      </div>


      {/* ======================================================
          CENTER NUMBER
      ====================================================== */}

      <div
        className="
          relative
          hidden
          min-h-[390px]
          items-center
          justify-center

          md:flex
        "
      >

        {/* CENTER LINE */}

        <div
          className="
            absolute
            left-1/2
            top-0
            h-full
            w-px
            -translate-x-1/2
            bg-gradient-to-b
            from-transparent
            via-white/[0.16]
            to-transparent
          "
        />


        {/* NUMBER */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
            y: 20,
          }}
          animate={
            isInView
              ? {
                opacity: 1,
                scale: 1,
                y: 0,
              }
              : {
                opacity: 0,
                scale: 0.5,
                y: 20,
              }
          }
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative
            z-20
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.14]
            bg-[#071421]/95
            text-sm
            font-bold
            tracking-[0.12em]
            text-white/80
            shadow-[0_0_40px_rgba(0,0,0,0.35)]
            backdrop-blur-xl
          "
        >

          {internship.number}


          {/* NUMBER RING */}

          <motion.div
            animate={
              isInView
                ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.15, 0.4, 0.15],
                }
                : {
                  scale: 1,
                  opacity: 0,
                }
            }
            transition={{
              duration: 2,
              repeat: isInView ? Infinity : 0,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-[-10px]
              rounded-full
              border
              border-cyan-300/20
            "
          />

        </motion.div>

      </div>


      {/* ======================================================
          RIGHT SIDE
      ====================================================== */}

      <div
        className="
          flex
          min-h-[390px]
          items-center
          justify-center

          md:justify-start
          md:pl-10
        "
      >

        {isLeftIdentity ? (
          /* -----------------------------------------------
             RIGHT = DETAILS
          ------------------------------------------------ */

          <DetailsContent
            internship={internship}
            isInView={isInView}
            direction="right"
          />

        ) : (
          /* -----------------------------------------------
             RIGHT = IDENTITY
          ------------------------------------------------ */

          <IdentityContent
            internship={internship}
            isInView={isInView}
            direction="right"
          />
        )}

      </div>


      {/* ======================================================
          MOBILE NUMBER
      ====================================================== */}

      <div
        className="
          order-first
          flex
          justify-center
          md:hidden
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.5,
          }}
          animate={
            isInView
              ? {
                opacity: 1,
                scale: 1,
              }
              : {
                opacity: 0,
                scale: 0.5,
              }
          }
          transition={{
            duration: 0.5,
          }}
          className="
            mb-6
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-black/30
            text-xs
            font-bold
            text-white/70
          "
        >
          {internship.number}
        </motion.div>

      </div>

    </div>
  );
}


// ============================================================
// IDENTITY SIDE
// ============================================================

function IdentityContent({
  internship,
  isInView,
  direction,
}) {
  const fromLeft = direction === "left";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: fromLeft ? -100 : 100,
        scale: 0.95,
      }}
      animate={
        isInView
          ? {
            opacity: 1,
            x: 0,
            scale: 1,
          }
          : {
            opacity: 0,
            x: fromLeft ? -100 : 100,
            scale: 0.95,
          }
      }
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group
        w-full
        max-w-[470px]
      "
    >

      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.09]
          bg-white/[0.035]
          p-6
          shadow-[0_30px_90px_rgba(0,0,0,0.20)]
          backdrop-blur-2xl
          transition-all
          duration-500

          hover:-translate-y-2
          hover:border-white/[0.17]
          hover:bg-white/[0.05]

          sm:p-7
        "
      >

        {/* GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-cyan-400/[0.05]
            blur-[90px]
            transition-all
            duration-700
            group-hover:scale-150
          "
        />


        {/* LOGO */}

        <motion.div
          whileHover={{
            rotate: 5,
            scale: 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
          className="
            relative
            z-10
            flex
            h-20
            w-20
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.10]
            bg-white/[0.05]
            p-3
          "
        >

          <img
            src={internship.logo}
            alt={internship.organization}
            className="
              h-full
              w-full
              object-contain
            "
            draggable={false}
          />

        </motion.div>


        {/* ORGANIZATION */}

        <div className="relative z-10 mt-6">

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-cyan-300/65
            "
          >
            {internship.organization}
          </p>


          {/* ROLE */}

          <h3
            className="
              mt-2
              text-2xl
              font-black
              tracking-[-0.04em]
              text-white

              sm:text-[28px]
            "
          >
            {internship.role}
          </h3>


          {/* DATE */}

          <div
            className="
              mt-4
              flex
              items-center
              gap-2
              text-[11px]
              text-white/35
            "
          >

            <CalendarDays size={13} />

            {internship.duration}

          </div>

        </div>


        {/* BOTTOM LINE */}

        <motion.div
          initial={{
            width: 0,
          }}
          animate={
            isInView
              ? {
                width: "100%",
              }
              : {
                width: 0,
              }
          }
          transition={{
            duration: 0.9,
            delay: 0.25,
          }}
          className="
            absolute
            bottom-0
            left-0
            h-[2px]
            bg-gradient-to-r
            from-cyan-300
            to-violet-500
          "
        />

      </div>

    </motion.div>
  );
}


// ============================================================
// DETAILS SIDE
// ============================================================

function DetailsContent({
  internship,
  isInView,
  direction,
}) {
  const fromLeft = direction === "left";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: fromLeft ? -100 : 100,
        scale: 0.95,
      }}
      animate={
        isInView
          ? {
            opacity: 1,
            x: 0,
            scale: 1,
          }
          : {
            opacity: 0,
            x: fromLeft ? -100 : 100,
            scale: 0.95,
          }
      }
      transition={{
        duration: 0.8,
        delay: 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="
        group
        w-full
        max-w-[470px]
      "
    >

      <div
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-white/[0.08]
          bg-white/[0.025]
          p-6
          backdrop-blur-2xl
          transition-all
          duration-500

          hover:-translate-y-2
          hover:border-white/[0.16]
          hover:bg-white/[0.045]

          sm:p-7
        "
      >

        {/* AMBIENT GLOW */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-violet-500/[0.045]
            blur-[100px]
            transition-all
            duration-700
            group-hover:scale-150
          "
        />


        {/* DESCRIPTION */}

        <div className="relative z-10">

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-white/25
            "
          >
            What I worked on
          </p>


          <p
            className="
              mt-4
              max-w-2xl
              text-left
              text-sm
              leading-7
              text-white/45

              sm:text-[15px]
            "
          >
            {internship.description}
          </p>

        </div>


        {/* ==================================================
            META
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-6
            flex
            flex-wrap
            gap-3
          "
        >

          {/* MODE */}

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
              text-[10px]
              text-white/45
            "
          >

            <span
              className={`
                h-2
                w-2
                rounded-full
                ${internship.location === "Online"
                  ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,.8)]"
                  : "bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,.8)]"
                }
              `}
            />

            {internship.location}

          </div>


          {/* DATE */}

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
              text-[10px]
              text-white/45
            "
          >

            <MapPin size={12} />

            {internship.location}

          </div>

        </div>


        {/* ==================================================
            SKILLS
        ================================================== */}

        <div className="relative z-10 mt-6">

          <p
            className="
              mb-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.25em]
              text-white/25
            "
          >
            Technologies
          </p>


          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {internship.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{
                  y: -3,
                  scale: 1.04,
                }}
                className="
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.035]
                  px-3
                  py-1.5
                  text-[9px]
                  font-medium
                  text-white/45
                  transition-all
                  duration-300

                  hover:border-cyan-300/20
                  hover:bg-cyan-300/[0.04]
                  hover:text-cyan-200
                "
              >
                {skill}
              </motion.span>
            ))}

          </div>

        </div>


        {internship.cid && (
          <div
            className="
              relative
              z-10
              mt-5
              inline-flex
              max-w-full
              flex-wrap
              items-center
              rounded-full
              border
              border-cyan-300/15
              bg-cyan-300/[0.04]
              px-3
              py-2
              text-[10px]
              font-semibold
              text-cyan-100/65
              break-all
            "
          >
            {internship.cid}
          </div>
        )}


        {/* ==================================================
            LINK
        ================================================== */}

        {internship.link && (
          <motion.a
            href={internship.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              x: 5,
            }}
            className="
              relative
              z-10
              mt-6
              inline-flex
              items-center
              gap-2
              text-[10px]
              font-semibold
              text-white/45
              hover:text-white
            "
          >

            View Internship

            <ArrowUpRight size={13} />

          </motion.a>
        )}


        {/* BOTTOM LINE */}

        <motion.div
          initial={{
            width: 0,
          }}
          animate={
            isInView
              ? {
                width: "100%",
              }
              : {
                width: 0,
              }
          }
          transition={{
            duration: 0.9,
            delay: 0.35,
          }}
          className="
            absolute
            bottom-0
            right-0
            h-[2px]
            bg-gradient-to-l
            from-violet-400
            to-cyan-300
          "
        />

      </div>

    </motion.div>
  );
}


// ============================================================
// MAIN SECTION
// ============================================================

export default function Internships() {
  return (
    <section
      id="internship"
      className="
        relative
        overflow-hidden
        px-5
        pt-28
        pb-6

        sm:px-8
        sm:pt-32
        sm:pb-8

        lg:px-12
        lg:pt-40
        lg:pb-10
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
          top-[10%]
          h-[550px]
          w-[550px]
          rounded-full
          bg-cyan-400/[0.025]
          blur-[150px]
        "
      />


      <div
        className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[45%]
          h-[600px]
          w-[600px]
          rounded-full
          bg-violet-500/[0.025]
          blur-[160px]
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
            y: 30,
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
          }}
          className="
            mb-12
            text-center
          "
        >

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

            <BriefcaseBusiness
              size={14}
              className="text-cyan-300"
            />

            Experience

          </div>


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
            Internships
          </h2>


          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: 64,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 0.7,
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


          <p
            className="
              mx-auto
              mt-6
              max-w-xl
              text-sm
              leading-7
              text-center
              text-white/35
            "
          >
            Real-world experiences that helped me
            grow as a developer, problem solver and
            technology enthusiast.
          </p>

        </motion.div>


        {/* ====================================================
            INTERNSHIP TIMELINE
        ==================================================== */}

        <div
          className="
            space-y-16

            md:space-y-0
          "
        >

          {internships.map((internship) => (
            <InternshipItem
              key={internship.id}
              internship={internship}
            />
          ))}

        </div>


        {/* ====================================================
            END
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: false,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-6
            flex
            flex-col
            items-center
          "
        >

          <div
            className="
              h-6
              w-px
              bg-gradient-to-b
              from-white/10
              to-transparent
            "
          />


          <p
            className="
              mt-2
              text-[9px]
              uppercase
              tracking-[0.3em]
              text-white/20
            "
          >
            More experiences ahead
          </p>

        </motion.div>

      </div>

    </section>
  );
}