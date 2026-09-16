import matMarmol from "@/assets/mat-marmol.jpg";
import matGranito from "@/assets/mat-granito.jpg";
import matCuarcita from "@/assets/mat-cuarcita.jpg";
import matOnix from "@/assets/mat-onix.jpg";
import matTravertino from "@/assets/mat-travertino.jpg";
import projClock from "@/assets/project-clocktower.jpg";
import projLobby from "@/assets/project-lobby.jpg";
import projKitchen from "@/assets/project-kitchen.jpg";
import projBath from "@/assets/project-bath.jpg";
import projTorreSky from "@/assets/proj-torre-sky.jpg";
import projMall from "@/assets/proj-mall.jpg";
import projHotel from "@/assets/proj-hotel.jpg";
import projBasilica from "@/assets/proj-basilica.jpg";
import tallerColumnas from "@/assets/taller-columnas.jpg";
import artesanoAcabado from "@/assets/artesano-acabado.jpg";
import piezaDetalles from "@/assets/pieza-detalles.jpg";
import piezaBustos from "@/assets/pieza-bustos.jpg";
import piezaEscaleras from "@/assets/pieza-escaleras.jpg";
import piezaChimeneas from "@/assets/pieza-chimeneas.jpg";
import piezaColumnas from "@/assets/pieza-columnas.jpg";
import piezaBancas from "@/assets/pieza-bancas.jpg";
import piezaTinas from "@/assets/pieza-tinas.jpg";
import piezaSolarium from "@/assets/pieza-solarium.jpg";
import fotoClockTower from "@/assets/proy-clock-tower.jpg";
import fotoAhana from "@/assets/proy-ahana.jpg";
import fotoInterCR from "@/assets/foto-intercontinental-cr.jpg";
import fotoInterTGU from "@/assets/foto-intercontinental-tgu.jpg";
import fotoTorreSky from "@/assets/foto-torre-sky.jpg";
import fotoCityMall from "@/assets/foto-city-mall.jpg";
import fotoBasilica from "@/assets/foto-basilica.jpg";
import fotoIglesiaConcepcion from "@/assets/foto-iglesia-concepcion.jpg";
import fotoTaylorsville from "@/assets/proy-taylorsville.jpg";
import fotoPublicSafety from "@/assets/proy-public-safety.jpg";
import fotoPonceLeon from "@/assets/proy-ponce-leon.jpg";
import fotoHannibalSquare from "@/assets/proy-hannibal-square.jpg";
import fotoHannibalPark from "@/assets/proy-hannibal-park.jpg";
import fotoNewEngland from "@/assets/proy-411-new-england.jpg";
import fotoLaGorce from "@/assets/proy-la-gorce.jpg";
import fotoCocoplum from "@/assets/proy-cocoplum.jpg";
import fotoWindermere from "@/assets/proy-chimenea-windermere.jpg";
import fotoWindermereCampana from "@/assets/proy-campana-windermere.jpg";
import fotoRitzTiburon from "@/assets/proy-escalera-ritz.jpg";
import fotoAlamar from "@/assets/proy-alamar.jpg";
import fotoGuacalito from "@/assets/proy-guacalito.jpg";
import fotoIndura from "@/assets/proy-indura.jpg";
import fotoConcepcionInterior from "@/assets/proy-concepcion.jpg";

export type Material = {
  slug: string;
  nombre: string;
  descripcion: string;
  usos: string[];
  acabados: string[];
  imagen: string;
  en?: Partial<Material>;
};

export const materiales: Material[] = [
  {
    slug: "marmol",
    nombre: "Mármol",
    descripcion:
      "La piedra clásica por excelencia. Vetas irregulares y luminosidad suave que dan carácter a cualquier ambiente.",
    usos: ["Pisos", "Revestimientos", "Baños", "Escaleras"],
    acabados: ["Pulido", "Apomazado", "Envejecido"],
    imagen: matMarmol,
    en: {
      nombre: "Marble",
      descripcion:
        "The classic stone above all others. Irregular veining and a soft luminosity that lend character to any setting.",
      usos: ["Flooring", "Wall cladding", "Bathrooms", "Staircases"],
      acabados: ["Polished", "Honed", "Antiqued"],
    },
  },
  {
    slug: "granito",
    nombre: "Granito",
    descripcion:
      "Máxima dureza y resistencia. Ideal para superficies de alto tránsito y uso intensivo diario.",
    usos: ["Cocinas", "Barras", "Exteriores", "Fachadas"],
    acabados: ["Pulido", "Flameado", "Cepillado"],
    imagen: matGranito,
    en: {
      nombre: "Granite",
      descripcion:
        "Exceptional hardness and durability. Ideal for high-traffic surfaces and intensive daily use.",
      usos: ["Kitchens", "Countertops", "Outdoor areas", "Façades"],
      acabados: ["Polished", "Flamed", "Brushed"],
    },
  },
  {
    slug: "cuarcita",
    nombre: "Cuarcita",
    descripcion:
      "El dramatismo del mármol con la resistencia del granito. Vetas profundas y gran estabilidad.",
    usos: ["Islas de cocina", "Paneles decorativos", "Mesas"],
    acabados: ["Pulido", "Leathered", "Apomazado"],
    imagen: matCuarcita,
    en: {
      nombre: "Quartzite",
      descripcion:
        "The drama of marble with the resilience of granite. Deep veining and outstanding stability.",
      usos: ["Kitchen islands", "Decorative panels", "Tabletops"],
      acabados: ["Polished", "Leathered", "Honed"],
    },
  },
  {
    slug: "onix",
    nombre: "Ónix",
    descripcion:
      "Piedra translúcida de bandas luminosas. Retroiluminada se convierte en la pieza central del espacio.",
    usos: ["Muros retroiluminados", "Barras", "Lavamanos"],
    acabados: ["Pulido", "Translúcido"],
    imagen: matOnix,
    en: {
      nombre: "Onyx",
      descripcion:
        "A translucent stone with luminous banding. Backlit, it becomes the centerpiece of any space.",
      usos: ["Backlit walls", "Bar tops", "Vanities"],
      acabados: ["Polished", "Translucent"],
    },
  },
  {
    slug: "travertino",
    nombre: "Travertino",
    descripcion:
      "Textura porosa y tono cálido. La opción más serena y atemporal para grandes superficies.",
    usos: ["Pisos", "Terrazas", "Fachadas", "Piscinas"],
    acabados: ["Apomazado", "Rústico", "Relleno y pulido"],
    imagen: matTravertino,
    en: {
      nombre: "Travertine",
      descripcion:
        "Porous texture and warm tone. The most serene, timeless choice for large-scale surfaces.",
      usos: ["Flooring", "Terraces", "Façades", "Pools"],
      acabados: ["Honed", "Rustic", "Filled and polished"],
    },
  },
];

