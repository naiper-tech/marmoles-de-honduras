import sierraBloque from "@/assets/sierra-bloque.jpg";
import mesaVeta from "@/assets/mesa-veta.jpg";
import pisoGuacalito from "@/assets/proy-guacalito-palapa.jpg";
import artesanoTallado from "@/assets/artesano-tallado.jpg";
import columnasTaller from "@/assets/columnas-taller.jpg";
import rosetones from "@/assets/rosetones.jpg";
import escaleraRitz from "@/assets/proy-escalera-ritz.jpg";
import { useLang } from "@/lib/i18n";
import { proyectos, type Proyecto } from "@/lib/site-data";

/**
 * Contenido de la home nueva (/home).
 *
 * PROVISIONAL — pendiente del cliente (kick-off 31/08/2026):
 *  - Término final para "Reprocesamiento" y lista de servicios con fotos.
 *  - ~10 proyectos con blurb y "lo vendido".
 *  - Teléfono a publicar (línea de venta en línea) y correo de RR.HH.
 *  - Video institucional para la portada (corre de fondo, sin voz).
 */

export type Bilingue = { es: string; en: string };

/** Devuelve el texto en el idioma activo. */
export function useTexto() {
  const { lang } = useLang();
  return (texto: Bilingue) => (lang === "en" ? texto.en : texto.es);
}

export const CASA_MARMOL_URL = "https://casamarmol.com";

export const CONTACTO = {
  correo: "sales@marmolesdehonduras.com",
  telefono: "+504 2226-9005",
  telefonoHref: "tel:+50422269005",
  correoRRHH: "rrhh@marmolesdehonduras.com",
  direccion: "Km 8 Carretera al Sur, Tegucigalpa, Honduras",
};

export const REDES = [
  { nombre: "Instagram", url: "https://www.instagram.com/marmolesdehonduras/" },
  { nombre: "Facebook", url: "https://www.facebook.com/marmolesdehonduras" },
  { nombre: "LinkedIn", url: "https://www.linkedin.com/company/marmoles-de-honduras/" },
];

/** Enlace de correo con el asunto ya escrito: el equipo sabe de qué se trata antes de abrirlo. */
export function correoCon(asunto: string, correo = CONTACTO.correo) {
  return `mailto:${correo}?subject=${encodeURIComponent(asunto)}`;
}

export type Capacidad = { id: string; titulo: Bilingue; detalle: Bilingue; imagen: string };

export const capacidades: Capacidad[] = [
  {
    id: "reprocesamiento",
    titulo: { es: "Reprocesamiento", en: "Stone reprocessing" },
    detalle: {
      es: "Nos envías tu piedra en bruto y la convertimos en las piezas de tu proyecto.",
      en: "Send us your raw stone and we turn it into the pieces your project needs.",
    },
    imagen: sierraBloque,
  },
  {
    id: "cubiertas",
    titulo: { es: "Cubiertas", en: "Countertops" },
    detalle: {
      es: "Cocinas, baños y barras cortadas a la medida, con veta continua.",
      en: "Kitchens, bathrooms and bars cut to size, with continuous veining.",
    },
    imagen: mesaVeta,
  },
  {
    id: "pisos",
    titulo: { es: "Pisos y enchapes", en: "Flooring and cladding" },
    detalle: {
      es: "Grandes superficies con tono uniforme, de la cantera a la obra.",
      en: "Large surfaces with a consistent tone, from quarry to site.",
    },
    imagen: pisoGuacalito,
  },
  {
    id: "tallado",
    titulo: { es: "Tallado y escultura", en: "Carving and sculpture" },
    detalle: {
      es: "Piezas talladas a mano por nuestros artesanos, a partir de un solo bloque.",
      en: "Pieces carved by hand by our artisans, from a single block.",
    },
    imagen: artesanoTallado,
  },
  {
    id: "columnas",
    titulo: { es: "Columnas y chimeneas", en: "Columns and fireplaces" },
    detalle: {
      es: "Elementos estructurales y decorativos con el detalle que pida el proyecto.",
      en: "Structural and decorative elements, detailed to the project's needs.",
    },
    imagen: columnasTaller,
  },
  {
    id: "mosaicos",
    titulo: { es: "Mosaicos, listelos y rosetones", en: "Mosaics, borders and medallions" },
    detalle: {
      es: "Composiciones a medida para pisos y muros de carácter.",
      en: "Custom compositions for statement floors and walls.",
    },
    imagen: rosetones,
  },
  {
    id: "gradas",
    titulo: { es: "Gradas y lavamanos sólidos", en: "Stairs and solid-stone basins" },
    detalle: {
      es: "Piezas macizas, fabricadas para durar tanto como el edificio.",
      en: "Solid pieces, built to last as long as the building.",
    },
    imagen: escaleraRitz,
  },
];

