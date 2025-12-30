export const prerender = false; // Ensure this runs on the server

import type { APIRoute } from "astro";
import { Resend } from "resend";


export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.RESEND_API_KEY || process.env.RESEND_API_KEY;

  console.log(`[API/send] Received request. RESEND_API_KEY exists: ${!!apiKey}`);

  if (!apiKey) {
    console.error("[API/send] Error: RESEND_API_KEY is missing from environment variables.");
    return new Response(
      JSON.stringify({
        message: "Configuration Error: RESEND_API_KEY is missing",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const data = await request.json();
    const { name, phone, email, comuna, artefacto, problem, recaptchaToken } = data;

    console.log(`[API/send] Payload received: Name=${name}, Phone=${phone}, Email=${email}`);

    // Verify reCAPTCHA
    const recaptchaSecret = import.meta.env.RECAPTCHA_SECRET_KEY || process.env.RECAPTCHA_SECRET_KEY;
    console.log(`[API/send] Recaptcha Secret exists: ${!!recaptchaSecret}`);

    if (recaptchaSecret && recaptchaToken) {
      const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });

      const recaptchaData = await recaptchaResponse.json();
      console.log("[API/send] Recaptcha verification result:", recaptchaData);

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.warn(`[API/send] reCAPTCHA blocked: Score ${recaptchaData.score}`);
        return new Response(
          JSON.stringify({
            message: "Lo sentimos, detectamos tráfico inusual. Intenta más tarde.",
          }),
          { status: 403, headers: { "Content-Type": "application/json" } }
        );
      }
    } else if (!recaptchaSecret) {
      console.warn("[API/send] reCAPTCHA skipped: SECRET_KEY missing in environment variables.");
    }

    console.log("[API/send] Sending email to owner...");
    // 1. Email para el Negocio (Notificación de LEAD)
    const ownerEmail = await resend.emails.send({
      from: "Lux Max Web <contacto@luxmax.cl>",
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
      `,
    });

    if (ownerEmail.error) {
      console.error("[API/send] Error sending owner email:", ownerEmail.error);
      throw new Error(`Failed to send owner email: ${ownerEmail.error.message}`);
    }

    console.log("[API/send] Owner email sent successfully:", ownerEmail.data);

    console.log("[API/send] Sending confirmation email to client...");
    // 2. Email para el Cliente (Respuesta Automática)
    const clientEmail = await resend.emails.send({
      from: "Lux Max Servicio Técnico <contacto@luxmax.cl>",
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
      `,
    });

    if (clientEmail.error) {
      console.error("[API/send] Error sending client email:", clientEmail.error);
      // We don't throw here to avoid failing the whole request if just the client email fails, 
      // but you might want to log it deeply.
      console.warn("Client email failed but owner email succeeded.");
    } else {
      console.log("[API/send] Client email sent successfully:", clientEmail.data);
    }


    return new Response(
      JSON.stringify({
        message: "Emails sent successfully",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("[API/send] CRITICAL ERROR:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
        stack: error.stack // Optional: remove in production if preferred
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
