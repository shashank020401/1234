import { useRef } from "react";

import {
  Award,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Layers3,
  Sparkles,
  Brain,
  ArrowUpRight,
} from "lucide-react";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { assets } from "../assets/assets";


// ============================================================
// ABOUT SECTION
// ============================================================

export default function About() {
  const sectionRef = useRef(null);

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.12,
  });

  // ==========================================================
  // 3D MOUSE MOTION
  // ==========================================================

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-250, 250], [4, -4]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-250, 250], [-4, 4]),
    {
      stiffness: 180,
      damping: 22,
    }
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(
      event.clientX - (rect.left + rect.width / 2)
    );

    mouseY.set(
      event.clientY - (rect.top + rect.height / 2)
    );
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };


  // ==========================================================
  // VIEW ALL CERTIFICATES
  // ==========================================================

  const handleViewCertificates = () => {
    document
      .getElementById("certificates")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };


  return (
    <section
      id="about"
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        px-5
        pt-10
        pb-12
        sm:px-8
        lg:px-12
        lg:pt-16
        lg:pb-16
      "
    >

      {/* ======================================================
          BACKGROUND
          ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Purple Glow */}

        <motion.div
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -40, 40, 0],
            scale: [1, 1.12, 0.96, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-60
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            bg-violet-500/[0.06]
            blur-[140px]
            dark:bg-violet-500/[0.10]
          "
        />

        {/* Cyan Glow */}

        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 50, -20, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-60
            top-1/3
            h-[550px]
            w-[550px]
            rounded-full
            bg-cyan-400/[0.05]
            blur-[150px]
            dark:bg-cyan-400/[0.08]
          "
        />

        {/* Grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            dark:opacity-[0.04]
            [background-image:linear-gradient(rgba(0,0,0,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.8)_1px,transparent_1px)]
            [background-size:80px_80px]
          "
        />

      </div>


      {/* ======================================================
          MAIN CONTAINER
          ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">


        {/* ====================================================
            SECTION HEADER
            ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
              }
              : {}
          }
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          {/* Label */}

          <motion.div
            whileHover={{
              y: -2,
            }}
            className="
              mb-5
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

            <Sparkles
              size={15}
              className="text-white"
            />

            About me

          </motion.div>


          {/* Heading */}

          <h2
            className="
              text-5xl
              font-black
              leading-[0.95]
              tracking-[-0.06em]
              text-neutral-950
              sm:text-6xl
              lg:text-7xl
              dark:text-white
            "
          >
            Building ideas
            <br />

            <span
              className="
                text-neutral-300
                dark:text-neutral-700
              "
            >
              into reality.
            </span>
          </h2>


          {/* Description */}

          <p
            className="
              mx-auto
              mt-7
              max-w-2xl
              text-center
              text-base
              leading-8
              text-neutral-500
              sm:text-lg
              dark:text-neutral-400
            "
          >
            A Computer Science undergraduate at Malla Reddy University
            passionate about building responsive web applications,
            full-stack solutions, and AI-powered experiences
            using modern web technologies.
          </p>

        </motion.div>


        {/* ====================================================
            PROFILE + STATISTICS
            ==================================================== */}

        <div
          className="
            grid
            gap-5
            lg:grid-cols-[1.25fr_0.75fr]
          "
        >

          {/* ==================================================
              PROFILE CARD
              ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -40,
            }}
            animate={
              isInView
                ? {
                  opacity: 1,
                  x: 0,
                }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.1,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-black/[0.07]
              bg-white/[0.5]
              p-6
              shadow-[0_25px_80px_rgba(0,0,0,.06)]
              backdrop-blur-2xl
              sm:p-8
              dark:border-white/[0.08]
              dark:bg-white/[0.035]
            "
          >

            {/* Card Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-violet-400/[0.10]
                blur-[80px]
                transition-transform
                duration-700
                group-hover:scale-125
              "
            />


            {/* ==================================================
                PROFILE HEADER
                ================================================== */}

            <div
              className="
                relative
                flex
                flex-col
                gap-6
                sm:flex-row
                sm:items-center
              "
            >

              {/* PROFILE IMAGE */}

              <motion.div
                whileHover={{
                  scale: 1.04,
                  rotate: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 15,
                }}
                className="
                  relative
                  h-32
                  w-32
                  shrink-0
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/30
                  bg-neutral-100
                  shadow-[0_20px_50px_rgba(0,0,0,.12)]
                  dark:border-white/[0.10]
                  dark:bg-white/[0.05]
                "
              >

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-10
                    bg-gradient-to-t
                    from-black/15
                    via-transparent
                    to-white/20
                  "
                />

                <img
                  src={assets.profile}
                  alt="Shashank"
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />

              </motion.div>


              {/* Profile Heading */}

              <div>

                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-neutral-400
                  "
                >
                  Professional Summary
                </p>

                <h3
                  className="
                    mt-2
                    text-3xl
                    font-black
                    leading-tight
                    tracking-[-0.04em]
                    text-neutral-950
                    sm:text-4xl
                    dark:text-white
                  "
                >
                  Web Developer by passion.
                  <br />
                  Builder by choice.
                </h3>

              </div>

            </div>


            {/* ==================================================
                SUMMARY
                ================================================== */}
            <br />
            <p
              className="
                relative
                mt-7
                max-w-2xl
                text-left
                text-sm
                leading-7
                text-neutral-500
                sm:text-base
                dark:text-neutral-400
              "
            >
              Computer Science Engineering undergraduate seeking an entry-level Frontend Developer position or internship.
              Skilled in developing responsive user interfaces using HTML5, CSS3, JavaScript, React.js, and Tailwind CSS.
              Experienced in building academic and personal web projects, including full-stack applications and an AI-powered
              virtual assistant. Familiar with REST API integration, MongoDB, Node.js, and modern development tools. Eager to
              contribute to real-world projects and build user-friendly web applications..
            </p>


          </motion.div>


          {/* ==================================================
              STATISTICS
              ================================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-5
            "
          >

            <StatCard
              icon={GraduationCap}
              value="8.36"
              label="CGPA"
              description="Academic performance"
              delay={0.15}
              inView={isInView}
            />

            <StatCard
              icon={Layers3}
              value="4"
              label="Projects"
              description="Built & shipped"
              delay={0.22}
              inView={isInView}
            />

            <StatCard
              icon={Award}
              value="8"
              label="Certifications"
              description="Professional learning"
              delay={0.29}
              inView={isInView}
            />

            <StatCard
              icon={Brain}
              value="AI"
              label="Exploration"
              description="AI & Generative AI"
              delay={0.24}
              inView={isInView}
            />

          </div>

        </div>


        {/* ====================================================
            CERTIFICATIONS
            ==================================================== */}

        <motion.div
          id="about-certifications"
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={
            isInView
              ? {
                opacity: 1,
                y: 0,
              }
              : {}
          }
          transition={{
            duration: 0.8,
            delay: 0.45,
          }}
          className="
            mt-16
            scroll-mt-32
          "
        >

          {/* Certification Header */}

          <div
            className="
              mb-7
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-neutral-400
                "
              >
                Credentials
              </p>

              <h3
                className="
                  mt-2
                  text-3xl
                  font-black
                  tracking-tight
                  text-neutral-950
                  sm:text-4xl
                  dark:text-white
                "
              >
                Certifications
              </h3>

            </div>


            {/* View All */}

            <motion.button
              onClick={handleViewCertificates}
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                flex
                w-fit
                items-center
                gap-2.5
                rounded-full
                border
                border-black/[0.08]
                bg-white/[0.55]
                px-5
                py-3
                text-xs
                font-semibold
                text-neutral-800
                shadow-sm
                backdrop-blur-xl
                transition-all
                hover:bg-white/[0.8]
                hover:shadow-lg
                dark:border-white/[0.08]
                dark:bg-white/[0.04]
                dark:text-white
                dark:hover:bg-white/[0.08]
              "
            >

              <BookOpen size={15} />

              View all certificates

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />

            </motion.button>

          </div>


          {/* ==================================================
              CERTIFICATE CARDS
              ================================================== */}

          <div
            className="
              grid
              gap-4
              md:grid-cols-2
              xl:grid-cols-3
            "
          >

            {/* CERTIFICATE 1 */}

            <CertificationCard
              title="Google Cloud Data Analytics"
              organization="Google"
              year="Jun 2026"
              logo={assets.certificationLogo1}
              href="https://www.credly.com/badges/7564be60-ef88-4682-8cc9-609b811d1098/linked_in_profile"
              icon={Award}
              delay={0.5}
              inView={isInView}
            />


            {/* CERTIFICATE 2 */}

            <CertificationCard
              title="AWS Academy Graduate - Cloud Security Foundations"
              organization="AWS Academy"
              year="Oct 2026"
              logo={assets.certificationLogo2}
              href="https://www.credly.com/badges/975e1c9b-eba9-48e1-8671-48595fae8648/linked_in_profile"
              icon={Award}
              delay={0.58}
              inView={isInView}
            />


            {/* CERTIFICATE 3 */}

            <CertificationCard
              title="AI Fundamentals: Foundations for Understanding AI"
              organization="IBM"
              year="Jul 2026"
              logo={assets.certificationLogo3}
              href="https://www.credly.com/badges/7f936c90-13e6-4162-9d58-57aba5bbe565/linked_in_profile"
              icon={Award}
              delay={0.66}
              inView={isInView}
            />

          </div>

        </motion.div>


        {/* ====================================================
            BOTTOM
            ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={
            isInView
              ? {
                opacity: 1,
              }
              : {}
          }
          transition={{
            duration: 1,
            delay: 0.9,
          }}
          className="
            mt-16
            flex
            items-center
            justify-center
            gap-3
          "
        >

          <span
            className="
              h-px
              w-10
              bg-neutral-200
              dark:bg-neutral-800
            "
          />

          <span
            className="
              text-xs
              font-medium
              tracking-wide
              text-neutral-400
            "
          >
            Learn · Build · Iterate
          </span>

          <span
            className="
              h-px
              w-10
              bg-neutral-200
              dark:bg-neutral-800
            "
          />

        </motion.div>

      </div>

    </section>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  icon: Icon,
  value,
  label,
  description,
  delay,
  inView,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
      }}
      animate={
        inView
          ? {
            opacity: 1,
            y: 0,
            scale: 1,
          }
          : {}
      }
      transition={{
        duration: 0.65,
        delay,
      }}
      whileHover={{
        y: -7,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[1.7rem]
        border
        border-black/[0.07]
        bg-white/[0.5]
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,.05)]
        backdrop-blur-2xl
        transition-shadow
        hover:shadow-[0_25px_70px_rgba(0,0,0,.09)]
        dark:border-white/[0.08]
        dark:bg-white/[0.035]
      "
    >

      <div
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-violet-400/[0.08]
          blur-2xl
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />

      <div
        className="
          mb-6
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-black/[0.06]
          bg-white/60
          text-neutral-600
          dark:border-white/[0.08]
          dark:bg-white/[0.05]
          dark:text-neutral-300
        "
      >
        <Icon size={17} />
      </div>

      <div
        className="
          text-4xl
          font-black
          tracking-[-0.05em]
          text-neutral-950
          dark:text-white
        "
      >
        {value}
      </div>

      <p
        className="
          mt-2
          text-sm
          font-semibold
          text-neutral-800
          dark:text-neutral-200
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          text-[10px]
          leading-5
          text-neutral-400
        "
      >
        {description}
      </p>

    </motion.div>
  );
}


// ============================================================
// CERTIFICATION CARD
// ============================================================

function CertificationCard({
  title,
  organization,
  year,
  logo,
  href,
  icon: Icon,
  delay,
  inView,
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={
        inView
          ? {
            opacity: 1,
            y: 0,
          }
          : {}
      }
      transition={{
        duration: 0.65,
        delay,
      }}
      whileHover={{
        y: -7,
      }}
      whileTap={{
        scale: 0.98,
      }}
      className="
        group
        relative
        flex
        min-h-[145px]
        items-center
        gap-4
        overflow-hidden
        rounded-2xl
        border
        border-black/[0.07]
        bg-white/[0.5]
        p-5
        shadow-sm
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-black/[0.12]
        hover:shadow-[0_20px_50px_rgba(0,0,0,.08)]
        dark:border-white/[0.08]
        dark:bg-white/[0.035]
        dark:hover:border-white/[0.15]
      "
    >

      {/* Hover Glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-violet-400/[0.08]
          blur-3xl
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />


      {/* Organization Logo */}

      <motion.div
        whileHover={{
          scale: 1.08,
          rotate: 2,
        }}
        className="
          relative
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border
          border-black/[0.07]
          bg-white/80
          p-2.5
          shadow-sm
          dark:border-white/[0.08]
          dark:bg-white/[0.06]
        "
      >

        {logo ? (
          <img
            src={logo}
            alt={`${organization} logo`}
            className="
              h-full
              w-full
              object-contain
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />
        ) : (
          <Icon
            size={21}
            className="
              text-neutral-600
              dark:text-neutral-300
            "
          />
        )}

      </motion.div>


      {/* Content */}

      <div
        className="
          relative
          min-w-0
          flex-1
        "
      >

        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >

          <h4
            className="
              line-clamp-2
              text-sm
              font-bold
              leading-5
              text-neutral-900
              dark:text-white
            "
          >
            {title}
          </h4>

          <ExternalLink
            size={15}
            className="
              mt-0.5
              shrink-0
              text-neutral-400
              transition-all
              duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
              group-hover:text-neutral-900
              dark:group-hover:text-white
            "
          />

        </div>


        <p
          className="
            mt-1.5
            truncate
            text-[10px]
            font-medium
            text-neutral-400
          "
        >
          {organization}
        </p>


        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            gap-2
          "
        >

          <span
            className="
              rounded-full
              border
              border-black/[0.06]
              bg-black/[0.025]
              px-2.5
              py-1
              text-[9px]
              font-semibold
              uppercase
              tracking-wider
              text-neutral-400
              dark:border-white/[0.07]
              dark:bg-white/[0.03]
            "
          >
            Certified · {year}
          </span>

          <span
            className="
              text-[9px]
              font-semibold
              text-neutral-400
              opacity-0
              transition-all
              duration-300
              group-hover:translate-x-0
              group-hover:opacity-100
            "
          >
            Verify ↗
          </span>

        </div>

      </div>


      {/* Animated Bottom Line */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          origin-left
          scale-x-0
          bg-neutral-950
          transition-transform
          duration-500
          group-hover:scale-x-100
          dark:bg-white
        "
      />

    </motion.a>
  );
}