export type Categoria =
  | "Residencial"
  | "Comercial"
  | "Institucional"
  | "Hotelero"
  | "Religioso";

export type Proyecto = {
  slug: string;
  titulo: string;
  lugar: string;
  pais: string;
  categoria: Categoria;
  /** Año de entrega. Pendiente de la memoria técnica del cliente. */
  anio?: string;
  /** Fotos reales de la obra para el carrusel del modal (la principal va aparte). */
  fotos?: string[];
  resumen: string;
  imagen: string;
  alcance: string[];
  materiales: string[];
  contenido: { titulo: string; texto: string }[];
  galeria: string[];
  en?: Partial<Proyecto>;
};

/**
 * Portafolio curado. Nombres y ubicaciones tomados del portafolio publicado
 * por la empresa en marmolesdehonduras.com/projects.
 *
 * NOTA: el sitio original no publica años ni descripciones por obra. Los textos
 * de esta sección describen la tipología del proyecto y el proceso real de
 * fabricación de la empresa; no afirman hechos específicos de cada obra.
 * Sustituir por la memoria técnica real cuando el cliente la entregue.
 */
export const proyectos: Proyecto[] = [
  {
    slug: "clock-tower-palm-beach",
    titulo: "Clock Tower",
    lugar: "Palm Beach, Florida",
    pais: "Estados Unidos",
    categoria: "Institucional",
    resumen:
      "Torre de reloj en piedra natural tallada para Palm Beach. Obra institucional en Estados Unidos, fabricada en Honduras y montada en sitio.",
    imagen: fotoClockTower,
    alcance: ["Diseño de despiece", "Talla de molduras", "Fabricación", "Montaje en sitio"],
    materiales: ["Mármol", "Travertino"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Una torre de reloj es piedra estructural y ornamental a la vez: cornisas, molduras y remates que deben alinearse en vertical a lo largo de toda la altura. Es el tipo de encargo que exige talla, no solo corte.",
      },
      {
        titulo: "La piedra",
        texto:
          "El mármol y el travertino permiten trabajar perfiles complejos manteniendo un tono homogéneo entre piezas. Para exterior costero se seleccionan bloques de baja absorción y se resuelve el anclaje en acero inoxidable.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Seleccionamos el bloque, modelamos el despiece pieza por pieza antes de cortar y fabricamos en planta propia. Las piezas se numeran para que el montaje en obra siga una secuencia definida desde el taller.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "Es nuestra obra más visible fuera de Honduras y la que mejor resume lo que hacemos: talla en piedra natural con estándar de exportación, desde una planta hondureña.",
      },
    ],
    galeria: [fotoClockTower, matMarmol, artesanoAcabado],
    en: {
      titulo: "Clock Tower",
      lugar: "Palm Beach, Florida",
      pais: "United States",
      resumen:
        "A carved natural stone clock tower for Palm Beach. An institutional project in the United States, fabricated in Honduras and installed on site.",
      alcance: ["Shop-drawing design", "Molding carving", "Fabrication", "On-site installation"],
      materiales: ["Marble", "Travertine"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "A clock tower is structural and ornamental stone at once: cornices, moldings, and finials that must align vertically across the full height. This is the kind of commission that demands carving, not just cutting.",
        },
        {
          titulo: "The stone",
          texto:
            "Marble and travertine allow complex profiles to be worked while keeping tone consistent across pieces. For coastal exteriors, low-absorption blocks are selected and anchoring is resolved in stainless steel.",
        },
        {
          titulo: "Our work",
          texto:
            "We select the block, model the layout piece by piece before cutting, and fabricate in our own plant. Pieces are numbered so that on-site installation follows a sequence defined back at the artesanoAcabado.",
        },
        {
          titulo: "Why it matters",
          texto:
            "It is our most visible work outside Honduras and the one that best sums up what we do: carved natural stone at export standard, from a Honduran plant.",
        },
      ],
    },
  },
  {
    slug: "ahana-luxury-condo-tower",
    titulo: "Ahana Luxury Condo Tower",
    lugar: "Honolulu, Hawái",
    pais: "Estados Unidos",
    categoria: "Residencial",
    resumen:
      "Torre residencial de lujo en Honolulu. Piedra natural para áreas comunes y unidades, coordinada a distancia desde planta propia en Honduras.",
    imagen: fotoAhana,
    alcance: ["Suministro", "Fabricación a medida", "Logística de exportación"],
    materiales: ["Mármol", "Granito"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Una torre de condominios de lujo en Hawái, con piedra natural en lobby, áreas comunes y unidades privadas. Un mismo criterio de material repetido en decenas de espacios.",
      },
      {
        titulo: "La piedra",
        texto:
          "En proyectos de repetición, la piedra natural obliga a reservar volumen desde el inicio: bloques distintos dan tonos distintos. El mármol se destina a superficies de carácter y el granito a las de mayor uso.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Fabricación calibrada en planta, control de calidad por lote y embalaje preparado para transporte transoceánico. La coordinación se maneja por fases, según el avance de obra.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "Demuestra algo poco común en una empresa hondureña: capacidad de abastecer un proyecto residencial de alta gama al otro lado del Pacífico, con estándar de exportación.",
      },
    ],
    galeria: [fotoAhana, matMarmol, matGranito],
    en: {
      titulo: "Ahana Luxury Condo Tower",
      lugar: "Honolulu, Hawaii",
      pais: "United States",
      resumen:
        "A luxury residential tower in Honolulu. Natural stone for common areas and units, coordinated remotely from our own plant in Honduras.",
      alcance: ["Supply", "Custom fabrication", "Export logistics"],
      materiales: ["Marble", "Granite"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "A luxury condominium tower in Hawaii, with natural stone in the lobby, common areas, and private units. One material standard repeated across dozens of spaces.",
        },
        {
          titulo: "The stone",
          texto:
            "In repetition projects, natural stone requires reserving volume from the outset: different blocks yield different tones. Marble goes to feature surfaces, granite to those seeing heavier use.",
        },
        {
          titulo: "Our work",
          texto:
            "Calibrated fabrication in-plant, quality control by lot, and packaging prepared for transoceanic shipping. Coordination is handled in phases, following construction progress.",
        },
        {
          titulo: "Why it matters",
          texto:
            "It proves something uncommon for a Honduran company: the capacity to supply a high-end residential project across the Pacific, at export standard.",
        },
      ],
    },
  },
  {
    slug: "guacalito-de-la-isla",
    titulo: "Guacalito de la Isla",
    lugar: "Tola",
    pais: "Nicaragua",
    categoria: "Hotelero",
    resumen:
      "Desarrollo residencial y de resort en la costa pacífica de Nicaragua, con piedra natural en interiores y áreas exteriores.",
    imagen: fotoGuacalito,
    alcance: ["Suministro", "Corte a medida", "Instalación"],
    materiales: ["Travertino", "Mármol"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Un desarrollo de lujo frente al Pacífico nicaragüense, donde interior y exterior comparten material para que el espacio se lea continuo al cruzar la puerta.",
      },
      {
        titulo: "La piedra",
        texto:
          "El travertino es la opción natural en clima costero: se mantiene fresco al caminar descalzo y su textura porosa aporta agarre en terrazas y bordes de piscina.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Levantamiento de medidas en sitio, corte a medida en planta y colocación con equipos propios. Para exteriores expuestos a salinidad se aplica tratamiento hidrofugante.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "Confirma nuestra presencia en Centroamérica más allá de Honduras, en un segmento donde el acabado define el precio por metro cuadrado del desarrollo.",
      },
    ],
    galeria: [fotoGuacalito, matTravertino, tallerColumnas],
    en: {
      titulo: "Guacalito de la Isla",
      lugar: "Tola",
      pais: "Nicaragua",
      resumen:
        "A residential and resort development on Nicaragua's Pacific coast, with natural stone across interiors and outdoor areas.",
      alcance: ["Supply", "Custom cutting", "Installation"],
      materiales: ["Travertine", "Marble"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "A luxury development facing the Nicaraguan Pacific, where indoors and outdoors share a material so the space reads continuously as you cross the threshold.",
        },
        {
          titulo: "The stone",
          texto:
            "Travertine is the natural choice in a coastal climate: it stays cool underfoot and its porous texture provides grip on terraces and pool edges.",
        },
        {
          titulo: "Our work",
          texto:
            "On-site measurement, custom cutting in-plant, and installation by our own crews. Exteriors exposed to salinity receive a water-repellent treatment.",
        },
        {
          titulo: "Why it matters",
          texto:
            "It confirms our presence in Central America beyond Honduras, in a segment where the finish sets the development's price per square meter.",
        },
      ],
    },
  },
  {
    slug: "intercontinental-san-jose",
    titulo: "Intercontinental",
    lugar: "San José",
    pais: "Costa Rica",
    categoria: "Hotelero",
    resumen:
      "Piedra natural para áreas públicas de hotelería internacional en San José. Superficies de alto tránsito con acabado de categoría.",
    imagen: fotoInterCR,
    alcance: ["Suministro", "Fabricación", "Instalación"],
    materiales: ["Mármol", "Granito"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Áreas públicas de un hotel de cadena internacional: recepción, circulaciones y baños. Espacios donde la piedra es lo primero que ve el huésped y lo que más desgaste recibe.",
      },
      {
        titulo: "La piedra",
        texto:
          "El mármol resuelve el carácter en recepción y muros de impacto visual; el granito asume las zonas de mayor tránsito, donde la dureza pesa más que la veta.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Despiece digital para lograr juntas mínimas y veta continua, fabricación calibrada por lote e instalación con equipos propios sobre calendario de obra hotelera.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "La hotelería internacional audita materiales y proveedores. Entrar en ese estándar es la mejor carta de presentación ante desarrolladores comerciales.",
      },
    ],
    galeria: [fotoInterCR, fotoInterTGU, matMarmol],
    en: {
      titulo: "Intercontinental",
      lugar: "San José",
      pais: "Costa Rica",
      resumen:
        "Natural stone for international hotel public areas in San José. High-traffic surfaces with a premium finish.",
      alcance: ["Supply", "Fabrication", "Installation"],
      materiales: ["Marble", "Granite"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "Public areas of an international chain hotel: reception, circulation, and restrooms. Spaces where stone is the first thing a guest sees and what takes the most wear.",
        },
        {
          titulo: "The stone",
          texto:
            "Marble carries the character in reception and feature walls; granite takes the higher-traffic zones, where hardness matters more than veining.",
        },
        {
          titulo: "Our work",
          texto:
            "Digital layout for minimal joints and continuous veining, lot-calibrated fabrication, and installation by our own crews on a hotel construction schedule.",
        },
        {
          titulo: "Why it matters",
          texto:
            "International hospitality audits materials and suppliers. Meeting that standard is the strongest credential we can present to commercial developers.",
        },
      ],
    },
  },
  {
    slug: "torre-sky",
    titulo: "Torre Sky",
    lugar: "Tegucigalpa",
    pais: "Honduras",
    categoria: "Residencial",
    resumen:
      "Edificio residencial de altura en Tegucigalpa: piedra natural en lobby, áreas comunes y baños, con criterio de tono uniforme entre niveles.",
    imagen: fotoTorreSky,
    alcance: ["Suministro", "Fabricación a medida", "Instalación"],
    materiales: ["Mármol", "Granito"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Una torre residencial donde decenas de unidades y las áreas comunes deben compartir la misma paleta de piedra, sin saltos de tono perceptibles entre pisos.",
      },
      {
        titulo: "La piedra",
        texto:
          "La piedra natural varía de bloque a bloque. Un edificio completo obliga a reservar el volumen total desde el inicio y a planificar el corte por lotes, no por pedido.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Calibrado en planta propia y entrega por fases según el avance de obra, con etiquetado por nivel y ambiente para que nada se cruce en sitio.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "En vivienda vertical, la continuidad visual del lobby al último piso es lo que separa un edificio de categoría de uno que solo usó material caro.",
      },
    ],
    galeria: [fotoTorreSky, matMarmol, tallerColumnas],
    en: {
      titulo: "Torre Sky",
      lugar: "Tegucigalpa",
      pais: "Honduras",
      resumen:
        "A high-rise residential building in Tegucigalpa: natural stone in the lobby, common areas, and bathrooms, held to a uniform tone across floors.",
      alcance: ["Supply", "Custom fabrication", "Installation"],
      materiales: ["Marble", "Granite"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "A residential tower where dozens of units and the common areas must share the same stone palette, with no perceptible tonal jumps between floors.",
        },
        {
          titulo: "The stone",
          texto:
            "Natural stone varies from block to block. A complete building requires reserving the full volume up front and planning the cutting by lot, not by order.",
        },
        {
          titulo: "Our work",
          texto:
            "Calibration in our own plant and phased delivery following construction progress, labeled by floor and room so nothing gets crossed on site.",
        },
        {
          titulo: "Why it matters",
          texto:
            "In vertical housing, visual continuity from the lobby to the top floor is what separates a premium building from one that merely used expensive material.",
        },
      ],
    },
  },
  {
    slug: "city-mall-tegucigalpa",
    titulo: "City Mall",
    lugar: "Tegucigalpa",
    pais: "Honduras",
    categoria: "Comercial",
    resumen:
      "Pisos y revestimientos de columnas en centro comercial de alto tránsito. Piedra natural dimensionada para uso público intensivo.",
    imagen: fotoCityMall,
    alcance: ["Suministro", "Corte a medida", "Instalación", "Mantenimiento"],
    materiales: ["Travertino", "Granito"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Grandes superficies de piso y columnas en un espacio que recibe miles de visitantes por semana durante toda la vida útil del edificio.",
      },
      {
        titulo: "La piedra",
        texto:
          "El reto en retail es combinar la calidez de la piedra natural con la resistencia al desgaste y al deslizamiento que exige un espacio público.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Travertino relleno y pulido en circulaciones, granito en zonas de mayor carga, y un despiece modular que permite reemplazar piezas puntuales sin intervenir el conjunto.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "El comercial se mide en años, no en la entrega. Por eso ofrecemos plan de mantenimiento: el piso tiene que verse igual de bien en la temporada diez.",
      },
    ],
    galeria: [fotoCityMall, matTravertino, matGranito],
    en: {
      titulo: "City Mall",
      lugar: "Tegucigalpa",
      pais: "Honduras",
      resumen:
        "Flooring and column cladding in a high-traffic shopping center. Natural stone dimensioned for intensive public use.",
      alcance: ["Supply", "Custom cutting", "Installation", "Maintenance"],
      materiales: ["Travertine", "Granite"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "Large floor and column surfaces in a space that welcomes thousands of visitors weekly across the building's entire service life.",
        },
        {
          titulo: "The stone",
          texto:
            "The retail challenge is combining the warmth of natural stone with the wear and slip resistance a public space demands.",
        },
        {
          titulo: "Our work",
          texto:
            "Filled, polished travertine in walkways, granite in higher-load zones, and a modular layout that lets individual pieces be replaced without disturbing the whole.",
        },
        {
          titulo: "Why it matters",
          texto:
            "Commercial work is measured in years, not at handover. That is why we offer a maintenance plan: the floor has to look just as good in season ten.",
        },
      ],
    },
  },
  {
    slug: "basilica-de-suyapa",
    titulo: "Basílica de Suyapa",
    lugar: "Tegucigalpa",
    pais: "Honduras",
    categoria: "Religioso",
    resumen:
      "Trabajo en mármol para uno de los espacios religiosos más visitados de Honduras. Obra litúrgica de alto valor simbólico.",
    imagen: fotoBasilica,
    alcance: ["Talla", "Fabricación", "Instalación"],
    materiales: ["Mármol blanco", "Mármol gris"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Intervenir un espacio de enorme valor simbólico para el país, con piezas que se integren a lo existente en lugar de competir con ello.",
      },
      {
        titulo: "La piedra",
        texto:
          "El mármol blanco y gris permite jerarquizar el presbiterio sin recurrir al contraste agresivo. La sobriedad es el requisito, no la excepción.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Talla y prefabricación en planta para reducir al mínimo el trabajo dentro del templo, y montaje coordinado con los horarios de culto.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "Es la obra que más hondureños han visto sin saber que es nuestra. En patrimonio religioso, el mejor resultado es el que no se nota.",
      },
    ],
    galeria: [fotoBasilica, matMarmol, artesanoAcabado],
    en: {
      titulo: "Basilica of Suyapa",
      lugar: "Tegucigalpa",
      pais: "Honduras",
      resumen:
        "Marble work for one of the most visited religious sites in Honduras. Liturgical work of high symbolic value.",
      alcance: ["Carving", "Fabrication", "Installation"],
      materiales: ["White marble", "Gray marble"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "Working within a space of enormous symbolic value to the country, with pieces that blend into the existing fabric rather than compete with it.",
        },
        {
          titulo: "The stone",
          texto:
            "White and gray marble allow the presbytery to be given hierarchy without resorting to aggressive contrast. Restraint is the requirement, not the exception.",
        },
        {
          titulo: "Our work",
          texto:
            "Carving and prefabrication in-plant to minimize work inside the church, with installation coordinated around worship hours.",
        },
        {
          titulo: "Why it matters",
          texto:
            "It is the work most Hondurans have seen without knowing it is ours. In religious heritage, the best result is the one you do not notice.",
        },
      ],
    },
  },
  {
    slug: "pristine-bay-roatan",
    titulo: "Pristine Bay",
    lugar: "Roatán, Islas de la Bahía",
    pais: "Honduras",
    categoria: "Hotelero",
    resumen:
      "Villas frente al mar en Roatán, con travertino en terrazas y baños revestidos del piso al cielo.",
    imagen: projBath,
    alcance: ["Suministro", "Fabricación", "Instalación", "Logística insular"],
    materiales: ["Travertino", "Mármol"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Un desarrollo de villas donde el interior y el exterior comparten material para que el espacio no cambie de temperatura visual al salir a la terraza.",
      },
      {
        titulo: "La piedra",
        texto:
          "En isla, la salinidad y la humedad son el factor determinante. El travertino con tratamiento hidrofugante resiste terrazas y bordes de piscina sin perder textura.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Fabricación en planta, embalaje reforzado por pieza para el traslado marítimo e inventario de reposición en sitio para no detener la obra por una pieza dañada.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "Trabajar en Roatán exige resolver logística además de piedra. Es la clase de proyecto donde un proveedor sin planta propia no puede sostener el ritmo.",
      },
    ],
    galeria: [projBath, matTravertino, tallerColumnas],
    en: {
      titulo: "Pristine Bay",
      lugar: "Roatán, Bay Islands",
      pais: "Honduras",
      resumen:
        "Beachfront villas in Roatán, with travertine terraces and bathrooms clad floor to ceiling.",
      alcance: ["Supply", "Fabrication", "Installation", "Island logistics"],
      materiales: ["Travertine", "Marble"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "A villa development where indoors and outdoors share a material, so the space does not shift visual temperature as you step onto the terrace.",
        },
        {
          titulo: "The stone",
          texto:
            "On an island, salinity and humidity are the determining factor. Water-repellent-treated travertine holds up on terraces and pool edges without losing texture.",
        },
        {
          titulo: "Our work",
          texto:
            "In-plant fabrication, reinforced piece-by-piece packaging for sea transport, and an on-site replacement inventory so a single damaged piece never halts the job.",
        },
        {
          titulo: "Why it matters",
          texto:
            "Working in Roatán means solving logistics as well as stone. It is the kind of project where a supplier without its own plant cannot keep pace.",
        },
      ],
    },
  },
  {
    slug: "indura-beach-golf-resort",
    titulo: "Indura Beach & Golf Resort",
    lugar: "San Pedro Sula",
    pais: "Honduras",
    categoria: "Hotelero",
    resumen:
      "Resort de playa y golf con piedra natural en áreas comunes, villas y zonas húmedas.",
    imagen: fotoIndura,
    alcance: ["Suministro", "Corte a medida", "Instalación"],
    materiales: ["Travertino", "Mármol", "Granito"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Un resort combina tipologías en un mismo encargo: áreas comunes de alto tránsito, villas privadas y zonas húmedas, cada una con exigencias distintas.",
      },
      {
        titulo: "La piedra",
        texto:
          "Travertino para exteriores y zonas húmedas, mármol donde se busca carácter y granito en superficies de trabajo. Una paleta, tres comportamientos.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Suministro coordinado por etapas, corte a medida según el levantamiento real de cada ambiente e instalación con equipos propios.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "La hotelería vacacional vende experiencia, y la piedra es de los pocos materiales que el huésped toca con los pies descalzos todos los días.",
      },
    ],
    galeria: [fotoIndura, matTravertino, matGranito],
    en: {
      titulo: "Indura Beach & Golf Resort",
      lugar: "San Pedro Sula",
      pais: "Honduras",
      resumen:
        "A beach and golf resort with natural stone across common areas, villas, and wet zones.",
      alcance: ["Supply", "Custom cutting", "Installation"],
      materiales: ["Travertine", "Marble", "Granite"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "A resort combines typologies within a single commission: high-traffic common areas, private villas, and wet zones, each with distinct demands.",
        },
        {
          titulo: "The stone",
          texto:
            "Travertine for exteriors and wet zones, marble where character is wanted, granite on work surfaces. One palette, three behaviors.",
        },
        {
          titulo: "Our work",
          texto:
            "Staged, coordinated supply, custom cutting based on real measurements of each room, and installation by our own crews.",
        },
        {
          titulo: "Why it matters",
          texto:
            "Resort hospitality sells experience, and stone is one of the few materials guests touch barefoot every single day.",
        },
      ],
    },
  },
  {
    slug: "iglesia-concepcion-guatemala",
    titulo: "Iglesia Concepción",
    lugar: "Ciudad de Guatemala",
    pais: "Guatemala",
    categoria: "Religioso",
    resumen:
      "Obra litúrgica en piedra natural en Ciudad de Guatemala. Talla y fabricación desde nuestra planta en Honduras.",
    imagen: fotoIglesiaConcepcion,
    alcance: ["Talla", "Fabricación", "Instalación"],
    materiales: ["Mármol"],
    contenido: [
      {
        titulo: "El proyecto",
        texto:
          "Piezas litúrgicas en mármol para un templo en la capital guatemalteca, resueltas con el mismo criterio de sobriedad que exige el espacio religioso.",
      },
      {
        titulo: "La piedra",
        texto:
          "El mármol es el material litúrgico por tradición y por comportamiento: se talla con precisión, envejece bien y no compite con la arquitectura que lo rodea.",
      },
      {
        titulo: "Nuestro trabajo",
        texto:
          "Talla y prefabricación completa en planta, con transporte terrestre a Guatemala y montaje coordinado con la actividad del templo.",
      },
      {
        titulo: "Por qué importa",
        texto:
          "Guatemala es uno de los cinco países donde hemos entregado obra. El trabajo religioso es, además, el que más confianza exige del cliente.",
      },
    ],
    galeria: [fotoIglesiaConcepcion, fotoConcepcionInterior, matMarmol],
    fotos: [fotoIglesiaConcepcion, fotoConcepcionInterior],
    en: {
      titulo: "Concepción Church",
      lugar: "Guatemala City",
      pais: "Guatemala",
      resumen:
        "Liturgical natural stone work in Guatemala City. Carving and fabrication from our plant in Honduras.",
      alcance: ["Carving", "Fabrication", "Installation"],
      materiales: ["Marble"],
      contenido: [
        {
          titulo: "The project",
          texto:
            "Liturgical marble pieces for a church in the Guatemalan capital, resolved with the same restraint a religious space demands.",
        },
        {
          titulo: "The stone",
          texto:
            "Marble is the liturgical material by tradition and by behavior: it carves precisely, ages well, and does not compete with the architecture around it.",
        },
        {
          titulo: "Our work",
          texto:
            "Full carving and prefabrication in-plant, with overland transport to Guatemala and installation coordinated around the church's activity.",
        },
        {
          titulo: "Why it matters",
          texto:
            "Guatemala is one of five countries where we have delivered work. Religious commissions also demand the highest level of client trust.",
        },
      ],
    },
  },
  // ── Portafolio internacional del brochure de marca (MDH Brand Presentation).
  // Nombre y ubicación son los que publica la empresa; el año y los acabados
  // suministrados quedan pendientes de la memoria técnica de Antonella.
  {
    slug: "taylorsville-utah-temple",
    titulo: "Taylorsville Utah Temple",
    lugar: "Taylorsville, Utah",
    pais: "Estados Unidos",
    categoria: "Religioso",
    resumen:
      "Templo en Utah revestido con piedra natural fabricada en Honduras y exportada a Estados Unidos.",
    imagen: fotoTaylorsville,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoTaylorsville],
    en: {
      pais: "United States",
      resumen:
        "A temple in Utah clad in natural stone fabricated in Honduras and exported to the United States.",
    },
  },
  {
    slug: "public-safety-building-winter-park",
    titulo: "Public Safety Building",
    lugar: "Winter Park, Florida",
    pais: "Estados Unidos",
    categoria: "Institucional",
    resumen:
      "Edificio institucional en Winter Park con fachada y elementos en piedra natural exportada desde Honduras.",
    imagen: fotoPublicSafety,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoPublicSafety],
    en: {
      pais: "United States",
      resumen:
        "A civic building in Winter Park with a façade and elements in natural stone exported from Honduras.",
    },
  },
  {
    slug: "1500-ponce-de-leon",
    titulo: "1500 Ponce de León Blvd",
    lugar: "Coral Gables, Florida",
    pais: "Estados Unidos",
    categoria: "Comercial",
    resumen:
      "Portal y enmarcados en piedra labrada para un edificio en Coral Gables.",
    imagen: fotoPonceLeon,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoPonceLeon],
    en: {
      pais: "United States",
      resumen: "Carved stone portal and surrounds for a building in Coral Gables.",
    },
  },
  {
    slug: "225-e-hannibal-square",
    titulo: "225 E Hannibal Square",
    lugar: "Winter Park, Florida",
    pais: "Estados Unidos",
    categoria: "Comercial",
    resumen: "Obra comercial en Hannibal Square, dentro del portafolio de exportación a Florida.",
    imagen: fotoHannibalSquare,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoHannibalSquare],
    en: {
      pais: "United States",
      resumen: "A commercial project on Hannibal Square, part of the Florida export portfolio.",
    },
  },
  {
    slug: "hannibal-square-park",
    titulo: "Hannibal Square Park",
    lugar: "Winter Park, Florida",
    pais: "Estados Unidos",
    categoria: "Institucional",
    resumen: "Monumento conmemorativo en piedra natural para un parque público de Winter Park.",
    imagen: fotoHannibalPark,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoHannibalPark],
    en: {
      pais: "United States",
      resumen: "A natural stone memorial for a public park in Winter Park.",
    },
  },
  {
    slug: "411-w-new-england",
    titulo: "411 W New England",
    lugar: "Winter Park, Florida",
    pais: "Estados Unidos",
    categoria: "Comercial",
    resumen: "Edificio de uso mixto con fachada en piedra natural, en el centro de Winter Park.",
    imagen: fotoNewEngland,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoNewEngland],
    en: {
      pais: "United States",
      resumen: "A mixed-use building with a natural stone façade in downtown Winter Park.",
    },
  },
  {
    slug: "residencia-la-gorce-island",
    titulo: "Residencia privada, La Gorce Island",
    lugar: "Miami Beach, Florida",
    pais: "Estados Unidos",
    categoria: "Residencial",
    resumen:
      "Galería exterior con columnas, arcos y pisos en piedra natural frente a la bahía.",
    imagen: fotoLaGorce,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoLaGorce],
    en: {
      titulo: "Private residence, La Gorce Island",
      pais: "United States",
      resumen: "A bayfront loggia with natural stone columns, arches and floors.",
    },
  },
  {
    slug: "residencia-cocoplum",
    titulo: "Residencia privada, Cocoplum",
    lugar: "Miami, Florida",
    pais: "Estados Unidos",
    categoria: "Residencial",
    resumen: "Balaustradas, gradas y bordes de piscina tallados en piedra natural.",
    imagen: fotoCocoplum,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoCocoplum],
    en: {
      titulo: "Private residence, Cocoplum",
      pais: "United States",
      resumen: "Balustrades, steps and pool coping carved in natural stone.",
    },
  },
  {
    slug: "residencia-windermere",
    titulo: "Residencia privada, Windermere",
    lugar: "Orlando, Florida",
    pais: "Estados Unidos",
    categoria: "Residencial",
    resumen:
      "Chimenea y campana de cocina talladas a mano, fabricadas pieza por pieza en planta.",
    imagen: fotoWindermere,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoWindermere, fotoWindermereCampana],
    fotos: [fotoWindermere, fotoWindermereCampana],
    en: {
      titulo: "Private residence, Windermere",
      pais: "United States",
      resumen: "A hand-carved fireplace and kitchen hood, fabricated piece by piece at the plant.",
    },
  },
  {
    slug: "residencia-ritz-carlton-tiburon",
    titulo: "Residencia privada, Ritz-Carlton Tiburón",
    lugar: "Naples, Florida",
    pais: "Estados Unidos",
    categoria: "Residencial",
    resumen: "Escalera curva con balaustrada calada, tallada en piedra natural.",
    imagen: fotoRitzTiburon,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoRitzTiburon],
    en: {
      titulo: "Private residence, Ritz-Carlton Tiburón",
      pais: "United States",
      resumen: "A curved staircase with a pierced balustrade, carved in natural stone.",
    },
  },
  {
    slug: "capilla-alamar",
    titulo: "Capilla Alamar",
    lugar: "San Salvador",
    pais: "El Salvador",
    categoria: "Religioso",
    resumen: "Altar, relieves y mausoleo en mármol para una capilla en San Salvador.",
    imagen: fotoAlamar,
    alcance: [],
    materiales: [],
    contenido: [],
    galeria: [fotoAlamar],
    en: {
      titulo: "Alamar Chapel",
      resumen: "Marble altar, reliefs and mausoleum for a chapel in San Salvador.",
    },
  },
];

