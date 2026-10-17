import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());


// ============================================================
// EMAIL TRANSPORTER
// ============================================================

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});


// ============================================================
// VERIFY EMAIL CONNECTION
// ============================================================

transporter.verify((error) => {
  if (error) {
    console.error(
      "Email transporter error:",
      error
    );
  } else {
    console.log("Email server is ready.");
  }
});


// ============================================================
// CONTACT API
// ============================================================

app.post("/api/contact", async (req, res) => {

  try {

    const {
      name,
      email,
      subject,
      message,
    } = req.body;


    // ========================================================
    // VALIDATION
    // ========================================================

    if (
      !name ||
      !email ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        message:
          "Please provide all required fields.",
      });
    }


    // Basic email validation

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message:
          "Please provide a valid email address.",
      });
    }


    // ========================================================
    // EMAIL TO YOU
    // ========================================================

    await transporter.sendMail({

      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,

      to: "radhikashashi24@gmail.com",

      replyTo: email,

      subject: `Portfolio Contact: ${subject}`,

      text: `
New message from your portfolio.

Name:
${name}

Email:
${email}

Subject:
${subject}

Message:
${message}
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 700px;
            margin: auto;
            padding: 30px;
            background: #0b1220;
            color: #ffffff;
            border-radius: 16px;
          "
        >

          <h2
            style="
              margin-bottom: 25px;
              color: #67e8f9;
            "
          >
            New Portfolio Message
          </h2>


          <div
            style="
              padding: 20px;
              background: #111827;
              border-radius: 12px;
            "
          >

            <p>
              <strong>Name:</strong>
              ${escapeHtml(name)}
            </p>

            <p>
              <strong>Email:</strong>
              ${escapeHtml(email)}
            </p>

            <p>
              <strong>Subject:</strong>
              ${escapeHtml(subject)}
            </p>

            <hr
              style="
                border: none;
                border-top: 1px solid #374151;
                margin: 20px 0;
              "
            />

            <p>
              <strong>Message:</strong>
            </p>

            <p
              style="
                line-height: 1.7;
                color: #d1d5db;
                white-space: pre-line;
              "
            >
              ${escapeHtml(message)}
            </p>

          </div>


          <p
            style="
              margin-top: 25px;
              font-size: 12px;
              color: #6b7280;
            "
          >
            Sent from your portfolio contact form.
          </p>

        </div>
      `,
    });


    // ========================================================
    // SUCCESS
    // ========================================================

    return res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully.",
    });

  } catch (error) {

    console.error(
      "Contact form error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to send the message right now.",
    });

  }

});


// ============================================================
// HTML ESCAPE
// ============================================================

function escapeHtml(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/", (req, res) => {

  res.json({
    message: "Portfolio API is running.",
  });

});


// ============================================================
// SERVER
// ============================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});