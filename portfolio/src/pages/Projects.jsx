import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

import { ArrowUpRight, RotateCcw } from "lucide-react";

import { assets } from "../assets/assets";


// ============================================================
// MOBILE DETECTION
// ============================================================

const useIsMobile = (
  query = "(max-width: 639px)"
) => {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined")
      return;

    const mql =
      window.matchMedia(query);

    const handler = (event) => {
      setIsMobile(event.matches);
    };

    mql.addEventListener(
      "change",
      handler
    );

    return () =>
      mql.removeEventListener(
        "change",
        handler
      );
  }, [query]);

  return isMobile;
};


// ============================================================
// PROJECTS
// ============================================================

const projectData = [
  {
    id: 1,

    title: "Curato",

    category: "E-Commerce Web App",

    image: assets.project1,

    mobileImage: assets.project1Mobile,

    description:
      'A modern e-commerce platform built with React, featuring responsive design, intuitive product discovery, and a seamless shopping experience.',
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
    ],

    github: "https://github.com/shashank020401/Curato",

    cid: "Certificate ID: 2026-5C325DAF75",

    bgColor: "#111111",
  },

  {
    id: 2,

    title: "EDITH",

    category: "AI Web Application",

    image: assets.project2,

    mobileImage: assets.project2Mobile,

    description:
      'A modern AI-powered platform designed with an intuitive interface to deliver a seamless and engaging digital experience.',

    skills: [
      "React.js",
      'JavaScript ',
      'AI Integration',
      'Framer Motion'
    ],

    github: "https://github.com/shashank020401/E-D-I-T-H",

    link: "https://edith-self.vercel.app/",

    bgColor: "#162033",
  },

  {
    id: 3,

    title: "AdSprint",

    category: "AI / SAAS",

    image: assets.project3,

    mobileImage: assets.project3Mobile,

    description:
      "An AI-powered advertising platform for creating engaging video ads and streamlining creative campaigns faster.",

    skills: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "AI Integration",
      "REST APIs",
    ],

    cid: "Certificate ID: 2026-5C325DAF75",

    bgColor: "#24172d",

    status: "In Progress",
  },

  {
    id: 4,

    title: "Nivasa",

    category: "TRAVEL / BOOKING",

    image: assets.project4,

    mobileImage: assets.project4Mobile,

    description:
      "A modern hotel booking platform designed for discovering destinations, exploring stays, and managing reservations with a seamless user experience.",

    skills: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Responsive Design",
      "UI/UX",
    ],

    github: "https://github.com/",

    link: "https://example.com/",

    bgColor: "#172d2d",

    status: "In Progress",
  },
];


// ============================================================
// PROJECT CARD
// ============================================================

