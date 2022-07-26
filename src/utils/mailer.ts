import nodemailer from "nodemailer";
// can user nodemailer with sendgrid smtp credentials

export async function sendLoginEmail({
  email,
  url,
  token,
}: {
  email: string;
  url: string;
  token: string;
}) {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  const info = await transporter.sendMail({
    from: '"Carlton Joseph" <c.j@example.com>',
    to: email,
    subject: "Login to you account",
    html: `Login by clicking <a href="${url}/login#token=${token}">here</a>`,
  });

  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
}
