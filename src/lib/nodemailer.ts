import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const sendEmail = async (subscriber: string, schedule: string) => {
  const today = new Date();
  const monthName = today.toLocaleString("default", { month: "long" });
  const year = today.getFullYear();

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: subscriber,
      subject: `Your Monthly Menu for ${monthName} ${year}`,
      text: schedule,
    });
  } catch (err) {
    console.log("There was an error sending email", err);
  }
};
