import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { nombre, email, mensaje, empresa } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // ⚠️ tu email, no el del usuario
      to: "gabriela.contreras@est.fi.uncoma.edu.ar",
      subject: `Nuevo mensaje de contacto de ${nombre}`,
      text: mensaje,
      html: `<p><b>Empresa:</b> ${empresa}</p>
             <p><b>Nombre:</b> ${nombre}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Mensaje:</b><br/>${mensaje}</p>`,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (error) {
    console.error("Error enviando email:", error);
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500,
    });
  }
}
