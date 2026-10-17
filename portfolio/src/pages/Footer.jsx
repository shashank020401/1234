import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  Mail,
  FileText,
  Home,
  User,
  Code2,
  FolderKanban,
  Briefcase,
  MessageSquare,
  Award,
} from "lucide-react";

import { assets } from "../assets/assets";

const navItems = [
  {
    label: "Home",
    id: "home",
    icon: Home,
  },
  {
    label: "About",
    id: "about",
    icon: User,
  },
  {
    label: "Skills",
    id: "skills",
    icon: Code2,
  },
  {
    label: "Projects",
    id: "projects",
    icon: FolderKanban,
  },
  {
    label: "Internship",
    id: "internship",
    icon: Briefcase,
  },
  {
    label: "Reviews",
    id: "reviews",
    icon: MessageSquare,
  },
  {
    label: "Certificates",
    id: "certificates",
    icon: Award,
  },
  {
    label: "Contact",
    id: "contact",
    icon: Mail,
  },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Footer() {

  return (
    <footer className="relative overflow-hidden bg-black text-white">

      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Top glow */}
        <motion.div
          animate={{
            x: ["-10%", "10%", "-10%"],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[-180px]
            h-[400px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-cyan-400/10
            blur-[140px]
          "
        />

        {/* Right glow */}
        <motion.div
          animate={{
            y: [0, 50, 0],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            right-[-200px]
            top-[30%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-violet-500/10
            blur-[140px]
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-[1450px] px-5 pb-6 pt-20 sm:px-8 md:px-12 lg:px-20">

        {/* ===================================================
            TOP LINE
        ==================================================== */}

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            mb-14
            h-px
            origin-left
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />


        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.15,
          }}
          className="
            grid
            grid-cols-1
            gap-14
            lg:grid-cols-[1.4fr_1fr_1fr]
            lg:gap-20
          "
        >

          {/* =================================================
              BRAND
          ================================================== */}

          <motion.div variants={itemVariants}>

            {/* Logo */}

            <motion.button
              onClick={() => scrollToSection("home")}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="mb-7"
            >
              <img
                src={assets.logo}
                alt="Portfolio Logo"
                className="
                  h-12
                  w-auto
                  object-contain
                "
                draggable={false}
              />
            </motion.button>


            {/* Heading */}

            <h2
              className="
                max-w-xl
                text-3xl
                font-semibold
                leading-tight
                tracking-tight
                sm:text-4xl
              "
            >
              Building digital
              <span className="text-white/30">
                {" "}experiences
              </span>
              <br />
              that feel different.
            </h2>


            {/* Description */}

            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-7
                text-white/40
              "
            >
              Computer Science undergraduate at MGIT crafting
              responsive web applications, intelligent systems,
              and modern full-stack experiences.
            </p>


            {/* Email */}

            <motion.a
              href="mailto:radhikashashi24@gmail.com"
              whileHover={{
                x: 5,
              }}
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-3
                text-sm
                text-white/60
                transition-colors
                hover:text-white
              "
            >

              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  backdrop-blur-xl
                "
              >
                <Mail size={16} />
              </span>

              <span>
                radhikashashi24@gmail.com
              </span>

              <ArrowUpRight
                size={15}
                className="
                  opacity-30
                  transition-all
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              />

            </motion.a>

          </motion.div>


          {/* =================================================
              NAVIGATION
          ================================================== */}

          <motion.div variants={itemVariants}>

            <p
              className="
                mb-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              Explore
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-5">

              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() =>
                      scrollToSection(item.id)
                    }
                    whileHover={{
                      x: 5,
                    }}
                    className="
                      group
                      flex
                      items-center
                      gap-2.5
                      text-left
                      text-sm
                      text-white/45
                      transition-colors
                      hover:text-white
                    "
                  >

                    <Icon
                      size={14}
                      className="
                        text-white/20
                        transition-colors
                        group-hover:text-cyan-300
                      "
                    />

                    {item.label}

                  </motion.button>
                );
              })}

            </div>

          </motion.div>


          {/* =================================================
              CONTACT / RESUME
          ================================================== */}

          <motion.div variants={itemVariants}>

            <p
              className="
                mb-7
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.3em]
                text-white/30
              "
            >
              Let's Connect
            </p>


            {/* Contact Card */}

            <motion.button
              onClick={() => scrollToSection("contact")}
              whileHover={{
                y: -4,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="
                group
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.035]
                p-5
                text-left
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-white/20
                hover:bg-white/[0.06]
              "
            >

              <div className="flex items-center justify-between">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/[0.06]
                  "
                >
                  <Mail size={17} />
                </div>

                <ArrowUpRight
                  size={17}
                  className="
                    text-white/30
                    transition-all
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-white
                  "
                />

              </div>

              <p
                className="
                  mt-5
                  text-sm
                  font-medium
                "
              >
                Have a project in mind?
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-white/30
                "
              >
                Let's build something amazing.
              </p>

            </motion.button>


            {/* Resume */}

            <motion.button
              onClick={() => scrollToSection("home")}
              whileHover={{
                x: 5,
              }}
              className="
                group
                mt-5
                flex
                items-center
                gap-3
                text-sm
                text-white/50
                transition-colors
                hover:text-white
              "
            >

              <FileText
                size={15}
                className="
                  text-white/30
                  group-hover:text-cyan-300
                "
              />

              View Resume

              <ArrowUpRight
                size={13}
                className="
                  opacity-30
                  transition-all
                  group-hover:-translate-y-1
                  group-hover:translate-x-1
                  group-hover:opacity-100
                "
              />

            </motion.button>

          </motion.div>

        </motion.div>


        {/* ===================================================
            BIG CTA
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            mt-20
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-white/[0.025]
            px-6
            py-12
            text-center
            backdrop-blur-xl
            sm:px-10
            sm:py-16
          "
        >

          {/* CTA Glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-64
              w-64
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-cyan-400
              blur-[100px]
            "
          />

          <p
            className="
              relative
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.35em]
              text-white/30
            "
          >
            Got an idea?
          </p>

          <h3
            className="
              relative
              mt-4
              text-3xl
              font-semibold
              tracking-tight
              sm:text-5xl
            "
          >
            Let's make it real.
          </h3>

          <motion.button
            onClick={() => scrollToSection("contact")}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className="
              relative
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-7
              py-3.5
              text-sm
              font-semibold
              text-black
              shadow-[0_10px_40px_rgba(255,255,255,0.08)]
            "
          >
            Start a Conversation

            <ArrowUpRight size={16} />

          </motion.button>

        </motion.div>


        {/* ===================================================
            BOTTOM
        ==================================================== */}

        <div
          className="
            mt-16
            flex
            flex-col
            gap-5
            border-t
            border-white/[0.07]
            py-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p
            className="
              text-xs
              text-white/25
            "
          >
            © {new Date().getFullYear()} Shashank.
            All rights reserved.
          </p>


          <p
            className="
              text-xs
              text-white/20
            "
          >
            Designed & built with passion.
          </p>


          {/* Back to top */}

          <motion.button
            onClick={() => scrollToSection("home")}
            whileHover={{
              y: -3,
            }}
            whileTap={{
              scale: 0.9,
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              self-start
              rounded-full
              border
              border-white/10
              bg-white/[0.03]
              text-white/50
              transition-colors
              hover:text-white
              sm:self-auto
            "
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>

        </div>


      </div>

    </footer>
  );
}