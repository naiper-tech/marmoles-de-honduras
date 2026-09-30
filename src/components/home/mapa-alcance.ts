// Generado con dotted-map (Américas, proyección Mercator) y recortado al continente.
// Posiciones en % del lienzo, calculadas desde latitud y longitud. No editar a mano.
export type Ubicacion = { id: string; nombre: { es: string; en: string }; pais: string; x: number; y: number };

export const MAPA = { ancho: 98, alto: 73 };

/** Un punto por lugar con obra (reunión 29/09): varios en Florida, no uno por país. */
export const UBICACIONES: Ubicacion[] = [
  { id: "palm-beach", nombre: { es: "Palm Beach, Florida", en: "Palm Beach, Florida" }, pais: "Estados Unidos", x: 73.29, y: 47.43 },
  { id: "orlando", nombre: { es: "Orlando · Winter Park, Florida", en: "Orlando · Winter Park, Florida" }, pais: "Estados Unidos", x: 71.0, y: 42.87 },
  { id: "miami", nombre: { es: "Miami · Coral Gables, Florida", en: "Miami · Coral Gables, Florida" }, pais: "Estados Unidos", x: 72.92, y: 49.85 },
  { id: "naples", nombre: { es: "Naples, Florida", en: "Naples, Florida" }, pais: "Estados Unidos", x: 70.42, y: 48.8 },
  { id: "utah", nombre: { es: "Taylorsville, Utah", en: "Taylorsville, Utah" }, pais: "Estados Unidos", x: 21.14, y: 10.56 },
  { id: "tegucigalpa", nombre: { es: "Tegucigalpa, Honduras", en: "Tegucigalpa, Honduras" }, pais: "Honduras", x: 61.57, y: 76.98 },
  { id: "tela", nombre: { es: "Tela, Honduras", en: "Tela, Honduras" }, pais: "Honduras", x: 61.16, y: 73.11 },
  { id: "roatan", nombre: { es: "Roatán, Honduras", en: "Roatán, Honduras" }, pais: "Honduras", x: 62.68, y: 71.86 },
  { id: "guatemala", nombre: { es: "Ciudad de Guatemala", en: "Guatemala City" }, pais: "Guatemala", x: 56.17, y: 75.71 },
  { id: "san-salvador", nombre: { es: "San Salvador, El Salvador", en: "San Salvador, El Salvador" }, pais: "El Salvador", x: 58.28, y: 77.83 },
  { id: "tola", nombre: { es: "Tola, Nicaragua", en: "Tola, Nicaragua" }, pais: "Nicaragua", x: 63.64, y: 82.88 },
  { id: "san-jose", nombre: { es: "San José, Costa Rica", en: "San José, Costa Rica" }, pais: "Costa Rica", x: 66.66, y: 86.24 },
  { id: "nassau", nombre: { es: "Nassau, Bahamas", en: "Nassau, The Bahamas" }, pais: "Bahamas", x: 77.68, y: 51.45 },
];

/** Honolulu queda fuera del recorte del mapa: va en un recuadro aparte, como en los atlas. */
export const HAWAI = { id: "honolulu", nombre: { es: "Honolulu, Hawái", en: "Honolulu, Hawaii" }, pais: "Estados Unidos" };