export const materiales: Bilingue[] = [
  { es: "Mármol", en: "Marble" },
  { es: "Cuarzo", en: "Quartz" },
  { es: "Travertino", en: "Travertine" },
  { es: "Granito", en: "Granite" },
  { es: "Cuarcita", en: "Quartzite" },
  { es: "Ónix", en: "Onyx" },
];

/**
 * Orden pensado para la grilla editorial: las fotos de mayor resolución ocupan
 * los espacios grandes y las más pequeñas (Clock Tower, Ahana) los chicos.
 */
const DESTACADOS = [
  "intercontinental-san-jose",
  "taylorsville-utah-temple",
  "iglesia-concepcion-guatemala",
  "guacalito-de-la-isla",
  "basilica-de-suyapa",
  "public-safety-building-winter-park",
  "city-mall-tegucigalpa",
  "indura-beach-golf-resort",
  "clock-tower-palm-beach",
  "ahana-luxury-condo-tower",
];

export const proyectosDestacados: Proyecto[] = DESTACADOS.map((slug) =>
  proyectos.find((p) => p.slug === slug),
).filter((p): p is Proyecto => Boolean(p));

/**
 * Portafolio completo de la página de Proyectos. Abre con las obras de mayor
 * resolución fotográfica y alterna países para que la grilla no agrupe
 * Honduras al inicio y Estados Unidos al final.
 */
const PORTAFOLIO = [
  "intercontinental-san-jose",
  "taylorsville-utah-temple",
  "ahana-luxury-condo-tower",
  "iglesia-concepcion-guatemala",
  "public-safety-building-winter-park",
  "basilica-de-suyapa",
  "guacalito-de-la-isla",
  "city-mall-tegucigalpa",
  "indura-beach-golf-resort",
  "clock-tower-palm-beach",
  "torre-sky",
  "225-e-hannibal-square",
  "capilla-alamar",
  "residencia-cocoplum",
  "411-w-new-england",
  "1500-ponce-de-leon",
  "residencia-windermere",
  "residencia-ritz-carlton-tiburon",
  "hannibal-square-park",
  "pristine-bay-roatan",
];

export const proyectosPortafolio: Proyecto[] = PORTAFOLIO.map((slug) =>
  proyectos.find((p) => p.slug === slug),
).filter((p): p is Proyecto => Boolean(p));

export type Region = { id: string; nombre: Bilingue; lugares: Bilingue; pines: string[] };

export const regiones: Region[] = [
  {
    id: "honduras",
    nombre: { es: "Honduras", en: "Honduras" },
    lugares: { es: "", en: "" },
    pines: ["tegucigalpa", "san-pedro-sula", "roatan"],
  },
  {
    id: "eeuu",
    nombre: { es: "Estados Unidos", en: "United States" },
    lugares: { es: "", en: "" },
    pines: ["palm-beach", "utah", "honolulu"],
  },
  {
    id: "centroamerica",
    nombre: { es: "Centroamérica", en: "Central America" },
    lugares: {
      es: "Guatemala · El Salvador · Nicaragua · Costa Rica",
      en: "Guatemala · El Salvador · Nicaragua · Costa Rica",
    },
    pines: ["guatemala", "san-salvador", "tola", "san-jose"],
  },
  {
    id: "caribe",
    nombre: { es: "El Caribe", en: "The Caribbean" },
    lugares: { es: "Bahamas", en: "The Bahamas" },
    pines: ["nassau"],
  },
];

/* ── Nosotros (textos del brief de marca) ─────────────────────────────── */

export const MISION: Bilingue = {
  es: "Diseñamos sueños y los hacemos realidad.",
  en: "We design dreams and make them real.",
};

export const VISION: Bilingue = {
  es: "Con calidad mundial, tallar un modelo de adaptabilidad, servicio y selección para desarrollar los proyectos de nuestros clientes, colaboradores y comunidad.",
  en: "With world-class quality, to carve a model of adaptability, service and selection that brings to life the projects of our clients, collaborators and community.",
};

export const valores: Bilingue[] = [
  { es: "Nos adueñamos de cada reto.", en: "We own every challenge." },
  { es: "Forjamos con flexibilidad.", en: "We forge with flexibility." },
  { es: "Construimos con coherencia.", en: "We build with consistency." },
  { es: "Damos confianza única, con cimientos sólidos.", en: "We offer unique trust, built on solid foundations." },
  { es: "Sentimos orgullo de cada detalle.", en: "We take pride in every detail." },
];

/* ── Contacto ─────────────────────────────────────────────────────────── */

export const tiposProyecto: Bilingue[] = [
  { es: "Residencial", en: "Residential" },
  { es: "Hotelero", en: "Hospitality" },
  { es: "Comercial", en: "Commercial" },
  { es: "Institucional", en: "Institutional" },
  { es: "Religioso", en: "Religious" },
  { es: "Reprocesamiento de piedra propia", en: "Reprocessing my own stone" },
  { es: "Otro", en: "Other" },
];
