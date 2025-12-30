import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const resend = new Resend(undefined                              );
const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, phone, email, comuna, artefacto, problem } = data;
    await resend.emails.send({
      from: "Lux Max Web <onboarding@resend.dev>",
      // Cambiar a tu dominio verificado si es posible, ej: web@luxmax.cl
      to: ["contacto@luxmax.cl"],
      cc: ["walterreyes1606@gmail.com"],
      subject: `🔥 Nuevo Lead: ${name} (${artefacto})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e3a8a;">Nuevo Cliente Potencial</h1>
          <p>Un usuario ha solicitado visita técnica desde la web.</p>
          
          <div style="background: #f1f5f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📞 Teléfono:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>✉️ Email:</strong> ${email}</p>
            <p><strong>📍 Comuna:</strong> ${comuna}</p>
            <p><strong>🔧 Artefacto:</strong> ${artefacto}</p>
            <p><strong>📝 Problema:</strong> ${problem}</p>
          </div>
          
          <p>Contactar lo antes posible para agendar.</p>
        </div>
      `
    });
    await resend.emails.send({
      from: "Lux Max Servicio Técnico <onboarding@resend.dev>",
      to: [email],
      subject: "✅ Hemos recibido tu solicitud - Lux Max",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; text-align: center;">
          <div style="background: #1e3a8a; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0;">¡Solicitud Recibida!</h1>
          </div>
          <div style="border: 1px solid #e2e8f0; border-top: none; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 18px; color: #334155;">Hola <strong>${name}</strong>,</p>
            <p style="color: #64748b; font-size: 16px;">Gracias por confiar en Lux Max. Ya tenemos tus datos y la descripción de tu problema con tu <strong>${artefacto}</strong>.</p>
            
            <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 15px; margin: 25px 0; text-align: left;">
              <p style="margin: 0; color: #065f46;"><strong>🕒 Próximo paso:</strong> Un técnico especialista te contactará en los próximos minutos al <strong>${phone}</strong> para coordinar la visita.</p>
            </div>

            <p style="font-size: 14px; color: #94a3b8;">Si es una urgencia, puedes llamarnos directamente.</p>
            
            <a href="tel:+56967140558" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 10px;">Llamar Ahora</a>
          </div>
        </div>
      `
    });
    return new Response(
      JSON.stringify({
        message: "Emails sent successfully"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        message: "Error sending email",
        error: error.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
