import { motion } from "framer-motion";
import {
  Award,
  CalendarDays,
  ExternalLink,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

import { assets } from "../assets/assets";


// ============================================================
// CERTIFICATE DATA
// ============================================================

const certificates = [
  {
    id: 1,

    title: "Data Visualisation: Empowering Business with Effective Insights",

    organization: "Forage",

    logo: assets.certificate1Logo,

    date: "May 22, 2026",

    description:
      "Completed practical tasks in framing business scenarios, choosing the right visuals, creating effective visualizations, and communicating insights and analysis.",

    skills: [
      "Data Visualisation",
      "Data Analysis",
      "Data Visualization",
      "Business Insights",
    ],

    link: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/MyXvBcppsW2FkNYCX_ifobHAoMjQs9s6bKS_6a10346b9df30ff690909534_1779462148672_completion_certificate.pdf",
  },

  {
    id: 2,

    title: "Responsive Web Design",

    organization: "freeCodeCamp",

    logo: assets.certificate2Logo,

    date: "August 16, 2025",

    description:
      "Successfully completed the Responsive Web Design Developer Certification, representing approximately 300 hours of work.",

    skills: [
      "HTML",
      "CSS",
      "Responsive Web Design",
      "Web Development",
    ],

    link: "https://freecodecamp.org/certification/shashank24/responsive-web-design",
  },

  {
    id: 3,

    title: "Basics of Microsoft Power BI",

    organization: "UniAthena",

    logo: assets.certificate3Logo,

    date: "February 15, 2026",

    description:
      "Successfully completed the Basics of Microsoft Power BI course developed and delivered by UniAthena in partnership with Cambridge International Qualifications, UK.",

    skills: [
      "Microsoft Power BI",
      "Data Visualization",
      "Business Intelligence",
      "Data Analysis",
    ],

    link: "https://uniathena.com/verify/certificate?certID=3906-8682-5157",
  },
];


// ============================================================
// CARD VARIANTS
// ============================================================

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.94,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};


// ============================================================
// CERTIFICATE CARD
// ============================================================

function CertificateCard({ certificate, index }) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
      transition={{
        delay: index * 0.12,
      }}
      whileHover={{
        y: -12,
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
          transition-opacity
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
          h-full
          min-h-[500px]
          flex-col
          overflow-hidden
          rounded-[30px]
          border
          border-white/[0.09]
          bg-white/[0.035]
          p-6
          shadow-[0_30px_100px_rgba(0,0,0,0.20)]
          backdrop-blur-2xl
          transition-all
          duration-500

          group-hover:border-white/[0.17]
          group-hover:bg-white/[0.055]

          sm:p-7
        "
      >

        {/* ==================================================
            AMBIENT LIGHT
        ================================================== */}

        <motion.div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-cyan-400/[0.045]
            blur-[100px]
          "
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />


        <motion.div
          className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            h-64
            w-64
            rounded-full
            bg-violet-500/[0.035]
            blur-[100px]
          "
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 6,
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
            items-start
            justify-between
          "
        >

          {/* LOGO */}

          <motion.div
            whileHover={{
              scale: 1.08,
              rotate: 4,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 16,
            }}
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.10]
              bg-white/[0.045]
              p-3
              shadow-lg
            "
          >

            <img
              src={certificate.logo}
              alt={`${certificate.organization} logo`}
              className="
                h-full
                w-full
                object-contain
              "
              draggable={false}
            />

          </motion.div>


          {/* NUMBER */}

          <div
            className="
              flex
              h-10
              min-w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.08]
              bg-white/[0.035]
              px-3
              text-[10px]
              font-bold
              tracking-[0.15em]
              text-white/30
            "
          >
            0{index + 1}
          </div>

        </div>


        {/* ==================================================
            CERTIFICATE ICON
        ================================================== */}

        <motion.div
          whileHover={{
            rotate: -8,
            scale: 1.08,
          }}
          className="
            relative
            z-10
            mt-8
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-cyan-300/[0.12]
            bg-cyan-300/[0.045]
            text-cyan-200
          "
        >

          <Award size={20} />

        </motion.div>


        {/* ==================================================
            TITLE
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-5
          "
        >

          <p
            className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.3em]
              text-cyan-300/60
            "
          >
            {certificate.organization}
          </p>


          <h3
            className="
              mt-2
              text-2xl
              font-black
              leading-tight
              tracking-[-0.04em]
              text-white
            "
          >
            {certificate.title}
          </h3>

        </div>


        {/* ==================================================
            DATE
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-5
            flex
            items-center
            gap-2
            text-[11px]
            text-white/35
          "
        >

          <CalendarDays size={13} />

          Issued {certificate.date}

        </div>


        {/* ==================================================
            DESCRIPTION
        ================================================== */}

        <p
          className="
            max-w-2xl
            relative
            z-10
            mt-5
            text-left
            text-sm
            leading-7
            text-white/40
          "
        >
          {certificate.description}
        </p>


        {/* ==================================================
            SKILLS
        ================================================== */}

        <div
          className="
            relative
            z-10
            mt-6
          "
        >

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
            Skills
          </p>


          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {certificate.skills.map((skill) => (
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
                  text-white/40
                  transition-all
                  duration-300

                  hover:border-cyan-300/20
                  hover:bg-cyan-300/[0.05]
                  hover:text-cyan-200
                "
              >
                {skill}
              </motion.span>
            ))}

          </div>

        </div>


        {/* ==================================================
            VIEW CERTIFICATE
        ================================================== */}

        <div className="relative z-10 mt-auto pt-8">

          {certificate.link && certificate.link !== "#" ? (
            <motion.a
              href={certificate.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.045]
                px-5
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300

                hover:border-cyan-300/20
                hover:bg-white/[0.07]
              "
            >

              <span className="flex items-center gap-2">

                <BadgeCheck
                  size={17}
                  className="text-cyan-300"
                />

                View Certificate

              </span>


              <ArrowUpRight
                size={17}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />

            </motion.a>
          ) : (
            <div
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-2xl
                border
                border-white/[0.06]
                bg-white/[0.025]
                px-5
                py-4
                text-sm
                font-semibold
                text-white/25
              "
            >

              <span className="flex items-center gap-2">

                <BadgeCheck size={17} />

                Certificate

              </span>

              <ExternalLink size={16} />

            </div>
          )}

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
            duration: 1,
            delay: 0.3 + index * 0.1,
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
// MAIN SECTION
// ============================================================

export default function Certificate() {
  return (
    <section
      id="certificates"
      className="
        relative
        overflow-hidden
        px-5
        pt-8
        pb-12

        sm:px-8
        sm:pt-10
        sm:pb-16

        lg:px-12
        lg:pt-12
        lg:pb-20
      "
    >

      {/* ======================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-[-15%]
          top-[10%]
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
          MAIN CONTENT
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
            mb-16
            text-center

            lg:mb-20
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

            <BadgeCheck
              size={15}
              className="text-cyan-300"
            />

            Certifications

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
            Learning Never Stops.
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
            A collection of certifications and learning
            milestones that reflect my continuous growth
            across development, AI and modern technologies.
          </p>

        </motion.div>


        {/* ====================================================
            CERTIFICATE GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-6

            md:grid-cols-2

            xl:grid-cols-3
          "
        >

          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}

        </div>


        {/* ====================================================
            FOOTER STAT
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-14
            flex
            items-center
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
                text-cyan-300
              "
            >

              <Award size={14} />

            </div>


            <span
              className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-white/30
              "
            >
              3 Certifications & Counting
            </span>

          </div>

        </motion.div>

      </div>

    </section>
  );
}