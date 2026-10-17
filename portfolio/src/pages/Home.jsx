import { useEffect, useRef, useState } from "react";

import {
  ArrowUpRight,
  Download,
  FileText,
  Mail,
  MousePointer2,
  Sparkles,
  X,
} from "lucide-react";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { assets } from "../assets/assets";


// ============================================================
// HOME
// ============================================================

export default function Home() {
  const heroRef = useRef(null);

  const [resumeOpen, setResumeOpen] = useState(false);

  // ==========================================================
  // CURSOR MOTION
  // ==========================================================

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 120,
    damping: 20,
    mass: 0.6,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 120,
    damping: 20,
    mass: 0.6,
  });

  const rotateX = useTransform(
    smoothY,
    [-500, 500],
    [7, -7]
  );

  const rotateY = useTransform(
    smoothX,
    [-500, 500],
    [-7, 7]
  );

  const avatarX = useTransform(
    smoothX,
    [-500, 500],
    [-15, 15]
  );

  const avatarY = useTransform(
    smoothY,
    [-500, 500],
    [-15, 15]
  );

  const glowX = useTransform(
    smoothX,
    [-500, 500],
    [-120, 120]
  );

  const glowY = useTransform(
    smoothY,
    [-500, 500],
    [-120, 120]
  );

  // ==========================================================
  // OPEN RESUME FROM NAVBAR
  // ==========================================================

  useEffect(() => {
    const handleOpenResume = () => {
      setResumeOpen(true);
      document.body.style.overflow = "hidden";
    };

    window.addEventListener(
      "open-resume",
      handleOpenResume
    );

    return () => {
      window.removeEventListener(
        "open-resume",
        handleOpenResume
      );
    };
  }, []);

  // ==========================================================
  // ESC KEY
  // ==========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setResumeOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  // ==========================================================
  // BODY SCROLL LOCK
  // ==========================================================

  useEffect(() => {
    if (resumeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [resumeOpen]);

  // ==========================================================
  // MOUSE MOVE
  // ==========================================================

  const handleMouseMove = (event) => {
    const element = heroRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x =
      event.clientX -
      (rect.left + rect.width / 2);

    const y =
      event.clientY -
      (rect.top + rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  // ==========================================================
  // RESUME
  // ==========================================================

  const openResume = () => {
    setResumeOpen(true);
  };

  const closeResume = () => {
    setResumeOpen(false);
  };

  return (
    <>
      {/* ======================================================
          HOME
          ====================================================== */}

      <section
        id="home"
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="
          relative
          min-h-screen
          overflow-hidden
          px-5
          pb-20
          pt-32
          sm:px-8
          lg:px-12
        "
      >

        {/* ====================================================
            BACKGROUND
            ==================================================== */}

        <div className="pointer-events-none absolute inset-0">

          {/* Purple Glow */}

          <motion.div
            animate={{
              x: [0, 80, -30, 0],
              y: [0, -40, 50, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -left-52
              top-20
              h-[550px]
              w-[550px]
              rounded-full
              bg-violet-500/[0.08]
              blur-[140px]
              dark:bg-violet-500/[0.13]
            "
          />

          {/* Cyan Glow */}

          <motion.div
            animate={{
              x: [0, -70, 40, 0],
              y: [0, 50, -30, 0],
              scale: [1, 0.9, 1.15, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-52
              top-1/3
              h-[600px]
              w-[600px]
              rounded-full
              bg-cyan-400/[0.06]
              blur-[150px]
              dark:bg-cyan-400/[0.10]
            "
          />

          {/* Bottom Glow */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.55, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              bottom-[-350px]
              left-1/2
              h-[700px]
              w-[700px]
              -translate-x-1/2
              rounded-full
              bg-blue-500/[0.05]
              blur-[150px]
            "
          />

          {/* Grid */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.025]
              dark:opacity-[0.045]
              [background-image:linear-gradient(rgba(0,0,0,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.8)_1px,transparent_1px)]
              [background-size:80px_80px]
            "
          />

          {/* Dots */}

          <div
            className="
              absolute
              inset-0
              opacity-[0.035]
              [background-image:radial-gradient(circle,rgba(0,0,0,.8)_1px,transparent_1px)]
              [background-size:28px_28px]
            "
          />
        </div>


        {/* ====================================================
            MAIN CONTENT
            ==================================================== */}

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            min-h-[calc(100vh-9rem)]
            max-w-7xl
            items-center
          "
        >

          <div
            className="
              grid
              w-full
              items-center
              gap-12
              lg:grid-cols-[1.05fr_0.95fr]
            "
          >

            {/* ==================================================
                LEFT CONTENT
                ================================================== */}

            <div>

              {/* Available Badge */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                }}
                className="
                  mb-7
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white/[0.45]
                  px-4
                  py-2
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  text-neutral-500
                  shadow-sm
                  backdrop-blur-xl
                  dark:border-white/[0.08]
                  dark:bg-white/[0.04]
                  dark:text-neutral-400
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-emerald-500
                    shadow-[0_0_12px_rgba(52,211,153,.8)]
                  "
                />

                Available for opportunities
              </motion.div>


              {/* ==================================================
                  NAME
                  ================================================== */}

              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="
                  max-w-4xl
                  text-[clamp(4rem,7.5vw,8.5rem)]
                  font-black
                  leading-[0.82]
                  tracking-[-0.08em]
                  text-neutral-950
                  dark:text-white
                "
              >
                SHASHANK PUNNA

                <span
                  className="
                    text-neutral-300
                    dark:text-neutral-700
                  "
                >
                  .
                </span>
              </motion.h1>


              {/* ==================================================
                  DESCRIPTION
                  ================================================== */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }}
                className="
                  mt-8
                  max-w-2xl
                  text-left
                  text-lg
                  leading-8
                  text-neutral-500
                  sm:text-xl
                  dark:text-neutral-400
                "
              >
                Computer Science undergraduate at Malla Reddy University building{" "}
                <span className="font-medium text-neutral-900 dark:text-white">
                  modern web experiences, REST API's
                </span>{" "}
                and{" "}
                <span className="font-medium text-neutral-900 dark:text-white">
                  AI-powered full-stack applications.
                </span>
              </motion.p>


              {/* ==================================================
                  RESUME + LET'S TALK
                  ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                }}
                className="
                  mt-9
                  flex
                  flex-wrap
                  items-center
                  gap-3
                "
              >

                {/* Resume */}

                <motion.button
                  onClick={openResume}
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    group
                    flex
                    items-center
                    gap-3
                    rounded-full
                    bg-neutral-950
                    px-7
                    py-4
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_15px_40px_rgba(0,0,0,.15)]
                    transition-shadow
                    hover:shadow-[0_20px_50px_rgba(0,0,0,.22)]
                    dark:bg-white
                    dark:text-neutral-950
                  "
                >

                  <FileText size={17} />

                  Resume

                  <ArrowUpRight
                    size={16}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />

                </motion.button>


                {/* Let's Talk */}

                <motion.button
                  onClick={() =>
                    scrollTo("contact")
                  }
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-white/[0.45]
                    px-7
                    py-4
                    text-sm
                    font-semibold
                    text-neutral-800
                    backdrop-blur-xl
                    transition-colors
                    hover:bg-white/[0.7]
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:text-white
                    dark:hover:bg-white/[0.08]
                  "
                >

                  Let's talk

                  <Mail size={17} />

                </motion.button>

              </motion.div>


              {/* ==================================================
                  SOCIAL ICONS
                  ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.65,
                }}
                className="
                  mt-10
                  flex
                  items-center
                  gap-3
                "
              >

                {/* GitHub */}

                <motion.a
                  href="https://github.com/shashank020401"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  className="
                    group
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-white/[0.4]
                    p-2.5
                    shadow-sm
                    backdrop-blur-xl
                    transition-all
                    hover:bg-white/[0.75]
                    hover:shadow-lg
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:hover:bg-white/[0.10]
                  "
                >

                  <img
                    src={assets.github}
                    alt="GitHub"
                    className="
                      h-5
                      w-5
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                </motion.a>


                {/* LinkedIn */}

                <motion.a
                  href="https://www.linkedin.com/in/shashank-punna-0b8858312/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  className="
                    group
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-white/[0.4]
                    p-2.5
                    shadow-sm
                    backdrop-blur-xl
                    transition-all
                    hover:bg-white/[0.75]
                    hover:shadow-lg
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:hover:bg-white/[0.10]
                  "
                >

                  <img
                    src={assets.linkedin}
                    alt="LinkedIn"
                    className="
                      h-5
                      w-5
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    "
                  />

                </motion.a>


                {/* Email */}

                <motion.a
                  href="mailto:your@email.com"
                  aria-label="Email"
                  whileHover={{
                    y: -5,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.92,
                  }}
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black/[0.08]
                    bg-white/[0.4]
                    text-neutral-500
                    shadow-sm
                    backdrop-blur-xl
                    transition-all
                    hover:bg-white/[0.75]
                    hover:text-neutral-950
                    hover:shadow-lg
                    dark:border-white/[0.08]
                    dark:bg-white/[0.04]
                    dark:text-neutral-400
                    dark:hover:bg-white/[0.10]
                    dark:hover:text-white
                  "
                >

                  <Mail size={18} />

                </motion.a>

              </motion.div>

            </div>


            {/* ==================================================
                RIGHT — AVATAR
                ================================================== */}

            <motion.div
              style={{
                rotateX,
                rotateY,
              }}
              initial={{
                opacity: 0,
                scale: 0.85,
                x: 50,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative
                mx-auto
                h-[560px]
                w-full
                max-w-[560px]
                [transform-style:preserve-3d]
              "
            >

              {/* Cursor Glow */}

              <motion.div
                style={{
                  x: glowX,
                  y: glowY,
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[350px]
                  w-[350px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-violet-500/[0.12]
                  blur-[100px]
                "
              />


              {/* Orbit 1 */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[470px]
                  w-[470px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-black/[0.06]
                  dark:border-white/[0.07]
                "
              >

                <span
                  className="
                    absolute
                    left-1/2
                    top-[-4px]
                    h-2
                    w-2
                    -translate-x-1/2
                    rounded-full
                    bg-violet-400
                    shadow-[0_0_20px_rgba(167,139,250,.8)]
                  "
                />

              </motion.div>


              {/* Orbit 2 */}

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[380px]
                  w-[380px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  border
                  border-dashed
                  border-black/[0.07]
                  dark:border-white/[0.07]
                "
              >

                <span
                  className="
                    absolute
                    right-[-3px]
                    top-1/2
                    h-2
                    w-2
                    -translate-y-1/2
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_20px_rgba(34,211,238,.8)]
                  "
                />

              </motion.div>


              {/* ==================================================
                  GLASS AVATAR
                  ================================================== */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-[390px]
                  w-[310px]
                  -translate-x-1/2
                  -translate-y-1/2
                  overflow-hidden
                  rounded-[45%]
                  border
                  border-white/30
                  bg-white/[0.12]
                  shadow-[inset_0_1px_0_rgba(255,255,255,.45),0_40px_100px_rgba(0,0,0,.12)]
                  backdrop-blur-2xl
                  dark:border-white/[0.10]
                  dark:bg-white/[0.035]
                "
              >

                {/* Reflection */}

                <motion.div
                  animate={{
                    x: [
                      "-150%",
                      "160%",
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    inset-y-0
                    z-30
                    w-20
                    rotate-[20deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/25
                    to-transparent
                    blur-sm
                  "
                />


                {/* Avatar */}

                <motion.img
                  src={assets.avator}
                  alt="Shashank cartoon avatar"
                  draggable="false"
                  style={{
                    x: avatarX,
                    y: avatarY,
                  }}
                  className="
                    absolute
                    bottom-0
                    left-1/2
                    z-20
                    h-[390px]
                    w-auto
                    max-w-[100%]
                    -translate-x-1/2
                    select-none
                    object-contain
                    drop-shadow-[0_30px_30px_rgba(0,0,0,.18)]
                  "
                />

              </div>


              {/* ==================================================
                  FLOATING CARD 1
                  ================================================== */}

              <FloatingCard
                icon={Sparkles}
                title="WEB DEVELOPER"
                subtitle="Building digital experiences"
                className="
                  left-0
                  top-[20%]
                "
                delay={0.5}
              />


              {/* ==================================================
                  FLOATING CARD 2
                  ================================================== */}

              <FloatingCard
                icon={MousePointer2}
                title="INTERACTIVE"
                subtitle="Motion · UI · UX"
                className="
                  right-0
                  bottom-[25%]
                "
                delay={0.8}
              />


              {/* Currently Building */}

              <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-[5%]
                  left-1/2
                  flex
                  -translate-x-1/2
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white/[0.5]
                  px-4
                  py-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-neutral-500
                  shadow-lg
                  backdrop-blur-xl
                  dark:border-white/[0.08]
                  dark:bg-black/20
                  dark:text-neutral-400
                "
              >

                <span
                  className="
                    h-1.5
                    w-1.5
                    animate-pulse
                    rounded-full
                    bg-emerald-400
                  "
                />

                Currently building

              </motion.div>

            </motion.div>

          </div>
        </div>

      </section>


      {/* ======================================================
          RESUME MODAL
          ====================================================== */}

      <ResumeModal
        open={resumeOpen}
        onClose={closeResume}
      />
    </>
  );
}


// ============================================================
// FLOATING GLASS CARD
// ============================================================

function FloatingCard({
  icon: Icon,
  title,
  subtitle,
  className,
  delay,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: {
          duration: 0.6,
          delay,
        },
        scale: {
          duration: 0.6,
          delay,
        },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={`
        absolute
        z-40
        w-[165px]
        rounded-2xl
        border
        border-white/30
        bg-white/[0.45]
        p-3
        shadow-[0_20px_50px_rgba(0,0,0,.08)]
        backdrop-blur-xl
        dark:border-white/[0.10]
        dark:bg-black/20
        ${className}
      `}
    >

      <div className="flex items-center gap-3">

        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-black/[0.06]
            bg-white/60
            text-neutral-700
            dark:border-white/[0.07]
            dark:bg-white/[0.05]
            dark:text-neutral-300
          "
        >
          <Icon size={15} />
        </div>

        <div className="min-w-0">

          <p
            className="
              truncate
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-neutral-400
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              truncate
              text-[10px]
              text-neutral-600
              dark:text-neutral-300
            "
          >
            {subtitle}
          </p>

        </div>

      </div>

    </motion.div>
  );
}


// ============================================================
// RESUME MODAL
// ============================================================

function ResumeModal({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        p-3
        sm:p-6
      "
    >

      {/* ====================================================
          BACKDROP
          ==================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-black/70
          backdrop-blur-xl
        "
      />


      {/* ====================================================
          MODAL
          ==================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 40,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          relative
          z-10
          flex
          h-[94vh]
          w-full
          max-w-6xl
          flex-col
          overflow-hidden
          rounded-[2rem]
          border
          border-white/20
          bg-white/[0.92]
          shadow-[0_40px_120px_rgba(0,0,0,.45)]
          backdrop-blur-3xl
          dark:bg-neutral-950/[0.96]
        "
      >

        {/* ==================================================
            HEADER
            ================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-black/[0.08]
            px-5
            py-4
            dark:border-white/[0.08]
            sm:px-6
          "
        >

          {/* Resume Info */}

          <div className="flex items-center gap-3">

            <motion.div
              whileHover={{
                rotate: -5,
                scale: 1.05,
              }}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-black/[0.08]
                bg-neutral-100
                text-neutral-800
                dark:border-white/[0.08]
                dark:bg-white/[0.06]
                dark:text-white
              "
            >
              <FileText size={19} />
            </motion.div>

            <div>

              <h2
                className="
                  text-sm
                  font-semibold
                  text-neutral-950
                  dark:text-white
                "
              >
                My Resume
              </h2>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                  text-neutral-400
                "
              >
                Frontend Developer
              </p>

            </div>

          </div>


          {/* ==================================================
              HEADER ACTIONS
              ================================================== */}

          <div className="flex items-center gap-2">

            {/* DOWNLOAD */}

            <motion.a
              href={assets.resume}
              download="Shashank-Resume.pdf"
              whileHover={{
                y: -2,
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
              className="
                flex
                items-center
                gap-2.5
                rounded-full
                px-6
                py-3
                text-xs
                font-bold
                tracking-wide
                shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                transition-all
                duration-300
                hover:bg-neutral-100
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
              "
            >

              <Download
                size={15}
                strokeWidth={2.5}
              />

              <span>
                DOWNLOAD RESUME
              </span>

            </motion.a>


            {/* MOBILE DOWNLOAD */}

            <motion.a
              href={assets.resume}
              download="Shashank-Resume.pdf"
              whileTap={{
                scale: 0.9,
              }}
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
              }}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                shadow-lg
                sm:hidden
              "
              aria-label="Download resume"
            >

              <Download size={16} />

            </motion.a>


            {/* CLOSE */}

            <motion.button
              onClick={onClose}
              whileHover={{
                rotate: 90,
                scale: 1.08,
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
                rounded-full
                border
                border-white/20
                bg-white/[0.08]
                text-white
                transition-colors
                hover:bg-white
                hover:text-black
              "
              aria-label="Close resume"
            >

              <X size={18} />

            </motion.button>

          </div>

        </div>


        {/* ==================================================
            PDF PREVIEW
            ================================================== */}

        <div
          className="
            relative
            min-h-0
            flex-1
            overflow-hidden
            bg-neutral-200
            dark:bg-neutral-900
          "
        >

          {/* Preview Label */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-4
              z-20
              -translate-x-1/2
              rounded-full
              border
              border-black/[0.08]
              bg-white/80
              px-4
              py-2
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-neutral-500
              shadow-md
              backdrop-blur-xl
            "
          >
            Resume Preview
          </motion.div>


          {/* ==================================================
              ACTUAL PDF
              ================================================== */}

          <iframe
            src={`${assets.resume}#toolbar=0&navpanes=0&scrollbar=1`}
            title="Shashank Resume Preview"
            className="
              relative
              z-10
              h-full
              w-full
              border-0
              bg-white
            "
          />

        </div>


        {/* ==================================================
            MOBILE FOOTER
            ================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-t
            border-black/[0.08]
            px-5
            py-3
            dark:border-white/[0.08]
            sm:hidden
          "
        >

          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-neutral-400
            "
          >
            Resume · PDF
          </span>

          <a
            href={assets.resume}
            download="Shashank-Resume.pdf"
            style={{
              backgroundColor: "#000000",
              color: "#ffffff",
            }}
            className="
              flex
              items-center
              gap-2
              rounded-full
              px-4
              py-2.5
              text-xs
              font-semibold
            "
          >

            <Download size={13} />

            Download

          </a>

        </div>

      </motion.div>

    </motion.div>
  );
}