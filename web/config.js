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
    logoSrc: "/logo-ivca-mark.png",
    // Estilo del bordeado global (DaisyUI usa esto para botones, cards)
    radius: "1rem",
  },

  // -----------------------------------------------------------
  // Toggles de features — encienden/apagan rutas y componentes
  // -----------------------------------------------------------
  features: {
    waitlist: false,
    googleAuth: true,
    emailLogin: false,
    aiChat: false,
    toolUse: false,
    agents: false,
    resend: true,
    pricing: false,
    paypal: false,
    adminPanel: true,
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
    ownerEmail: "cilc6415@gmail.com",
    providers: ["google"],
  },

  // -----------------------------------------------------------
  // IVCA Crafts — contacto, nav y cotizador
  // -----------------------------------------------------------
  ivca: {
    whatsappNumero: "6144042429",
    whatsappPrefijoPais: "52",
    socialLinks: [
      {
        id: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/IVCA2021",
      },
      {
        id: "instagram",
        label: "Instagram",
        href: "https://www.instagram.com/ivcacr2025/",
      },
    ],
    navLeft: [
      { label: "INICIO", href: "/#inicio" },
      {
        label: "TERMOS",
        children: [
          { label: "12 onzas", href: "/cotizar?categoria=termo&variante=12-onzas" },
          { label: "20 onzas", href: "/cotizar?categoria=termo&variante=20-onzas" },
          { label: "30 onzas", href: "/cotizar?categoria=termo&variante=30-onzas" },
        ],
      },
      {
        label: "FUNDAS",
        children: [
          { label: "iPhone", href: "/cotizar?categoria=funda&variante=iphone" },
          { label: "Samsung", href: "/cotizar?categoria=funda&variante=samsung" },
          { label: "Motorola", href: "/cotizar?categoria=funda&variante=motorola" },
          { label: "Xiaomi", href: "/cotizar?categoria=funda&variante=xiaomi" },
        ],
      },
      {
        label: "LLAVEROS",
        href: "/cotizar?categoria=llavero",
      },
      { label: "NOSOTROS", href: "/#nosotros" },
    ],
    navRight: [
      { label: "COMO PEDIR", href: "/#como-pedir" },
      { label: "ENVIOS", href: "/#envios" },
    ],
    muestrasTinta: [
      { id: "tinta-azul", label: "Azul", imageSrc: "/colores/tinta-azul.jpg" },
      {
        id: "tinta-amarillo",
        label: "Amarilla",
        imageSrc: "/colores/tinta-amarillo.jpg",
      },
      { id: "tinta-negra", label: "Negra", imageSrc: "/colores/tinta-negra.jpg" },
      {
        id: "tinta-magenta",
        label: "Magenta",
        imageSrc: "/colores/tinta-magenta.jpg",
      },
      {
        id: "tinta-naranja",
        label: "Naranja",
        imageSrc: "/colores/tinta-naranja.jpg",
      },
      {
        id: "tinta-morada",
        label: "Morada",
        imageSrc: "/colores/tinta-morada.jpg",
      },
      { id: "tinta-verde", label: "Verde", imageSrc: "/colores/tinta-verde.jpg" },
    ],
    muestrasGeoda: [
      {
        id: "geoda-1",
        label: "Geoda 1",
        value: "glitter_geoda1",
        imageSrc: "/colores/glitter-geoda1.jpg",
      },
      {
        id: "geoda-2",
        label: "Geoda 2",
        value: "glitter_geoda2",
        imageSrc: "/colores/glitter-geoda2.jpg",
      },
    ],
    glitterCombinadoBase: "Blanco",
    glitterCombinadoColores: [
      { id: "rosa", label: "Rosa", hex: "#E85A8C" },
      { id: "rojo", label: "Rojo", hex: "#C62828" },
      { id: "azul", label: "Azul", hex: "#1565C0" },
      { id: "verde", label: "Verde", hex: "#2E7D32" },
      { id: "negro", label: "Negro", hex: "#212121" },
      { id: "morado", label: "Morado", hex: "#6A1B9A" },
      { id: "amarillo", label: "Amarillo", hex: "#F9A825" },
    ],
    precios: {
      termo: {
        "12 onzas": { tinta_alcohol: 400, glitter: 480 },
        "20 onzas": { tinta_alcohol: 480, glitter: 580 },
        "30 onzas": { tinta_alcohol: 550, glitter: 650 },
      },
      funda: { tinta_alcohol: 400, glitter: 450 },
      llavero: { tinta_alcohol: 100, glitter: 100 },
    },
    disenos: [
      { value: "tinta_alcohol", label: "Tinta al Alcohol" },
      { value: "glitter", label: "Glitter" },
    ],
    colores: [
      { value: "color_tinta", label: "Color de tinta" },
      { value: "2_colores_glitter", label: "Glitter combinado: Blanco" },
      { value: "glitter_geoda1", label: "Glitter Geoda 1" },
      { value: "glitter_geoda2", label: "Glitter Geoda 2" },
    ],
    personalizaciones: [
      { value: "nombre", label: "Nombre" },
      { value: "inicial", label: "Inicial" },
      { value: "inicial_nombre", label: "Inicial + Nombre" },
      { value: "sin_personalizar", label: "Sin personalizar" },
    ],
    estatusCotizacion: [
      { value: "borrador", label: "borrador" },
      { value: "enviada", label: "enviada" },
      { value: "autorizada", label: "autorizada" },
      { value: "en_proceso", label: "en proceso" },
      { value: "terminada", label: "terminada" },
    ],
    comoPedir: {
      eyebrow: "Proceso",
      title: "Cómo pedir tu pieza",
      steps: [
        {
          number: "01",
          title: "Elige tu producto",
          body: "Termos de 12, 20 o 30 oz, fundas para celular o llaveros de resina.",
        },
        {
          number: "02",
          title: "Personalízalo",
          body: "Colores, glitter y tu nombre o inicial — cada pieza es única.",
        },
        {
          number: "03",
          title: "Arma tu cotización",
          body: "Configura cada producto en el sitio y revisa el resumen antes de enviar.",
        },
        {
          number: "04",
          title: "Confirma por WhatsApp",
          body: "Ajustamos detalles, envío y forma de pago del anticipo.",
        },
        {
          number: "05",
          title: "Recíbelo",
          body: "Tu pieza lista en 7 a 15 días hábiles.",
        },
      ],
      closingTitle: "¿Listo para armar tu pedido?",
      closingCta: { label: "Regresar al inicio", href: "/#inicio" },
    },
    envios: {
      eyebrow: "Envíos",
      title: "Entrega y tiempos",
      paragraphs: [
        "Entrega personal en la ciudad de Chihuahua, Chih. Hacemos envíos a toda la República Mexicana con costo adicional, que se calcula según tu ciudad y se confirma por WhatsApp antes de iniciar tu pieza.",
        "Tiempo de elaboración: 7 a 15 días hábiles (la resina necesita su tiempo de curado).",
      ],
    },
    nosotros: {
      eyebrow: "Sobre nosotros",
      title: "Piezas únicas pintadas a mano, nunca dos iguales",
      paragraphs: [
        "En IVCA Crafts pintamos cada termo y cada funda a mano con tinta al alcohol. La tinta se mueve libremente, así que ningún marmoleado se repite: tu pieza es literalmente irrepetible.",
        "Cada trabajo se sella con resina epoxi, que le da ese brillo de cristal, protege el color y hace el acabado resistente al uso diario. Todo se elabora en nuestro taller en Chihuahua, Chih.",
      ],
      highlights: [
        "100% pintado a mano",
        "Acabado en resina epoxi",
        "Personalización incluida",
      ],
    },
    redes: {
      eyebrow: "Comunidad",
      title: "Síguenos en redes",
      subtitle: "Mira trabajos recientes, procesos y novedades de IVCA Crafts.",
    },
    cotizar: {
      title: "Cotizador",
      subtitle:
        "Elige tus piezas, personalízalas y envía tu pedido por WhatsApp. El envío se cotiza aparte y se confirma antes de iniciar.",
      emptyCart: "Aún no agregas piezas. Configura tu primer producto a la izquierda.",
      cartMenuTitle: "Cotizar",
      cartMenuSubtitle: "Elige qué cotizar",
      cartMenuAria: "Abrir menú de productos para cotizar",
      cartMenuExpand: "Ver opciones",
      cartMenuDirect: "Ir al cotizador",
      addToCart: "Agregar al carrito",
      addAnother: "Agregar otro producto",
      addAnotherQuestion: "¿Deseas agregar otro producto?",
      addAnotherYes: "Sí",
      addAnotherNo: "No",
      addAnotherNoHint:
        "Revisa tu cotización a la derecha (o abajo en móvil) y pulsa Terminar cotización.",
      finish: "Terminar cotización",
      successTitle: "¡Cotización lista!",
      successMessage:
        "Tu cotización está lista y se envió a tu WhatsApp. Favor de verificar y autorizar en WhatsApp para continuar con el proceso.",
      backHome: "Volver al inicio",
      edit: "Editar",
      remove: "Quitar",
      totalLabel: "Tu cotización",
      clientName: "Nombre",
      clientPhone: "Celular (10 dígitos)",
      quantity: "Cantidad",
      design: "Diseño",
      color: "Color",
      personalization: "Personalizar",
      personalizationText: "Texto de personalización",
      personalizationNombre: "Nombre",
      personalizationNombrePlaceholder: "Escribe el nombre",
      personalizationInicial: "Inicial",
      personalizationInicialPlaceholder: "Ej. A",
      phoneModel: "Modelo del teléfono",
      phoneModelPlaceholder: "Ej. iPhone 14 Pro, Galaxy S23",
      subtotalLabel: "Subtotal",
      errors: {
        name: "Escribe tu nombre.",
        phone: "El celular debe tener 10 dígitos.",
        design: "Elige un diseño.",
        color: "Elige una opción de color.",
        inkColor: "Elige el color de la tinta.",
        personalization: "Elige cómo personalizar.",
        personalizationText: "Completa el texto de personalización.",
        personalizationNombre: "Escribe el nombre.",
        personalizationInicial: "Escribe la inicial.",
        phoneModel: "Escribe el modelo de tu teléfono.",
        variant: "Elige la variante de tu producto.",
        emptyCart: "Agrega al menos un producto al carrito.",
      },
    },
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
      eyebrow: null,
      title: "Regalos personalizados que se sienten de verdad",
      subtitle: null,
      cta: { label: "Cotizar mi pieza", href: "/cotizar" },
      ctaSecondary: null,
      videoSrc:
        "/Ginger Sunny Just Living Photo Collage Facebook Cover.mp4",
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
      eyebrow: "Catálogo",
      title: "Catálogo de diseños",
      subtitle:
        "Ejemplos de piezas realizadas. Tú eliges la paleta y nosotros creamos un diseño nuevo para ti.",
      items: [
        {
          icon: "Wine",
          title: "Termo Wine 12 oz",
          body: "Compacto y elegante, ideal para café o té.",
          href: "/cotizar?categoria=termo&variante=12-onzas",
        },
        {
          icon: "Wine",
          title: "Termo Skinny 20 oz",
          body: "Delgado y práctico para el día a día.",
          href: "/cotizar?categoria=termo&variante=20-onzas",
        },
        {
          icon: "Wine",
          title: "Termo 30 oz",
          body: "Mayor capacidad para hidratarte con estilo.",
          href: "/cotizar?categoria=termo&variante=30-onzas",
        },
        {
          icon: "Smartphone",
          title: "Funda para celular",
          body: "Protege tu celular con arte pintado a mano.",
          href: "/cotizar?categoria=funda&variante=iphone",
        },
        {
          icon: "KeyRound",
          title: "Llavero de resina",
          body: "Un detalle único con tinta al alcohol o glitter.",
          href: "/cotizar?categoria=llavero",
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
      eyebrow: "Catálogo",
      title: "Catálogo de diseños",
      subtitle:
        "Desliza a la derecha o izquierda para ver cada hoja de trabajos.",
      cta: { label: "Cotizar ahora", href: "/cotizar" },
      ctaSecondary: { label: "Cómo pedir", href: "/#como-pedir" },
      sheets: [
        {
          id: "hoja-1",
          label: "Fundas para celular",
          imageSrc: "/galeria/catalogo/hoja-1.png",
        },
        {
          id: "hoja-2",
          label: "Termo Wine 12 oz",
          imageSrc: "/galeria/catalogo/hoja-2.png",
        },
        {
          id: "hoja-3",
          label: "Más diseños",
          imageSrc: "/galeria/catalogo/hoja-3.png",
        },
      ],
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
        "IVCA Crafts · termos, fundas y llaveros pintados a mano en Chihuahua, Chih.",
      columns: [
        {
          title: "Producto",
          links: [
            { label: "Cotizar", href: "/cotizar" },
            { label: "Cómo pedir", href: "/#como-pedir" },
          ],
        },
        {
          title: "Información",
          links: [
            { label: "Nosotros", href: "/#nosotros" },
            { label: "Envíos", href: "/#envios" },
          ],
        },
        {
          title: "Contacto",
          links: [
            { label: "WhatsApp", href: "whatsapp", external: true },
            { label: "Facebook", href: "https://www.facebook.com/IVCA2021", external: true },
            { label: "Instagram", href: "https://www.instagram.com/ivcacr2025/", external: true },
          ],
        },
      ],
      links: [
        { label: "Cotizar", href: "/cotizar" },
        { label: "WhatsApp", href: "whatsapp", external: true },
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
