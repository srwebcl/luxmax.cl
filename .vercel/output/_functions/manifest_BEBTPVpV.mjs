import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_CZTop7a8.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Dp1DKT7W.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/","cacheDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/node_modules/.astro/","outDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/dist/","srcDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/","publicDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/public/","buildClientDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/dist/client/","buildServerDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/luxmax/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"gracias/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/gracias","isIndex":false,"type":"page","pattern":"^\\/gracias\\/?$","segments":[[{"content":"gracias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/gracias.astro","pathname":"/gracias","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send.ts","pathname":"/api/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/pages/gracias.astro",{"propagation":"none","containsHead":true}],["/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/send@_@ts":"pages/api/send.astro.mjs","\u0000@astro-page:src/pages/gracias@_@astro":"pages/gracias.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BEBTPVpV.mjs","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Dc1lV4K8.mjs","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/pages/gracias.astro?astro&type=script&index=0&lang.ts":"_astro/gracias.astro_astro_type_script_index_0_lang.BuTEz1XJ.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.NsFk2Zi8.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/Hero.astro?astro&type=script&index=0&lang.ts":"_astro/Hero.astro_astro_type_script_index_0_lang.CBUKuBlG.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/Brands.astro?astro&type=script&index=0&lang.ts":"_astro/Brands.astro_astro_type_script_index_0_lang.Bj3uoNm9.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/Services.astro?astro&type=script&index=0&lang.ts":"_astro/Services.astro_astro_type_script_index_0_lang.BupGAGZt.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/ValueProposition.astro?astro&type=script&index=0&lang.ts":"_astro/ValueProposition.astro_astro_type_script_index_0_lang.CwuYS9Nb.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/ContactForm.astro?astro&type=script&index=0&lang.ts":"_astro/ContactForm.astro_astro_type_script_index_0_lang.B_Yv7YU9.js","/Users/sebastianrodriguezmilla/proyectos-web/luxmax/src/components/WhatsAppWidget.astro?astro&type=script&index=0&lang.ts":"_astro/WhatsAppWidget.astro_astro_type_script_index_0_lang.CzM0XKOE.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/gracias.B25eBT_M.css","/favicon.svg","/logo.svg","/_astro/Brands.astro_astro_type_script_index_0_lang.Bj3uoNm9.js","/_astro/ContactForm.astro_astro_type_script_index_0_lang.B_Yv7YU9.js","/_astro/Header.astro_astro_type_script_index_0_lang.NsFk2Zi8.js","/_astro/Hero.astro_astro_type_script_index_0_lang.CBUKuBlG.js","/_astro/ScrollTrigger.Cv03IO65.js","/_astro/Services.astro_astro_type_script_index_0_lang.BupGAGZt.js","/_astro/ValueProposition.astro_astro_type_script_index_0_lang.CwuYS9Nb.js","/_astro/WhatsAppWidget.astro_astro_type_script_index_0_lang.CzM0XKOE.js","/_astro/gracias.astro_astro_type_script_index_0_lang.BuTEz1XJ.js","/_astro/index.CB87Sc6I.js","/images/hero-1.jpeg","/images/hero-2.jpeg","/images/hero-3.jpeg","/images/hero-4.jpeg","/images/hero-5.jpeg","/images/hero-6.jpeg","/images/hero-section-1.jpeg","/images/hero-section-2.jpeg","/images/mademsa.webp","/images/samsung.webp","/images/whirpool.webp","/gracias/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"EXwCjwgO3yQDfUpv4btpa5XiB7iNt9N9tFhRzKz3lko="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