export type Servicio = {
  titulo: string;
  detalle: string;
  en?: Partial<Servicio>;
};

export const servicios: Servicio[] = [
  {
    titulo: "Fabricación",
    detalle:
      "Corte, calibrado y pulido en planta propia con control de calidad en cada lote de piedra.",
    en: {
      titulo: "Fabrication",
      detalle:
        "Cutting, calibrating, and polishing in our own plant, with quality control on every stone lot.",
    },
  },
  {
    titulo: "Corte a medida",
    detalle:
      "Despiece digital y plantillas en sitio para lograr vetas continuas y juntas mínimas.",
    en: {
      titulo: "Custom cutting",
      detalle:
        "Digital layout and on-site templating to achieve continuous veining and minimal joints.",
    },
  },
  {
    titulo: "Instalación",
    detalle:
      "Equipos propios de montaje para pisos, revestimientos, fachadas y piezas especiales.",
    en: {
      titulo: "Installation",
      detalle:
        "Our own installation crews for flooring, cladding, façades, and special pieces.",
    },
  },
  {
    titulo: "Distribución",
    detalle:
      "Abastecimiento de piedra natural y acabados de construcción a nivel nacional e internacional.",
    en: {
      titulo: "Distribution",
      detalle:
        "Sourcing and supply of natural stone and construction finishes, nationally and internationally.",
    },
  },
];

