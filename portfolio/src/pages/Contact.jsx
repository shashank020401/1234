import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";




const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};


// ============================================================
// MAIN COMPONENT
// ============================================================

export default function Contact() {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [sending, setSending] = useState(false);


  // ==========================================================
  // INPUT CHANGE
  // ==========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous status when visitor starts typing again
    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };


  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (sending) return;

    // Basic frontend validation
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.subject.trim() ||
      !form.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "Please fill in all the fields.",
      });

      return;
    }


    setSending(true);

    setStatus({
      type: "",
      message: "",
    });

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    try {
      const response = await fetch(
        (`${apiUrl}/api/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong."
        );
      }


      // SUCCESS

      setStatus({
        type: "success",
        message:
          "Message sent successfully! I'll get back to you soon.",
      });


      // Reset form

      setForm(initialForm);

    } catch (error) {

      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message:
          error.message ||
          "Unable to send your message. Please try again.",
      });

    } finally {

      setSending(false);

    }
  };


  return (
    <section
      id="contact"
      className="
        relative
        min-h-screen
        overflow-hidden
        px-5
        pt-12
        pb-28

        sm:px-8
        sm:pt-16
        sm:pb-32

        lg:px-12
        lg:pt-20
        lg:pb-40
      "
    >

      {/* ======================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-400/[0.035]
          blur-[150px]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-10
          h-[600px]
          w-[600px]
          rounded-full
          bg-violet-500/[0.035]
          blur-[170px]
        "
      />


      {/* ======================================================
          GRID BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.035]
          [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />


      {/* ======================================================
          MAIN
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

            <Mail
              size={15}
              className="text-cyan-300"
            />

            Get In Touch

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
            Let's Talk.
          </h2>


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
              max-w-2xl
              text-center
              text-sm
              leading-7
              text-white/35
            "
          >
            Have a project idea, internship opportunity,
            collaboration or just want to say hello?
            Drop me a message.
          </p>

        </motion.div>


        {/* ====================================================
            CONTACT GRID
        ==================================================== */}

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-6

            lg:grid-cols-[0.8fr_1.2fr]
          "
        >

          {/* ==================================================
              LEFT INFO
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
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
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-7
              backdrop-blur-2xl

              lg:p-9
            "
          >

            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-72
                w-72
                rounded-full
                bg-cyan-400/[0.045]
                blur-[100px]
              "
            />


            {/* Icon */}

            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: 5,
              }}
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-white/[0.10]
                bg-white/[0.045]
                text-cyan-200
                shadow-lg
              "
            >

              <Mail size={27} />

            </motion.div>


            <h3
              className="
                relative
                z-10
                mt-8
                text-3xl
                font-black
                tracking-[-0.04em]
                text-white
              "
            >
              Have something
              <br />
              <span className="text-white/35">
                in mind?
              </span>
            </h3>


            <p
              className="
                relative
                z-10
                mt-5
                max-w-md
                text-sm
                leading-7
                text-white/35
              "
            >
              I'm always interested in hearing about
              interesting projects, collaborations,
              opportunities and ideas.
            </p>


            {/* ==================================================
                EMAIL
            ================================================== */}

            <a
              href="mailto:radhikashashi24@gmail.com"
              className="
                group
                relative
                z-10
                mt-8
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-4
                transition-all
                duration-300

                hover:border-cyan-300/20
                hover:bg-white/[0.05]
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-300/[0.06]
                    text-cyan-300
                  "
                >
                  <Mail size={17} />
                </div>


                <div>

                  <p
                    className="
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/20
                    "
                  >
                    Email
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      text-white/55
                    "
                  >
                    radhikashashi24@gmail.com
                  </p>

                </div>

              </div>


              <ArrowUpRight
                size={16}
                className="
                  text-white/20
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                  group-hover:-translate-y-1
                "
              />

            </a>


            {/* ==================================================
                STATUS
            ================================================== */}

            <div
              className="
                relative
                z-10
                mt-7
                flex
                items-center
                gap-3
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-white/25
              "
            >

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                  shadow-[0_0_12px_rgba(52,211,153,.8)]
                "
              />

              Available for opportunities

            </div>

          </motion.div>


          {/* ==================================================
              CONTACT FORM
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
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
              overflow-hidden
              rounded-[30px]
              border
              border-white/[0.08]
              bg-white/[0.035]
              p-6
              backdrop-blur-2xl

              sm:p-8
              lg:p-9
            "
          >

            {/* Form top glow */}

            <div
              className="
                pointer-events-none
                absolute
                -left-20
                -top-20
                h-56
                w-56
                rounded-full
                bg-violet-500/[0.04]
                blur-[90px]
              "
            />


            <div
              className="
                relative
                z-10
                mb-8
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.3em]
                    text-cyan-300/60
                  "
                >
                  Send a message
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    font-black
                    tracking-[-0.04em]
                    text-white
                  "
                >
                  Tell me about it.
                </h3>

              </div>


              <Sparkles
                size={22}
                className="text-white/20"
              />

            </div>


            {/* ==================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="
                relative
                z-10
                space-y-5
              "
            >

              {/* NAME + EMAIL */}

              <div
                className="
                  grid
                  grid-cols-1
                  gap-5

                  sm:grid-cols-2
                "
              >

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="
                      mb-2
                      block
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/25
                    "
                  >
                    Your Name
                  </label>


                  <div className="relative">

                    <User
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-white/20
                      "
                    />


                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      autoComplete="name"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        py-4
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        duration-300

                        placeholder:text-white/15

                        focus:border-cyan-300/30
                        focus:bg-white/[0.045]
                        focus:ring-2
                        focus:ring-cyan-300/[0.05]
                      "
                      required
                    />

                  </div>

                </div>


                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="
                      mb-2
                      block
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/25
                    "
                  >
                    Email Address
                  </label>


                  <div className="relative">

                    <Mail
                      size={15}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-white/20
                      "
                    />


                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      autoComplete="email"
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/[0.08]
                        bg-white/[0.025]
                        py-4
                        pl-11
                        pr-4
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        duration-300

                        placeholder:text-white/15

                        focus:border-cyan-300/30
                        focus:bg-white/[0.045]
                        focus:ring-2
                        focus:ring-cyan-300/[0.05]
                      "
                      required
                    />

                  </div>

                </div>

              </div>


              {/* ==================================================
                  SUBJECT
              ================================================== */}

              <div>

                <label
                  htmlFor="subject"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  Subject
                </label>


                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Let's build something together"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    px-4
                    py-4
                    text-sm
                    text-white
                    outline-none
                    transition-all
                    duration-300

                    placeholder:text-white/15

                    focus:border-cyan-300/30
                    focus:bg-white/[0.045]
                    focus:ring-2
                    focus:ring-cyan-300/[0.05]
                  "
                  required
                />

              </div>


              {/* ==================================================
                  MESSAGE
              ================================================== */}

              <div>

                <label
                  htmlFor="message"
                  className="
                    mb-2
                    block
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.2em]
                    text-white/25
                  "
                >
                  Message
                </label>


                <div className="relative">

                  <MessageSquare
                    size={15}
                    className="
                      pointer-events-none
                      absolute
                      left-4
                      top-5
                      text-white/20
                    "
                  />


                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea or opportunity..."
                    rows={6}
                    className="
                      w-full
                      resize-none
                      rounded-2xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-11
                      py-4
                      text-sm
                      leading-7
                      text-white
                      outline-none
                      transition-all
                      duration-300

                      placeholder:text-white/15

                      focus:border-cyan-300/30
                      focus:bg-white/[0.045]
                      focus:ring-2
                      focus:ring-cyan-300/[0.05]
                    "
                    required
                  />

                </div>

              </div>


              {/* ==================================================
                  STATUS MESSAGE
              ================================================== */}

              <AnimatePresence>

                {status.message && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      height: 0,
                    }}
                    className={`
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-xs

                      ${
                        status.type === "success"
                          ? `
                            border-emerald-400/10
                            bg-emerald-400/[0.05]
                            text-emerald-300/70
                          `
                          : `
                            border-red-400/10
                            bg-red-400/[0.05]
                            text-red-300/70
                          `
                      }
                    `}
                  >

                    {status.type === "success" ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}

                    {status.message}

                  </motion.div>
                )}

              </AnimatePresence>


              {/* ==================================================
                  SEND BUTTON
              ================================================== */}

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={
                  !sending
                    ? {
                        scale: 1.015,
                      }
                    : {}
                }
                whileTap={
                  !sending
                    ? {
                        scale: 0.98,
                      }
                    : {}
                }
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-white
                  px-6
                  py-4
                  text-sm
                  font-bold
                  text-black
                  shadow-[0_15px_40px_rgba(255,255,255,0.08)]
                  transition-all
                  duration-300

                  hover:bg-cyan-100

                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >

                {sending ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-black/20
                        border-t-black
                      "
                    />

                    Sending...

                  </>
                ) : (
                  <>
                    Send Message

                    <Send
                      size={16}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                      "
                    />

                  </>
                )}

              </motion.button>

            </form>

          </motion.div>

        </div>

      </div>

    </section>
  );
}