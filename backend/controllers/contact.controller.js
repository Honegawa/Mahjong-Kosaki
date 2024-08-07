import nodemailer from "nodemailer";
import { env } from "../configs/config.js";

const transport = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_FROM,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASSWORD,
  },
});

export const create = async (req, res) => {
  try {
    const { firstname, lastname, email, object, content } = req.body;

    sendMailNotif(firstname, lastname, email, object, content).catch(
      console.error
    );
    res.status(201).json({ message: "Message has been sent" });
  } catch (error) {
    res.status(500).json({ error: "Error in sending contact" });
  }
};

const sendMailNotif = async (firstname, lastname, email, object, content) => {
  const info = await transport.sendMail({
    from: `"${firstname} ${lastname}" <${email}>`,
    to: "asso.kosaki@gmail.com",
    subject: object,
    text: content,
  });
};