const ProjectCard = ({
  project,
  isMobile,
}) => {
  const [flipped, setFlipped] =
    useState(false);

  const image =
    isMobile && project.mobileImage
      ? project.mobileImage
      : project.image;

  return (
    <div
      className="
        relative
        mx-auto
        w-[88%]
        max-w-[1200px]
        [perspective:1800px]
      "
    >

      {/* =====================================================
          FLIP CONTAINER
      ====================================================== */}

      <motion.div
        animate={{
          rotateY: flipped ? 180 : 0,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="
          relative
          h-[56vh]
          min-h-[380px]
          w-full
          cursor-pointer

          sm:h-[65vh]
        "
        onClick={() =>
          setFlipped(!flipped)
        }
      >

        {/* =================================================
            FRONT
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.12]
            bg-black/20
            shadow-[0_30px_100px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            [backface-visibility:hidden]
          "
        >

          {/* IMAGE */}

          <motion.img
            src={image}
            alt={project.title}
            draggable={false}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              object-center
              [object-position:center]
            "
            animate={{
              scale: [1.03, 1],
            }}
            transition={{
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformOrigin: "center center",
              backgroundColor: "rgba(255,255,255,0.02)",
            }}
          />


          {/* DARK OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/75
              via-black/10
              to-black/10
            "
          />


          {/* TOP CATEGORY */}

          <div
            className="
              absolute
              left-5
              top-5
              rounded-full
              border
              border-white/[0.15]
              bg-black/25
              px-4
              py-2
              text-[9px]
              font-bold
              tracking-[0.2em]
              text-white/75
              backdrop-blur-xl
              sm:left-7
              sm:top-7
            "
          >
            {project.category}
          </div>


          {/* PROJECT NUMBER */}

          <div
            className="
              absolute
              right-5
              top-5
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.15]
              bg-black/25
              text-xs
              font-bold
              text-white/80
              backdrop-blur-xl
              sm:right-7
              sm:top-7
            "
          >
            0{project.id}
          </div>


          {/* BOTTOM CONTENT */}

          <div
            className="
              absolute
              bottom-6
              left-5
              right-5
              flex
              items-end
              justify-between
              gap-5

              sm:bottom-8
              sm:left-8
              sm:right-8
            "
          >

            <div>

              <p
                className="
                  mb-2
                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.25em]
                  text-white/40
                "
              >
                Selected Project
              </p>

              <h3
                className="
                  text-3xl
                  font-black
                  tracking-[-0.04em]
                  text-white

                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {project.title}
              </h3>

            </div>


            {/* FLIP INDICATOR */}

            <motion.div
              whileHover={{
                scale: 1.08,
              }}
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-white/10
                backdrop-blur-xl
              "
            >

              <RotateCcw
                size={18}
                className="text-white/80"
              />

            </motion.div>

          </div>


          {/* SHINE */}

          <motion.div
            initial={{
              x: "-120%",
            }}
            whileHover={{
              x: "120%",
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              w-1/3
              skew-x-[-15deg]
              bg-gradient-to-r
              from-transparent
              via-white/[0.12]
              to-transparent
            "
          />

        </div>


        {/* =================================================
            BACK
        ================================================== */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.12]
            bg-black/30
            p-6
            shadow-[0_30px_100px_rgba(0,0,0,0.45)]
            backdrop-blur-2xl
            [backface-visibility:hidden]
            [transform:rotateY(180deg)]

            sm:p-10
            lg:p-14
          "
        >

          {/* BACKGROUND GLOW */}

          <div
            className="
              pointer-events-none
              absolute
              -right-32
              -top-32
              h-72
              w-72
              rounded-full
              bg-cyan-400/[0.08]
              blur-[100px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-40
              -left-32
              h-72
              w-72
              rounded-full
              bg-violet-400/[0.07]
              blur-[110px]
            "
          />


          {/* BACK HEADER */}

          <div
            className="
              relative
              z-10
              flex
              items-start
              justify-between
              gap-5
            "
          >

            <div>

              <p
                className="
                  mb-3
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-white/30
                "
              >
                About the project
              </p>

              <h3
                className="
                  text-3xl
                  font-black
                  tracking-[-0.04em]
                  text-white

                  sm:text-5xl
                "
              >
                {project.title}
              </h3>

            </div>


            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.12]
                bg-white/[0.05]
              "
            >
              <span className="text-xs text-white/50">
                0{project.id}
              </span>
            </div>

          </div>


          {/* DESCRIPTION */}

          <div
            className="
              relative
              z-10
              mt-8
              max-w-3xl
            "
          >

            <p
              className="
                text-sm
                text-left
                leading-7
                text-white/55

                sm:text-base
                sm:leading-8
              "
            >
              {project.description}
            </p>

          </div>


          {/* SKILLS */}

          <div
            className="
              relative
              z-10
              mt-8
            "
          >

            <p
              className="
                mb-3
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-white/30
              "
            >
              Technologies used
            </p>


            <div
              className="
                flex
                flex-wrap
                gap-2
              "
            >

              {project.skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-full
                      border
                      border-white/[0.10]
                      bg-white/[0.045]
                      px-3
                      py-1.5
                      text-[10px]
                      font-medium
                      text-white/60
                      backdrop-blur-xl
                    "
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>


          {/* ACTIONS */}

          <div
            className="
              relative
              z-10
              mt-8
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {project.cid ? (
              <>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) =>
                      event.stopPropagation()
                    }
                    className="
                      group
                      flex
                      items-center
                      gap-2.5
                      rounded-full
                      border
                      border-white/[0.12]
                      bg-white/[0.06]
                      px-5
                      py-3
                      text-xs
                      font-semibold
                      text-white/70
                      backdrop-blur-xl
                      transition-all
                      duration-300

                      hover:-translate-y-1
                      hover:border-white/25
                      hover:bg-white/[0.10]
                      hover:text-white
                    "
                  >
                    <img
                      src={assets.github}
                      alt="GitHub"
                      className="
                        h-5
                        w-5
                        object-contain
                        opacity-80
                        transition-all
                        duration-300
                        group-hover:opacity-100
                        group-hover:scale-110
                      "
                    />

                    GitHub

                    <ArrowUpRight
                      size={14}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </a>
                )}

                <div
                  className="
                    inline-flex
                    max-w-full
                    items-center
                    rounded-full
                    border
                    border-white/[0.12]
                    bg-white/[0.06]
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    text-white/70
                    backdrop-blur-xl
                  "
                >
                  {project.cid}
                </div>
              </>
            ) : project.status === "In Progress" ? (
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) =>
                  event.stopPropagation()
                }
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  rounded-full
                  border
                  border-white/[0.12]
                  bg-white/[0.06]
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  text-white/70
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-white/25
                  hover:bg-white/[0.10]
                  hover:text-white
                "
              >
                🟡 In Progress

                <ArrowUpRight
                  size={14}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>
            ) : (
              <>
                <a
                  href={
                    project.github ||
                    "https://github.com/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-2.5
                    rounded-full
                    border
                    border-white/[0.12]
                    bg-white/[0.06]
                    px-5
                    py-3
                    text-xs
                    font-semibold
                    text-white/70
                    backdrop-blur-xl
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-white/25
                    hover:bg-white/[0.10]
                    hover:text-white
                  "
                >
                  <img
                    src={assets.github}
                    alt="GitHub"
                    className="
                      h-5
                      w-5
                      object-contain
                      opacity-80
                      transition-all
                      duration-300
                      group-hover:opacity-100
                      group-hover:scale-110
                    "
                  />

                  GitHub

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </a>

                <a
                  href={
                    project.link ||
                    "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    border
                    border-white/[0.18]
                    rounded-full
                    bg-white/[0.10]
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-white
                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:border-white/30
                    hover:bg-white/[0.18]
                    hover:shadow-[0_15px_40px_rgba(255,255,255,0.15)]
                  "
                >
                  View Project

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                  />
                </a>
              </>
            )}
          </div>

          {/* FLIP BACK HINT */}

          <div
            className="
              absolute
              bottom-6
              right-7
              flex
              items-center
              gap-2
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-white/20
            "
          >

            <RotateCcw size={11} />

            Click to flip back

          </div>

        </div>

      </motion.div>

    </div>
  );
};


