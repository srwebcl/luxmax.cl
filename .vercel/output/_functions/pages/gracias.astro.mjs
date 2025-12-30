import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CZTop7a8.mjs';
import 'piccolore';
import { $ as $$Layout, a as $$Header, b as $$Footer } from '../chunks/Footer_BCPHR8iC.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Gracias = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "\xA1Gracias por contactarnos! | Lux Mar", "data-astro-cid-27lbuprk": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, { "data-astro-cid-27lbuprk": true })} ${maybeRenderHead()}<main class="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 pt-20" data-astro-cid-27lbuprk> <!-- Background Effects --> <div class="absolute inset-0 z-0" data-astro-cid-27lbuprk> <div class="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-900/20 to-slate-900 z-10" data-astro-cid-27lbuprk></div> <!-- Animated blobs --> <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow" data-astro-cid-27lbuprk></div> <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse-slow" style="animation-delay: 2s;" data-astro-cid-27lbuprk></div> </div> <div class="container mx-auto px-4 relative z-20 text-center" data-astro-cid-27lbuprk> <div class="max-w-2xl mx-auto success-content opacity-0 translate-y-10" data-astro-cid-27lbuprk> <!-- Animated Icon --> <div class="w-32 h-32 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.4)] relative group" data-astro-cid-27lbuprk> <div class="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-75" data-astro-cid-27lbuprk></div> <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-white check-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-27lbuprk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" data-astro-cid-27lbuprk></path> </svg> </div> <h1 class="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight" data-astro-cid-27lbuprk>
¡Mensaje <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300" data-astro-cid-27lbuprk>Enviado!</span> </h1> <p class="text-xl text-slate-300 mb-12 leading-relaxed" data-astro-cid-27lbuprk>
Hemos recibido tu solicitud correctamente. <br data-astro-cid-27lbuprk>
Un técnico experto de <span class="text-white font-bold" data-astro-cid-27lbuprk>Lux Max</span> te contactará en los próximos minutos para confirmar tu visita.
</p> <a href="/" class="inline-flex items-center gap-3 bg-white text-slate-900 font-bold py-4 px-8 rounded-xl shadow-xl hover:scale-105 hover:bg-blue-50 transition-all duration-300 group" data-astro-cid-27lbuprk> <span data-astro-cid-27lbuprk>🏠</span>
Volver al Inicio
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-astro-cid-27lbuprk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" data-astro-cid-27lbuprk></path> </svg> </a> </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, { "data-astro-cid-27lbuprk": true })} ` })}  ${renderScript($$result, "/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/pages/gracias.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/pages/gracias.astro", void 0);

const $$file = "/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/pages/gracias.astro";
const $$url = "/gracias";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Gracias,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
