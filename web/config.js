// ============================================================
// Vibecoding · config.js
// ------------------------------------------------------------
// ESTE ES EL ARCHIVO MÁS IMPORTANTE DEL BOILERPLATE.
// Todo el branding, copy, features y configuración del producto vive aquí.
// Cambiar este archivo cambia el producto entero — sin abrir JSX.
//
// Estructura:
//   - app:      identidad del producto (nombre, descripción, dominio, color)
//   - features: toggles para encender/apagar funcionalidades
//   - ai:       configuración de OpenAI
//   - email:    configuración de Resend
//   - auth:     providers habilitados
//   - landing:  copy de la página pública
//   - pricing:  planes (si features.pricing está activo; el cobro real es features.paypal)
//
// Tip Sem 1: empieza editando `app` y `landing.hero` con los datos de tu producto.
// ============================================================

const config = {
  // -----------------------------------------------------------
  // Identidad del producto
  // -----------------------------------------------------------
  app: {
    name: "IVCA Crafts",
    description:
      "Termos, fundas y llaveros personalizados, pintados a mano para regalos únicos con valor emocional.",
    domain: "ivcacrafts.com", // sin https://, sin www
    locale: "es", // "es" | "en"
    // URL pública: usa NEXT_PUBLIC_APP_URL en .env. En este config solo definimos el default.
    defaultUrl: "http://localhost:3000",
  },

  // -----------------------------------------------------------
  // Identidad visual
  // -----------------------------------------------------------
  brand: {
    // Color primario en HEX. DaisyUI lo aplica como --color-primary via theme.
    // Rosa magenta del logo acuarela: cálido, artesanal y distinto al violeta genérico.
    primary: "#C94A8A",
    // Logo: puede ser texto o ruta a /public/logo.svg
    logoText: "IVCA Crafts",
    logoSrc: null,
    // Estilo del bordeado global (DaisyUI usa esto para botones, cards)
    radius: "1rem",
  },

  // -----------------------------------------------------------
  // Toggles de features — encienden/apagan rutas y componentes
  // -----------------------------------------------------------
  features: {
    waitlist: true, // Captura emails en landing — Sem 1
    googleAuth: true, // Login con Google — Sem 2
    emailLogin: false, // Magic link email — opcional
    aiChat: true, // Chat AI en /chat — Sem 3
    toolUse: true, // Tool use registry — Sem 4
    agents: true, // LangGraph agents — Sem 5 (opcional-avanzado)
    resend: true, // Email — Sem 1+
    pricing: true, // Muestra la sección de precios en la landing (vitrina; el cobro real es `paypal`)
    paypal: false, // Botón PayPal.me en Pricing (configura `payment` abajo)
    adminPanel: true, // Panel /admin de leads (waitlist) — requiere ADMIN_PASSWORD en .env.local
  },

  // -----------------------------------------------------------
  // PayPal.me (si features.paypal está activo)
  // -----------------------------------------------------------
  payment: {
    paypalMeUsername: "", // tu usuario de https://paypal.me (sin @ ni URL)
    defaultAmount: 0, // 0 = el comprador elige el monto
    currency: "USD",
    buttonText: "Pagar con PayPal",
  },

  // -----------------------------------------------------------
  // OpenAI
  // -----------------------------------------------------------
  ai: {
    chatModel: "gpt-4o-mini", // default barato y rápido
    structuredModel: "gpt-4o-mini",
    agentModel: "gpt-4o", // los agentes razonan mejor con full gpt-4o
    maxTokens: 1500,
    temperature: 0.4,
  },

  // -----------------------------------------------------------
  // Resend (email transaccional)
  // -----------------------------------------------------------
  email: {
    // Asegúrate de tener el dominio verificado en Resend antes de cambiar `from`.
    // En desarrollo Resend permite enviar a tu propio correo desde `onboarding@resend.dev`.
    from: "Vibecoding <onboarding@resend.dev>",
    replyTo: "hola@vibecoding.dev",
    supportEmail: "soporte@vibecoding.dev",
  },

  // -----------------------------------------------------------
  // Auth providers
  // -----------------------------------------------------------
  auth: {
    loginUrl: "/login",
    afterLoginUrl: "/dashboard",
    afterLogoutUrl: "/",
    providers: ["google"], // se sincroniza con features.googleAuth / emailLogin
  },

  // -----------------------------------------------------------
  // Landing — todo el copy de la página pública
  // -----------------------------------------------------------
  landing: {
    nav: [
      { label: "Características", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "Preguntas", href: "#faq" },
      { label: "Docs", href: "/docs" },
    ],
    hero: {
      eyebrow: "Hecho a mano · Pieza única",
      title: "Regalos personalizados que se sienten de verdad.",
      subtitle:
        "Termos, fundas y llaveros pintados a mano para quienes buscan algo original, exclusivo y con historia.",
      cta: { label: "Pide tu pieza", href: "#waitlist" },
      ctaSecondary: { label: "Ver productos", href: "#features" },
    },
    clients: {
      title: "Creado para quienes buscan algo único",
      logo: {
        src: "/logo-ivca.png",
        alt: "IVCA Crafts",
      },
      placeholderCount: 3,
    },
    problem: {
      eyebrow: "El problema",
      title: "Cuesta encontrar un regalo que se sienta realmente único.",
      subtitle:
        "La mayoría de las tiendas venden lo mismo en serie: bonito, sí, pero sin historia ni valor emocional.",
      items: [
        {
          icon: "SearchX",
          title: "Todo se ve igual",
          body: "Buscas algo original y encuentras los mismos productos fabricados en masa, sin personalidad.",
        },
        {
          icon: "HeartOff",
          title: "Sin valor emocional",
          body: "Un detalle genérico se olvida; quieres un regalo que hable de la persona, no de un catálogo.",
        },
        {
          icon: "Copy",
          title: "Nada es exclusivo",
          body: "Si mil personas pueden comprar lo mismo, deja de sentirse especial el día que lo entregas.",
        },
      ],
    },
    features: {
      eyebrow: "Piezas a mano",
      title: "Tres formas de regalar algo irrepetible.",
      subtitle: "Cada diseño se pinta pieza por pieza: original, exclusivo y con tu historia.",
      items: [
        {
          icon: "Smartphone",
          title: "Funda para celular",
          body: "Un diseño pintado a mano, hecho solo para ti, que no se parece a nada de fábrica.",
        },
        {
          icon: "Wine",
          title: "Termo Wine 12 oz",
          body: "Mantén tu bebida lista y luce un termo personalizado con arte en cada trazo.",
        },
        {
          icon: "KeyRound",
          title: "Llaveros de resina",
          body: "Un detalle único con formas, colores y acabados elaborados pieza por pieza.",
        },
      ],
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Lo que más preguntan antes de pedir.",
      items: [
        {
          q: "¿Qué colores manejas?",
          a: "Trabajamos una paleta amplia y mezclamos tonos a tu gusto; si traes foto de referencia, nos acercamos a ese color.",
        },
        {
          q: "¿Manejas otras medidas de termos?",
          a: "Sí. Además del Wine 12 oz cotizamos otras capacidades y modelos según disponibilidad.",
        },
        {
          q: "¿Cuál es el tiempo de entrega?",
          a: "Como cada pieza se pinta a mano, el tiempo habitual es de 5 a 10 días hábiles; al confirmar te damos la fecha exacta.",
        },
        {
          q: "¿Cómo hago pedido?",
          a: "Escríbenos por WhatsApp o deja tus datos en esta página con producto, diseño y cantidad; te enviamos cotización y arrancamos al aprobar.",
        },
      ],
    },
    finalCta: {
      eyebrow: "Tu pieza",
      title: "Regala algo que no se encuentra en serie.",
      subtitle:
        "Cuéntanos a quién va dirigido y qué te imaginas: lo pintamos a mano para que se sienta único.",
      cta: { label: "Pide tu pieza", href: "#waitlist" },
      ctaSecondary: { label: "Ver productos", href: "#features" },
    },
    waitlist: {
      eyebrow: "Haz tu pedido",
      title: "Cuéntanos qué pieza quieres.",
      subtitle: "Déjanos tu correo y te escribimos para armar tu diseño personalizado.",
      successMessage: "¡Listo! Te contactamos para cotizar tu pieza.",
      buttonLabel: "Quiero mi pieza",
      placeholder: "tu@email.com",
    },
    footer: {
      tagline:
        "IVCA Crafts · termos, fundas y llaveros pintados a mano, con amor.",
      columns: [
        {
          title: "Producto",
          links: [
            { label: "Características", href: "#features" },
            { label: "Precios", href: "#pricing" },
            { label: "Preguntas", href: "#faq" },
          ],
        },
        {
          title: "Recursos",
          links: [
            { label: "Docs", href: "/docs" },
            { label: "Quick start", href: "/docs/setup/quick-start" },
            { label: "Troubleshooting", href: "/docs/troubleshooting/errores-comunes" },
          ],
        },
        {
          title: "Comunidad",
          links: [
            { label: "GitHub", href: "https://github.com/RoniHY/Vibecoding", external: true },
            { label: "Change and Code", href: "https://changeandcode.com", external: true },
          ],
        },
      ],
      // Compat: links planos usados en el bar inferior
      links: [
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "https://github.com/RoniHY/Vibecoding", external: true },
      ],
    },
  },

  // -----------------------------------------------------------
  // Pricing — vitrina de planes.
  // Se muestra en la landing si features.pricing === true.
  // El cobro real (PayPal.me) depende de features.paypal.
  // -----------------------------------------------------------
  pricing: {
    eyebrow: "Precios",
    title: "Piezas a tu medida, sin sorpresas.",
    subtitle: "Elige un detalle o arma un set. Cada uno se pinta a mano.",
    plans: [
      {
        id: "starter",
        name: "Un detalle",
        price: 0,
        currency: "USD",
        interval: "pieza",
        description: "Para un regalo personalizado.",
        features: ["1 pieza pintada a mano", "Colores a tu gusto", "Cotización por mensaje"],
        cta: "Pedir un detalle",
      },
      {
        id: "pro",
        name: "Set especial",
        price: 0,
        currency: "USD",
        interval: "set",
        description: "Para un regalo más completo.",
        features: ["Termo, funda o llavero", "Diseño exclusivo", "Prioridad en entrega"],
        cta: "Armar mi set",
        highlighted: true,
      },
    ],
  },
}

export default config