// ============================================================
// MAIN PROJECTS SECTION
// ============================================================

export default function Projects() {

  const isMobile = useIsMobile();

  const sceneRef = useRef(null);


  // ==========================================================
  // PROJECT LIST
  // ==========================================================

  const projects = useMemo(
    () => projectData,
    []
  );


  // ==========================================================
  // SCROLL PROGRESS
  // ==========================================================

  const {
    scrollYProgress,
  } = useScroll({
    target: sceneRef,
    offset: [
      "start start",
      "end end",
    ],
  });


  // ==========================================================
  // ACTIVE PROJECT
  // ==========================================================

  const thresholds = useMemo(
    () =>
      projects.map(
        (_, index) =>
          (index + 1) /
          projects.length
      ),
    [projects]
  );


  const [activeIndex, setActiveIndex] =
    useState(0);


  useMotionValueEvent(
    scrollYProgress,
    "change",
    (value) => {

      const index =
        thresholds.findIndex(
          (threshold) =>
            value <= threshold
        );

      setActiveIndex(
        index === -1
          ? thresholds.length - 1
          : index
      );

    }
  );


  const activeProject =
    projects[activeIndex] ||
    projects[0];


  // ==========================================================
  // PROJECT BUTTON CLICK
  // ==========================================================

  const handleProjectSelect = (
    index
  ) => {

    const section =
      sceneRef.current;

    if (!section) return;


    const sectionTop =
      section.offsetTop;

    const sectionHeight =
      section.offsetHeight;

    const viewportHeight =
      window.innerHeight;


    const progress =
      index /
      projects.length;


    const target =
      sectionTop +
      progress *
      (sectionHeight -
        viewportHeight);


    window.scrollTo({
      top: target,
      behavior: "smooth",
    });

  };


  return (
    <section
      id="projects"
      ref={sceneRef}
      className="
        relative
        text-white
      "
      style={{
        height:
          `${100 * projects.length}vh`,

        backgroundColor:
          activeProject.bgColor,

        transition:
          "background-color 700ms ease",
      }}
    >

      {/* ====================================================
          STICKY VIEWPORT
      ==================================================== */}

      <div
        className="
          sticky
          top-0
          flex
          h-screen
          flex-col
          items-center
          justify-between
          overflow-hidden
          py-4

          sm:py-6
        "
      >

        {/* ==================================================
            BACKGROUND LIGHT
        ================================================== */}

        <motion.div
          animate={{
            opacity: [
              0.3,
              0.5,
              0.3,
            ],
            scale: [
              1,
              1.15,
              1,
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-[500px]
            w-[500px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-white/[0.025]
            blur-[120px]
          "
        />


        {/* ==================================================
            HEADER
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            relative
            z-30
            flex
            flex-col
            items-center
            pb-2
          "
        >

          <p
            className="
              mb-2
              text-[9px]
              font-bold
              uppercase
              tracking-[0.35em]
              text-white/35
            "
          >
            Selected Work
          </p>


          <h2
            className="
              text-4xl
              font-black
              tracking-[-0.05em]
              text-white

              sm:text-5xl
              lg:text-6xl
            "
          >
            My Projects
          </h2>


          <div
            className="
              mt-3
              h-[2px]
              w-16
              rounded-full
              bg-gradient-to-r
              from-cyan-300
              to-violet-500
            "
          />

        </motion.div>


        {/* ==================================================
            PROJECT SHOWCASE
        ================================================== */}

        <div
          className="
            relative
            flex
            w-full
            flex-1
            items-center
            justify-center
          "
        >

          {projects.map(
            (project, index) => (

              <div
                key={project.id}
                className={`
                  absolute
                  left-1/2
                  top-1/2
                  w-full
                  -translate-x-1/2
                  -translate-y-1/2
                  transition-all
                  duration-700
                  ${activeIndex === index
                    ? "z-20 opacity-100"
                    : "pointer-events-none z-0 opacity-0"
                  }
                `}
              >

                <AnimatePresence
                  mode="wait"
                >

                  {activeIndex ===
                    index && (

                      <motion.div
                        key={
                          project.id
                        }
                        initial={{
                          opacity: 0,
                          y: 35,
                          scale: 0.97,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -35,
                          scale: 0.97,
                        }}
                        transition={{
                          duration: 0.65,
                          ease: [
                            0.16,
                            1,
                            0.3,
                            1,
                          ],
                        }}
                      >

                        {/* PROJECT TITLE */}

                        <motion.h3
                          initial={{
                            opacity: 0,
                            y: -25,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.5,
                            delay: 0.1,
                          }}
                          className="
                          mb-4
                          text-center
                          text-3xl
                          font-black
                          italic
                          tracking-[-0.04em]
                          text-white

                          sm:absolute
                          sm:-top-16
                          sm:left-[7.5%]
                          sm:mb-0
                          sm:text-left
                          sm:text-5xl

                          lg:text-6xl
                        "
                        >
                          {project.title}
                        </motion.h3>


                        {/* CARD */}

                        <ProjectCard
                          project={project}
                          isMobile={
                            isMobile
                          }
                        />

                      </motion.div>

                    )}

                </AnimatePresence>

              </div>

            )
          )}

        </div>


        {/* ==================================================
            PROJECT NUMBERS
        ================================================== */}

        <div
          className="
            relative
            z-40
            mb-2
            flex
            items-center
            gap-2
          "
        >

          {projects.map(
            (project, index) => (

              <button
                key={project.id}
                type="button"
                onClick={() =>
                  handleProjectSelect(
                    index
                  )
                }
                aria-label={`Show ${project.title}`}
                className="
                  group
                  relative
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  text-[10px]
                  font-bold
                  transition-all
                  duration-300

                  sm:h-10
                  sm:w-10
                "
                style={{
                  borderColor:
                    activeIndex ===
                      index
                      ? "rgba(255,255,255,.45)"
                      : "rgba(255,255,255,.10)",

                  background:
                    activeIndex ===
                      index
                      ? "rgba(255,255,255,.14)"
                      : "rgba(255,255,255,.03)",

                  color:
                    activeIndex ===
                      index
                      ? "#ffffff"
                      : "rgba(255,255,255,.35)",

                  boxShadow:
                    activeIndex ===
                      index
                      ? "0 0 25px rgba(255,255,255,.08)"
                      : "none",
                }}
              >

                {project.id}

              </button>

            )
          )}

        </div>


        {/* ==================================================
            VIEW PROJECT
        ================================================== */}

        <div
          className="
            relative
            z-40
            mt-2
            flex
            items-center
            gap-3
          "
        >
          {activeProject?.cid ? (
            <div
              className="
                inline-flex
                max-w-full
                items-center
                rounded-full
                border
                border-white/[0.12]
                bg-white/[0.06]
                px-6
                py-2.5
                text-xs
                font-bold
                text-white/70
                shadow-lg
              "
            >
              {activeProject.cid}
            </div>
          ) : activeProject?.status === "In Progress" ? (
            <div
              className="
                inline-flex
                items-center
                gap-2
                border
                border-white/[0.12]
                rounded-full
                bg-white/[0.04]
                px-6
                py-2.5
                text-xs
                font-bold
                text-white/60
                shadow-lg
                opacity-80
                cursor-not-allowed
              "
            >
              In Progress

              <span className="text-base leading-none">●</span>
            </div>
          ) : (
            <a
              href={
                activeProject?.link ||
                "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-2
                border
                border-white/[0.18]
                rounded-full
                bg-white/[0.10]
                px-6
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-lg
                transition-all
                duration-300

                hover:-translate-y-1
                hover:border-white/30
                hover:bg-white/[0.18]
                hover:shadow-[0_15px_40px_rgba(255,255,255,.15)]
              "
            >
              View Project

              <ArrowUpRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />
            </a>
          )}
        </div>


        {/* ==================================================
            SCROLL HINT
        ================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            bottom-2
            left-1/2
            hidden
            -translate-x-1/2
            text-[8px]
            uppercase
            tracking-[0.3em]
            text-white/20

            lg:block
          "
        >
          Scroll to explore
        </div>

      </div>

    </section>
  );
}