export type PasoProceso = {
  paso: string;
  titulo: string;
  detalle: string;
  en?: Partial<PasoProceso>;
};

export const proceso: PasoProceso[] = [
  {
    paso: "01",
    titulo: "Selección del bloque",
    detalle:
      "Elegimos el material en cantera o en nuestro inventario, revisando tono, veta y comportamiento estructural.",
    en: {
      titulo: "Block selection",
      detalle:
        "We choose the material at the quarry or in our own inventory, reviewing tone, veining, and structural behavior.",
    },
  },
  {
    paso: "02",
    titulo: "Despiece y plantilla",
    detalle:
      "Levantamos medidas reales en obra y modelamos el despiece pieza por pieza antes de cortar.",
    en: {
      titulo: "Layout and templating",
      detalle:
        "We take real measurements on site and model the piece-by-piece layout before cutting.",
    },
  },
  {
    paso: "03",
    titulo: "Fabricación en planta",
    detalle:
      "Corte, calibrado, pulido y control de calidad en cada lote, con pre-ensamble en seco cuando el proyecto lo exige.",
    en: {
      titulo: "In-plant fabrication",
      detalle:
        "Cutting, calibrating, polishing, and quality control on every lot, with dry pre-assembly when the project requires it.",
    },
  },
  {
    paso: "04",
    titulo: "Instalación y entrega",
    detalle:
      "Equipos propios de montaje, limpieza final, sellado y plan de mantenimiento para el cliente.",
    en: {
      titulo: "Installation and handover",
      detalle:
        "Our own installation crews, final cleaning, sealing, and a maintenance plan for the client.",
    },
  },
];

