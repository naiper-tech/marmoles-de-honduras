import sierraBloque from "@/assets/sierra-bloque.jpg";
import mesaVeta from "@/assets/mesa-veta.jpg";
import pisoLaGorce from "@/assets/proy-la-gorce.jpg";
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
 *  - Hitos reales de "Nuestra historia" (Antonella).
 *  - Término final para "Reprocesamiento" y lista de servicios con fotos.
 *  - ~10 proyectos con blurb y "lo vendido".
 *  - Teléfono a publicar (línea de venta en línea) y correo de RR.HH.
 *  - Video institucional para la portada.
 */

export type Bilingue = { es: string; en: string };

/** Devuelve el texto en el idioma activo. */
export function useTexto() {
  const { lang } = useLang();
  return (texto: Bilingue) => (lang === "en" ? texto.en : texto.es);
}

export const YOUTUBE_ID = "DIX-ObqYLiM";
export const CASA_MARMOL_URL = "https://casamarmol.com";

export const CONTACTO = {
  correo: "sales@marmolesdehonduras.com",
  telefono: "+504 2226-9005",
  telefonoHref: "tel:+50422269005",
  correoRRHH: "info@marmolesdehonduras.com",
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

export type Capitulo = { numero: string; marca: Bilingue; titulo: Bilingue; texto: Bilingue };

export const capitulos: Capitulo[] = [
  {
    numero: "I",
    marca: { es: "1970", en: "1970" },
    titulo: { es: "Fundación", en: "Founded" },
    texto: {
      es: "Nace Mármoles de Honduras y se convierte en la empresa líder de la piedra natural en el país.",
      en: "Mármoles de Honduras is founded and becomes the country's leading natural stone company.",
    },
  },
  {
    numero: "II",
    marca: { es: "Origen", en: "Origin" },
    titulo: { es: "Canteras propias", en: "Our own quarries" },
    texto: {
      es: "Extraemos la piedra directamente, con control del origen desde el primer bloque.",
      en: "We extract the stone ourselves, controlling its origin from the very first block.",
    },
  },
  {
    numero: "III",
    marca: { es: "Planta", en: "Plant" },
    titulo: { es: "Fabricación a escala", en: "Fabrication at scale" },
    texto: {
      es: "Tecnología de punta para responder a proyectos de alta producción.",
      en: "State-of-the-art technology to deliver high-volume projects.",
    },
  },
  {
    numero: "IV",
    marca: { es: "Exportación", en: "Export" },
    titulo: { es: "Más allá de Honduras", en: "Beyond Honduras" },
    texto: {
      es: "Proyectos en Estados Unidos, Centroamérica y el Caribe.",
      en: "Projects across the United States, Central America and the Caribbean.",
    },
  },
  {
    numero: "V",
    marca: { es: "Hoy", en: "Today" },
    titulo: { es: "Casa Mármol", en: "Casa Mármol" },
    texto: {
      es: "Nuestra casa de diseño lleva el mismo oficio a los acabados terminados en Honduras.",
      en: "Our design house brings the same craft to finished surfaces in Honduras.",
    },
  },
];

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
    imagen: pisoLaGorce,
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
  "iglesia-concepcion-guatemala",
  "basilica-de-suyapa",
  "city-mall-tegucigalpa",
  "clock-tower-palm-beach",
  "ahana-luxury-condo-tower",
  "torre-sky",
];

export const proyectosDestacados: Proyecto[] = DESTACADOS.map((slug) =>
  proyectos.find((p) => p.slug === slug),
).filter((p): p is Proyecto => Boolean(p));

export type Region = { id: string; nombre: Bilingue; lugares: Bilingue; pines: string[] };

export const regiones: Region[] = [
  {
    id: "honduras",
    nombre: { es: "Honduras", en: "Honduras" },
    lugares: { es: "Tegucigalpa · San Pedro Sula · Roatán", en: "Tegucigalpa · San Pedro Sula · Roatán" },
    pines: ["tegucigalpa", "san-pedro-sula", "roatan"],
  },
  {
    id: "eeuu",
    nombre: { es: "Estados Unidos", en: "United States" },
    lugares: { es: "Florida · Utah · Hawái", en: "Florida · Utah · Hawaii" },
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