export type Pieza = {
  slug: string;
  nombre: string;
  detalle: string;
  imagen: string;
  en?: Partial<Pieza>;
};

/** Piezas especiales a medida — "tú lo imaginas, nosotros lo hacemos realidad". */
export const piezas: Pieza[] = [
  {
    slug: "detalles-arquitectonicos",
    nombre: "Detalles arquitectónicos",
    detalle:
      "Cornisas, molduras, capiteles y remates tallados con maquinaria especializada y ajuste manual final.",
    imagen: piezaDetalles,
    en: {
      nombre: "Architectural details",
      detalle:
        "Cornices, moldings, capitals, and finials carved with specialized machinery and finished by hand.",
    },
  },
  {
    slug: "bustos",
    nombre: "Bustos y esculturas",
    detalle:
      "Nuestros escultores convierten en piedra el rostro de alguien querido o de una figura emblemática.",
    imagen: piezaBustos,
    en: {
      nombre: "Busts and sculptures",
      detalle:
        "Our sculptors turn the face of a loved one or an iconic figure into stone.",
    },
  },
  {
    slug: "escaleras",
    nombre: "Escaleras y barandas",
    detalle:
      "Huellas, contrahuellas, balaustres y pasamanos fabricados a medida para cada geometría.",
    imagen: piezaEscaleras,
    en: {
      nombre: "Staircases and railings",
      detalle:
        "Treads, risers, balusters, and handrails custom fabricated for each geometry.",
    },
  },
  {
    slug: "chimeneas",
    nombre: "Chimeneas",
    detalle:
      "Sea por estilo o por calor: fabricamos el marco de tu chimenea a la medida y con el detalle que quieras.",
    imagen: piezaChimeneas,
    en: {
      nombre: "Fireplaces",
      detalle:
        "Whether for style or for warmth, we fabricate your fireplace surround to measure, with any detail you want.",
    },
  },
  {
    slug: "columnas",
    nombre: "Columnas",
    detalle:
      "Estructurales o decorativas, torneadas en piedra natural con el fuste y capitel que necesite el proyecto.",
    imagen: piezaColumnas,
    en: {
      nombre: "Columns",
      detalle:
        "Structural or decorative, turned in natural stone with whatever shaft and capital the project calls for.",
    },
  },
  {
    slug: "tronos-bancas",
    nombre: "Tronos y bancas",
    detalle:
      "Para la sala, la oficina o un espacio público: mobiliario tallado en bloque macizo.",
    imagen: piezaBancas,
    en: {
      nombre: "Thrones and benches",
      detalle:
        "For the living room, the office, or a public space: furniture carved from a solid block.",
    },
  },
  {
    slug: "tinas",
    nombre: "Tinas de baño",
    detalle:
      "Existen tinas de acrílico, pero nada se compara con una bañera excavada en piedra natural.",
    imagen: piezaTinas,
    en: {
      nombre: "Bathtubs",
      detalle:
        "Acrylic tubs exist, but nothing compares to a bathtub hollowed out of natural stone.",
    },
  },
  {
    slug: "solarium",
    nombre: "Sillas de asoleo",
    detalle:
      "Camastros esculpidos con la curva exacta para descansar al sol con la mejor postura.",
    imagen: piezaSolarium,
    en: {
      nombre: "Sun loungers",
      detalle:
        "Loungers sculpted with the exact curve to rest in the sun with the best posture.",
    },
  },
];

/** Contacto directo. Reemplazar por el número real de la empresa. */
export const WHATSAPP_NUMERO = "50400000000";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(
  "Hola, me gustaría cotizar un proyecto en piedra natural.",
)}`;
