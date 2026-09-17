import { getAllCountries } from "./country-metadata.js";

/** @typedef {'GB'|'FR'|'NL'|'BE'|'SE'|'DE'|'US'|'JP'|'CA'|'AU'} EmsCountryCode */

const STREET_EN =
  /\b(street|st|road|rd|avenue|ave|boulevard|blvd|drive|dr|lane|ln|way|place|pl|court|ct|square|sq|highway|hwy|terrace|close|crescent|loop|parkway|pkwy|trail|circle|unit|apt|suite|floor|bldg|building|po box|pobox)\b/i;

const STREET_FR =
  /\b(rue|avenue|blvd|boulevard|allee|chemin|place|impasse|route|quai|cours|passage|rond point|cite|villa)\b/i;

const STREET_DE =
  /(strasse|strabe|\bstr\b|weg|platz|allee|ring|gasse|damm|ufer|chaussee)/i;

const STREET_NL =
  /(straat|laan|weg|plein|gracht|kade|steeg|dreef|singel|dijk)/i;

const STREET_SE =
  /(gatan|gata|vagen|vag|torg|plan|grand|stig)/i;

const STREET_ES =
  /\b(calle|avenida|avda|av|paseo|plaza|pl|camino|travesia|ronda|via|c)\b/i;

const STREET_PT =
  /\b(rua|avenida|avda|av|praca|praceta|largo|travessa|calcada|estrada|alameda|r)\b/i;

const STREET_IT =
  /\b(via|viale|corso|piazza|piazzale|largo|strada|vicolo|v|c)\b/i;

const STREET_DK =
  /(vej|gade|alle|plads|strade|vang|boulevard|torv)/i;

const STREET_NO =
  /(gate|vei|veg|alle|plass|veien|gata|gt|v)/i;

const STREET_FI =
  /(katu|tie|polku|kuja|tori|aukio|puisto|raitti)/i;

const STREET_PL =
  /\b(ulica|ul|aleja|al|plac|pl|osiedle|os)\b/i;

const STREET_TR =
  /\b(sokak|sok|cadde|cad|bulvar|blv|meydani|mah|mahallesi)\b/i;

const STREET_CN =
  /\b(road|rd|street|st|avenue|ave|lu|jie|dao|xiang|alley|lane|building|bldg|tower|floor|dong|xi|nan|bei)\b/i;

const STREET_TH =
  /\b(thanon|tn|soi|trok|yaek|alley|moo|building|floor|road|rd|street|st)\b/i;

const STREET_JP =
  /\b(chome|banchi|ban|go|building|mansion|apartment|apt|tower|floor|fu|ken|to|do|shi|ku|cho|machi|mura|gun)\b/i;

const US_STATES =
  "AL|AK|AZ|AR|CA|CO|CT|DC|DE|FL|GA|HI|IA|ID|IL|IN|KS|KY|LA|MA|MD|ME|MI|MN|MO|MS|MT|NC|ND|NE|NH|NJ|NM|NV|NY|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VA|VT|WA|WI|WV|WY";

const CA_PROVINCES = "AB|BC|MB|NB|NL|NS|NT|NU|ON|PE|QC|SK|YT";

const AU_STATES = "NSW|VIC|QLD|SA|WA|TAS|NT|ACT";

const ES_PROVINCES = [
  "A Coruna",
  "Alava",
  "Albacete",
  "Alicante",
  "Almeria",
  "Asturias",
  "Avila",
  "Badajoz",
  "Barcelona",
  "Burgos",
  "Caceres",
  "Cadiz",
  "Cantabria",
  "Castellon",
  "Ceuta",
  "Ciudad Real",
  "Cordoba",
  "Cuenca",
  "Girona",
  "Granada",
  "Guadalajara",
  "Guipuzcoa",
  "Huelva",
  "Huesca",
  "Islas Baleares",
  "Jaen",
  "La Rioja",
  "Las Palmas",
  "Leon",
  "Lleida",
  "Lugo",
  "Madrid",
  "Malaga",
  "Melilla",
  "Murcia",
  "Navarra",
  "Ourense",
  "Palencia",
  "Pontevedra",
  "Salamanca",
  "Santa Cruz de Tenerife",
  "Segovia",
  "Sevilla",
  "Soria",
  "Tarragona",
  "Teruel",
  "Toledo",
  "Valencia",
  "Valladolid",
  "Vizcaya",
  "Zamora",
  "Zaragoza",
].join("|");

const IT_PROVINCES = [
  "Agrigento",
  "Alessandria",
  "Ancona",
  "Aosta",
  "Arezzo",
  "Ascoli Piceno",
  "Asti",
  "Avellino",
  "Bari",
  "Barletta Andria Trani",
  "Belluno",
  "Benevento",
  "Bergamo",
  "Biella",
  "Bologna",
  "Bolzano",
  "Brescia",
  "Brindisi",
  "Cagliari",
  "Caltanissetta",
  "Campobasso",
  "Caserta",
  "Catania",
  "Catanzaro",
  "Chieti",
  "Como",
  "Cosenza",
  "Cremona",
  "Crotone",
  "Cuneo",
  "Enna",
  "Fermo",
  "Ferrara",
  "Firenze",
  "Foggia",
  "Forli Cesena",
  "Frosinone",
  "Genova",
  "Gorizia",
  "Grosseto",
  "Imperia",
  "Isernia",
  "L Aquila",
  "La Spezia",
  "Latina",
  "Lecce",
  "Lecco",
  "Livorno",
  "Lodi",
  "Lucca",
  "Macerata",
  "Mantova",
  "Massa Carrara",
  "Matera",
  "Messina",
  "Milano",
  "Modena",
  "Monza Brianza",
  "Napoli",
  "Novara",
  "Nuoro",
  "Oristano",
  "Padova",
  "Palermo",
  "Parma",
  "Pavia",
  "Perugia",
  "Pesaro Urbino",
  "Pescara",
  "Piacenza",
  "Pisa",
  "Pistoia",
  "Pordenone",
  "Potenza",
  "Prato",
  "Ragusa",
  "Ravenna",
  "Reggio Calabria",
  "Reggio Emilia",
  "Rieti",
  "Rimini",
  "Roma",
  "Rovigo",
  "Salerno",
  "Sassari",
  "Savona",
  "Siena",
  "Siracusa",
  "Sondrio",
  "Sud Sardegna",
  "Taranto",
  "Teramo",
  "Terni",
  "Torino",
  "Trapani",
  "Trento",
  "Treviso",
  "Trieste",
  "Udine",
  "Varese",
  "Venezia",
  "Verbano Cusio Ossola",
  "Vercelli",
  "Verona",
  "Vibo Valentia",
  "Vicenza",
  "Viterbo",
].join("|");

const PT_DISTRICTS = [
  "Aveiro",
  "Beja",
  "Braga",
  "Braganca",
  "Castelo Branco",
  "Coimbra",
  "Evora",
  "Faro",
  "Guarda",
  "Leiria",
  "Lisboa",
  "Portalegre",
  "Porto",
  "Santarem",
  "Setubal",
  "Viana do Castelo",
  "Vila Real",
  "Viseu",
  "Acores",
  "Madeira",
].join("|");

const BR_STATES =
  "AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RN|RS|RO|RR|SC|SP|SE|TO";

const MX_STATES = [
  "Aguascalientes",
  "Baja California",
  "Baja California Sur",
  "Campeche",
  "Chiapas",
  "Chihuahua",
  "Coahuila",
  "Colima",
  "Durango",
  "Guanajuato",
  "Guerrero",
  "Hidalgo",
  "Jalisco",
  "Mexico",
  "Michoacan",
  "Morelos",
  "Nayarit",
  "Nuevo Leon",
  "Oaxaca",
  "Puebla",
  "Queretaro",
  "Quintana Roo",
  "San Luis Potosi",
  "Sinaloa",
  "Sonora",
  "Tabasco",
  "Tamaulipas",
  "Tlaxcala",
  "Veracruz",
  "Yucatan",
  "Zacatecas",
  "Ciudad de Mexico",
].join("|");

const CH_CANTONS = "AG|AI|AR|BE|BL|BS|FR|GE|GL|GR|JU|LU|NE|NW|OW|SG|SH|SO|SZ|TG|TI|UR|VD|VS|ZG|ZH";

const IN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
].join("|");

const CN_PROVINCES = [
  "Beijing",
  "Tianjin",
  "Shanghai",
  "Chongqing",
  "Hebei",
  "Shanxi",
  "Liaoning",
  "Jilin",
  "Heilongjiang",
  "Jiangsu",
  "Zhejiang",
  "Anhui",
  "Fujian",
  "Jiangxi",
  "Shandong",
  "Henan",
  "Hubei",
  "Hunan",
  "Guangdong",
  "Hainan",
  "Sichuan",
  "Guizhou",
  "Yunnan",
  "Shaanxi",
  "Gansu",
  "Qinghai",
  "Taiwan",
  "Inner Mongolia",
  "Guangxi",
  "Tibet",
  "Ningxia",
  "Xinjiang",
  "Hong Kong",
  "Macau",
].join("|");

const TH_PROVINCES = [
  "Bangkok",
  "Samut Prakan",
  "Nonthaburi",
  "Pathum Thani",
  "Phra Nakhon Si Ayutthaya",
  "Ang Thong",
  "Lopburi",
  "Sing Buri",
  "Chai Nat",
  "Saraburi",
  "Chon Buri",
  "Rayong",
  "Chanthaburi",
  "Trat",
  "Chachoengsao",
  "Prachin Buri",
  "Nakhon Nayok",
  "Sa Kaeo",
  "Nakhon Ratchasima",
  "Buri Ram",
  "Surin",
  "Si Sa Ket",
  "Ubon Ratchathani",
  "Yasothon",
  "Chaiyaphum",
  "Amnat Charoen",
  "Bueng Kan",
  "Nong Bua Lam Phu",
  "Khon Kaen",
  "Udon Thani",
  "Loei",
  "Nong Khai",
  "Maha Sarakham",
  "Roi Et",
  "Kalasin",
  "Sakon Nakhon",
  "Nakhon Phanom",
  "Mukdahan",
  "Chiang Mai",
  "Lamphun",
  "Lampang",
  "Uttaradit",
  "Phrae",
  "Nan",
  "Phayao",
  "Chiang Rai",
  "Mae Hong Son",
  "Nakhon Sawan",
  "Uthai Thani",
  "Kamphaeng Phet",
  "Tak",
  "Sukhothai",
  "Phitsanulok",
  "Phichit",
  "Phetchabun",
  "Ratchaburi",
  "Kanchanaburi",
  "Suphan Buri",
  "Nakhon Pathom",
  "Samut Sakhon",
  "Samut Songkhram",
  "Phetchaburi",
  "Prachuap Khiri Khan",
  "Nakhon Si Thammarat",
  "Krabi",
  "Phangnga",
  "Phuket",
  "Surat Thani",
  "Ranong",
  "Chumphon",
  "Songkhla",
  "Satun",
  "Trang",
  "Phatthalung",
  "Pattani",
  "Yala",
  "Narathiwat",
].join("|");

const JP_PREFECTURES = [
  "Hokkaido",
  "Aomori",
  "Iwate",
  "Miyagi",
  "Akita",
  "Yamagata",
  "Fukushima",
  "Ibaraki",
  "Tochigi",
  "Gunma",
  "Saitama",
  "Chiba",
  "Tokyo",
  "Kanagawa",
  "Niigata",
  "Toyama",
  "Ishikawa",
  "Fukui",
  "Yamanashi",
  "Nagano",
  "Gifu",
  "Shizuoka",
  "Aichi",
  "Mie",
  "Shiga",
  "Kyoto",
  "Osaka",
  "Hyogo",
  "Nara",
  "Wakayama",
  "Tottori",
  "Shimane",
  "Okayama",
  "Hiroshima",
  "Yamaguchi",
  "Tokushima",
  "Kagawa",
  "Ehime",
  "Kochi",
  "Fukuoka",
  "Saga",
  "Nagasaki",
  "Kumamoto",
  "Oita",
  "Miyazaki",
  "Kagoshima",
  "Okinawa",
].join("|");

/**
 * Country rules operate on sanitized ASCII text (hyphens already spaces).
 * `extract` finds a postal code; `validate` matches postcode-validator after format.
 */
export const COUNTRY_RULES = {
  GB: {
    iso: "GB",
    emsName: "UNITED KINGDOM",
    nameEn: "United Kingdom",
    nameKo: "영국",
    extract: /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i,
    validate: /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  FR: {
    iso: "FR",
    emsName: "FRANCE",
    nameEn: "France",
    nameKo: "프랑스",
    extract: /\b\d{5}\b/,
    validate: /^\d{2}\s?\d{3}$/,
    street: STREET_FR,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  NL: {
    iso: "NL",
    emsName: "NETHERLANDS",
    nameEn: "Netherlands",
    nameKo: "네덜란드",
    extract: /\b\d{4}\s*[A-Z]{2}\b/i,
    validate: /^\d{4}\s?[A-Z]{2}$/i,
    street: STREET_NL,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  BE: {
    iso: "BE",
    emsName: "BELGIUM",
    nameEn: "Belgium",
    nameKo: "벨기에",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: new RegExp(`${STREET_FR.source}|${STREET_NL.source}|${STREET_EN.source}`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  SE: {
    iso: "SE",
    emsName: "SWEDEN",
    nameEn: "Sweden",
    nameKo: "스웨덴",
    extract: /\b(?:SE\s*)?\d{3}\s+\d{2}\b/i,
    validate: /^(SE-?)?\d{3}\s?\d{2}$/i,
    street: STREET_SE,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  DE: {
    iso: "DE",
    emsName: "GERMANY",
    nameEn: "Germany",
    nameKo: "독일",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  US: {
    iso: "US",
    emsName: "UNITED STATES",
    nameEn: "United States",
    nameKo: "미국",
    extract: /\b\d{5}(?:\s+\d{4})?\b/,
    validate: /^\d{5}(?:-?\d{4})?$/,
    street: STREET_EN,
    state: new RegExp(`\\b(${US_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  JP: {
    iso: "JP",
    emsName: "JAPAN",
    nameEn: "Japan",
    nameKo: "일본",
    extract: /\b\d{3}\s+\d{4}\b|\b\d{7}\b/,
    validate: /^\d{3}-?\d{4}$/,
    street: STREET_JP,
    state: new RegExp(`\\b(${JP_PREFECTURES})\\b`, "i"),
    cityLine: /\b(shi|ku|cho|machi|mura|gun|city|ward)\b/i,
  },
  CA: {
    iso: "CA",
    emsName: "CANADA",
    nameEn: "Canada",
    nameKo: "캐나다",
    extract: /\b[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s*\d[ABCEGHJ-NPRSTV-Z]\d\b/i,
    validate: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s*\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    street: STREET_EN,
    state: new RegExp(`\\b(${CA_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  AU: {
    iso: "AU",
    emsName: "AUSTRALIA",
    nameEn: "Australia",
    nameKo: "호주",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_EN,
    state: new RegExp(`\\b(${AU_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  ES: {
    iso: "ES",
    emsName: "SPAIN",
    nameEn: "Spain",
    nameKo: "스페인",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_ES,
    state: new RegExp(`\\b(${ES_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  PT: {
    iso: "PT",
    emsName: "PORTUGAL",
    nameEn: "Portugal",
    nameKo: "포르투갈",
    extract: /\b\d{4}\s*\d{3}\b/,
    validate: /^\d{4}-?\d{3}$/,
    street: STREET_PT,
    state: new RegExp(`\\b(${PT_DISTRICTS})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  IT: {
    iso: "IT",
    emsName: "ITALY",
    nameEn: "Italy",
    nameKo: "이탈리아",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_IT,
    state: new RegExp(`\\b(${IT_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  IE: {
    iso: "IE",
    emsName: "IRELAND",
    nameEn: "Ireland",
    nameKo: "아일랜드",
    extract: /\b[A-Z]\d{2}\s*[A-Z0-9]{4}\b/i,
    validate: /^[A-Z]\d{2}\s?[A-Z0-9]{4}$/i,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  AT: {
    iso: "AT",
    emsName: "AUSTRIA",
    nameEn: "Austria",
    nameKo: "오스트리아",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  CH: {
    iso: "CH",
    emsName: "SWITZERLAND",
    nameEn: "Switzerland",
    nameKo: "스위스",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: new RegExp(`${STREET_DE.source}|${STREET_FR.source}|${STREET_IT.source}`, "i"),
    state: new RegExp(`\\b(${CH_CANTONS})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  DK: {
    iso: "DK",
    emsName: "DENMARK",
    nameEn: "Denmark",
    nameKo: "덴마크",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_DK,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  NO: {
    iso: "NO",
    emsName: "NORWAY",
    nameEn: "Norway",
    nameKo: "노르웨이",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_NO,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  FI: {
    iso: "FI",
    emsName: "FINLAND",
    nameEn: "Finland",
    nameKo: "핀란드",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_FI,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  IS: {
    iso: "IS",
    emsName: "ICELAND",
    nameEn: "Iceland",
    nameKo: "아이슬란드",
    extract: /\b\d{3}\b/,
    validate: /^\d{3}$/,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  PL: {
    iso: "PL",
    emsName: "POLAND",
    nameEn: "Poland",
    nameKo: "폴란드",
    extract: /\b\d{2}\s*\d{3}\b/,
    validate: /^\d{2}-?\d{3}$/,
    street: STREET_PL,
    cityLine: /^[A-Z][A-Z\s\-]+$/i,
  },
  NZ: {
    iso: "NZ",
    emsName: "NEW ZEALAND",
    nameEn: "New Zealand",
    nameKo: "뉴질랜드",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  MX: {
    iso: "MX",
    emsName: "MEXICO",
    nameEn: "Mexico",
    nameKo: "멕시코",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_ES,
    state: new RegExp(`\\b(${MX_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  SG: {
    iso: "SG",
    emsName: "SINGAPORE",
    nameEn: "Singapore",
    nameKo: "싱가포르",
    extract: /\b\d{6}\b/,
    validate: /^\d{6}$/,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  IL: {
    iso: "IL",
    emsName: "ISRAEL",
    nameEn: "Israel",
    nameKo: "이스라엘",
    extract: /\b\d{7}\b/,
    validate: /^\d{7}$/,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  TR: {
    iso: "TR",
    emsName: "TURKEY",
    nameEn: "Turkey",
    nameKo: "튀르키예",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_TR,
    cityLine: /^[A-Z][A-Z\s]+$/i,
  },
  IN: {
    iso: "IN",
    emsName: "INDIA",
    nameEn: "India",
    nameKo: "인도",
    extract: /\b\d{6}\b/,
    validate: /^\d{6}$/,
    street: STREET_EN,
    state: new RegExp(`\\b(${IN_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  CN: {
    iso: "CN",
    emsName: "CHINA",
    nameEn: "China",
    nameKo: "중국",
    extract: /\b\d{6}\b/,
    validate: /^\d{6}$/,
    street: STREET_CN,
    state: new RegExp(`\\b(${CN_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  TH: {
    iso: "TH",
    emsName: "THAILAND",
    nameEn: "Thailand",
    nameKo: "태국",
    extract: /\b\d{5}\b/,
    validate: /^\d{5}$/,
    street: STREET_TH,
    state: new RegExp(`\\b(${TH_PROVINCES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  CZ: {
    iso: "CZ",
    emsName: "CZECH REPUBLIC",
    nameEn: "Czech Republic",
    nameKo: "체코",
    extract: /\b\d{3}\s*\d{2}\b/,
    validate: /^\d{3}\s?\d{2}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  SK: {
    iso: "SK",
    emsName: "SLOVAKIA",
    nameEn: "Slovakia",
    nameKo: "슬로바키아",
    extract: /\b\d{3}\s*\d{2}\b/,
    validate: /^\d{3}\s?\d{2}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  HU: {
    iso: "HU",
    emsName: "HUNGARY",
    nameEn: "Hungary",
    nameKo: "헝가리",
    extract: /\b\d{4}\b/,
    validate: /^\d{4}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  RO: {
    iso: "RO",
    emsName: "ROMANIA",
    nameEn: "Romania",
    nameKo: "루마니아",
    extract: /\b\d{6}\b/,
    validate: /^\d{6}$/,
    street: STREET_DE,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  GR: {
    iso: "GR",
    emsName: "GREECE",
    nameEn: "Greece",
    nameKo: "그리스",
    extract: /\b\d{3}\s*\d{2}\b/,
    validate: /^\d{3}\s?\d{2}$/,
    street: STREET_EN,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  BR: {
    iso: "BR",
    emsName: "BRAZIL",
    nameEn: "Brazil",
    nameKo: "브라질",
    extract: /\b\d{5}\s*-?\s*\d{3}\b/,
    validate: /^\d{5}-?\d{3}$/,
    street: STREET_PT,
    state: new RegExp(`\\b(${BR_STATES})\\b`, "i"),
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  AR: {
    iso: "AR",
    emsName: "ARGENTINA",
    nameEn: "Argentina",
    nameKo: "아르헨티나",
    extract: /\b([A-Z]\d{4}[A-Z]{3}|\d{4})\b/i,
    validate: /^([A-Z]\d{4}[A-Z]{3}|\d{4})$/i,
    street: STREET_ES,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
  CL: {
    iso: "CL",
    emsName: "CHILE",
    nameEn: "Chile",
    nameKo: "칠레",
    extract: /\b\d{7}\b/,
    validate: /^\d{7}$/,
    street: STREET_ES,
    cityLine: /^[A-Z][A-Z\s\-']+$/i,
  },
};

export const COUNTRY_LIST = getAllCountries(COUNTRY_RULES);

/** @param {string} code */
export function getCountryRule(code) {
  const key = String(code ?? "").toUpperCase();
  return COUNTRY_RULES[key] ?? null;
}

/**
 * Rebuild EMS-friendly postal formatting after sanitizer stripped hyphens.
 * @param {string} raw
 * @param {EmsCountryCode} country
 */
export function formatPostalCode(raw, country) {
  const compact = String(raw ?? "")
    .toUpperCase()
    .replace(/\s+/g, " ")
    .trim();
  const digits = compact.replace(/\D/g, "");

  switch (country) {
    case "US":
      if (digits.length >= 9) return `${digits.slice(0, 5)}-${digits.slice(5, 9)}`;
      return digits.slice(0, 5);
    case "JP":
      if (digits.length >= 7) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
      return compact;
    case "GB": {
      const glued = compact.replace(/\s+/g, "");
      if (glued.length < 5) return compact;
      return `${glued.slice(0, -3)} ${glued.slice(-3)}`;
    }
    case "CA": {
      const glued = compact.replace(/\s+/g, "");
      if (glued.length < 6) return compact;
      return `${glued.slice(0, 3)} ${glued.slice(3, 6)}`;
    }
    case "NL": {
      const glued = compact.replace(/\s+/g, "");
      const match = glued.match(/^(\d{4})([A-Z]{2})$/);
      return match ? `${match[1]} ${match[2]}` : compact;
    }
    case "SE": {
      const last5 = digits.slice(-5);
      if (last5.length === 5) return `${last5.slice(0, 3)} ${last5.slice(3)}`;
      return compact;
    }
    case "PT": {
      if (digits.length >= 7) return `${digits.slice(0, 4)}-${digits.slice(4, 7)}`;
      return compact;
    }
    case "PL": {
      if (digits.length >= 5) return `${digits.slice(0, 2)}-${digits.slice(2, 5)}`;
      return compact;
    }
    case "BR": {
      if (digits.length >= 8) return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
      return compact;
    }
    case "CZ":
    case "SK":
    case "GR": {
      if (digits.length >= 5) return `${digits.slice(0, 3)} ${digits.slice(3, 5)}`;
      return compact;
    }
    case "IE": {
      const cleaned = compact.replace(/\s+/g, "");
      if (cleaned.length >= 7) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      return compact;
    }
    case "FR":
    case "DE":
    case "BE":
    case "AU":
    case "ES":
    case "IT":
    case "AT":
    case "CH":
    case "DK":
    case "NO":
    case "FI":
    case "IS":
    case "NZ":
    case "MX":
    case "HU":
    case "RO":
    case "CL":
    case "AR":
      return digits;
    default:
      return compact;
  }
}

/** GB outward-code prefix → county / nation region (EMS State field). */
const GB_OUTCODE_STATE = {
  EH: "SCOTLAND",
  G: "SCOTLAND",
  AB: "SCOTLAND",
  DD: "SCOTLAND",
  FK: "SCOTLAND",
  IV: "SCOTLAND",
  KA: "SCOTLAND",
  KW: "SCOTLAND",
  KY: "SCOTLAND",
  PA: "SCOTLAND",
  PH: "SCOTLAND",
  TD: "SCOTLAND",
  ZE: "SCOTLAND",
  CF: "WALES",
  LD: "WALES",
  LL: "WALES",
  NP: "WALES",
  SA: "WALES",
  SY: "WALES",
  BT: "NORTHERN IRELAND",
  TW: "GREATER LONDON",
  SW: "GREATER LONDON",
  SE: "GREATER LONDON",
  W: "GREATER LONDON",
  WC: "GREATER LONDON",
  EC: "GREATER LONDON",
  E: "GREATER LONDON",
  N: "GREATER LONDON",
  NW: "GREATER LONDON",
  EN: "GREATER LONDON",
  HA: "GREATER LONDON",
  UB: "GREATER LONDON",
  IG: "GREATER LONDON",
  RM: "GREATER LONDON",
  KT: "GREATER LONDON",
  SM: "GREATER LONDON",
  CR: "GREATER LONDON",
  DA: "GREATER LONDON",
  BR: "GREATER LONDON",
  WD: "GREATER LONDON",
  B: "WEST MIDLANDS",
  M: "GREATER MANCHESTER",
  L: "MERSEYSIDE",
  LS: "WEST YORKSHIRE",
  S: "SOUTH YORKSHIRE",
  BS: "BRISTOL",
  EH1: "SCOTLAND",
};

/** FR département (first 2 digits) → department name. */
const FR_DEPT_STATE = {
  "10": "AUBE",
  "13": "BOUCHES DU RHONE",
  "31": "HAUTE GARONNE",
  "33": "GIRONDE",
  "38": "ISERE",
  "44": "LOIRE ATLANTIQUE",
  "59": "NORD",
  "69": "RHONE",
  "75": "PARIS",
  "92": "HAUTS DE SEINE",
  "93": "SEINE SAINT DENIS",
  "94": "VAL DE MARNE",
};

/** ES provincia (first 2 digits) → province. */
const ES_POSTAL_PREFIX = {
  "01": "Alava",
  "02": "Albacete",
  "03": "Alicante",
  "04": "Almeria",
  "05": "Avila",
  "06": "Badajoz",
  "07": "Islas Baleares",
  "08": "Barcelona",
  "09": "Burgos",
  "10": "Caceres",
  "11": "Cadiz",
  "12": "Castellon",
  "13": "Ciudad Real",
  "14": "Cordoba",
  "15": "A Coruna",
  "16": "Cuenca",
  "17": "Girona",
  "18": "Granada",
  "19": "Guadalajara",
  "20": "Guipuzcoa",
  "21": "Huelva",
  "22": "Huesca",
  "23": "Jaen",
  "24": "Leon",
  "25": "Lleida",
  "26": "La Rioja",
  "27": "Lugo",
  "28": "Madrid",
  "29": "Malaga",
  "30": "Murcia",
  "31": "Navarra",
  "32": "Ourense",
  "33": "Asturias",
  "34": "Palencia",
  "35": "Las Palmas",
  "36": "Pontevedra",
  "37": "Salamanca",
  "38": "Santa Cruz de Tenerife",
  "39": "Cantabria",
  "40": "Segovia",
  "41": "Sevilla",
  "42": "Soria",
  "43": "Tarragona",
  "44": "Teruel",
  "45": "Toledo",
  "46": "Valencia",
  "47": "Valladolid",
  "48": "Vizcaya",
  "49": "Zamora",
  "50": "Zaragoza",
  "51": "Ceuta",
  "52": "Melilla",
};

/** PT distrito (first digits) → district. */
const PT_POSTAL_PREFIX = {
  "1": "Lisboa",
  "2": "Santarem",
  "3": "Coimbra",
  "4": "Porto",
  "47": "Braga",
  "48": "Braga",
  "49": "Viana do Castelo",
  "5": "Vila Real",
  "53": "Braganca",
  "6": "Castelo Branco",
  "63": "Guarda",
  "7": "Evora",
  "79": "Beja",
  "8": "Faro",
  "9": "Acores",
};

/** IT province (first 2 digits) → province. */
const IT_POSTAL_PREFIX = {
  "00": "Roma",
  "01": "Viterbo",
  "02": "Rieti",
  "03": "Frosinone",
  "04": "Latina",
  "05": "Terni",
  "06": "Perugia",
  "07": "Sassari",
  "08": "Nuoro",
  "09": "Cagliari",
  "10": "Torino",
  "12": "Cuneo",
  "13": "Alessandria",
  "14": "Asti",
  "15": "Novara",
  "16": "Genova",
  "17": "Savona",
  "18": "Imperia",
  "19": "La Spezia",
  "20": "Milano",
  "21": "Varese",
  "22": "Como",
  "23": "Sondrio",
  "24": "Bergamo",
  "25": "Brescia",
  "26": "Cremona",
  "27": "Pavia",
  "28": "Verbano Cusio Ossola",
  "29": "Piacenza",
  "30": "Venezia",
  "31": "Treviso",
  "32": "Belluno",
  "33": "Udine",
  "34": "Trieste",
  "35": "Padova",
  "36": "Vicenza",
  "37": "Verona",
  "38": "Trento",
  "39": "Bolzano",
  "40": "Bologna",
  "41": "Modena",
  "42": "Reggio Emilia",
  "43": "Parma",
  "44": "Ferrara",
  "45": "Rovigo",
  "46": "Mantova",
  "47": "Forli Cesena",
  "48": "Ravenna",
  "50": "Firenze",
  "51": "Pistoia",
  "52": "Arezzo",
  "53": "Siena",
  "54": "Massa Carrara",
  "55": "Lucca",
  "56": "Pisa",
  "57": "Livorno",
  "58": "Grosseto",
  "59": "Prato",
  "60": "Ancona",
  "61": "Pesaro Urbino",
  "62": "Macerata",
  "63": "Ascoli Piceno",
  "64": "Teramo",
  "65": "Pescara",
  "66": "Chieti",
  "67": "L Aquila",
  "70": "Bari",
  "71": "Foggia",
  "72": "Brindisi",
  "73": "Lecce",
  "74": "Taranto",
  "75": "Matera",
  "76": "Barletta Andria Trani",
  "80": "Napoli",
  "81": "Caserta",
  "82": "Benevento",
  "83": "Avellino",
  "84": "Salerno",
  "85": "Potenza",
  "86": "Campobasso",
  "87": "Cosenza",
  "88": "Catanzaro",
  "89": "Reggio Calabria",
  "90": "Palermo",
  "91": "Trapani",
  "92": "Agrigento",
  "93": "Caltanissetta",
  "94": "Messina",
  "95": "Catania",
  "96": "Siracusa",
  "97": "Ragusa",
  "98": "Enna",
};

/** MX estado (first 2 digits) → state. */
const MX_POSTAL_PREFIX = {
  "01": "Aguascalientes",
  "02": "Baja California",
  "03": "Baja California Sur",
  "04": "Campeche",
  "05": "Coahuila",
  "06": "Colima",
  "07": "Chiapas",
  "08": "Chihuahua",
  "09": "Ciudad de Mexico",
  "10": "Durango",
  "11": "Guanajuato",
  "12": "Guerrero",
  "13": "Hidalgo",
  "14": "Jalisco",
  "15": "Mexico",
  "16": "Michoacan",
  "17": "Morelos",
  "18": "Nayarit",
  "19": "Nuevo Leon",
  "20": "Oaxaca",
  "21": "Puebla",
  "22": "Queretaro",
  "23": "Quintana Roo",
  "24": "San Luis Potosi",
  "25": "Sinaloa",
  "26": "Sonora",
  "27": "Tabasco",
  "28": "Tamaulipas",
  "29": "Tlaxcala",
  "30": "Veracruz",
  "31": "Yucatan",
  "32": "Zacatecas",
};

/** BE province (first digit of postcode). */
const BE_PROVINCE_STATE = {
  "1": "BRUSSELS",
  "2": "ANTWERP",
  "3": "WEST FLANDERS",
  "4": "EAST FLANDERS",
  "5": "HAINAUT",
  "6": "LIEGE",
  "7": "LIMBURG",
  "8": "LUXEMBOURG",
  "9": "NAMUR",
};

/** SE postcode first-2-digit band → län (major regions). */
const SE_POSTAL_BANDS = [
  [10, 19, "STOCKHOLM"],
  [40, 49, "VASTRA GOTALAND"],
  [50, 59, "SKANE"],
  [70, 89, "OSTERGOTLAND"],
  [90, 98, "VASTERBOTTEN"],
];

/** CA FSA first letter → province. */
const CA_FSA_STATE = {
  A: "NL",
  B: "NS",
  C: "PE",
  E: "NB",
  G: "QC",
  H: "QC",
  J: "QC",
  K: "ON",
  L: "ON",
  M: "ON",
  N: "ON",
  P: "ON",
  R: "MB",
  S: "SK",
  T: "AB",
  V: "BC",
  X: "NT",
  Y: "YT",
};

/** AU postcode numeric band → state. */
const AU_POSTAL_BANDS = [
  [200, 299, "NSW"],
  [260, 261, "ACT"],
  [300, 399, "VIC"],
  [400, 499, "QLD"],
  [500, 599, "SA"],
  [600, 699, "WA"],
  [700, 799, "TAS"],
  [800, 899, "NT"],
];

/** US ZIP3 prefix → state (common gaps only; full table omitted). */
const US_ZIP3_STATE = {
  100: "NY",
  101: "NY",
  102: "NY",
  900: "CA",
  901: "CA",
  902: "CA",
  606: "IL",
  770: "TX",
  787: "TX",
  331: "FL",
  981: "WA",
};

function lookupLongestPrefix(key, table) {
  const normalized = String(key ?? "").toUpperCase();
  if (!normalized) return "";
  const prefixes = Object.keys(table).sort((a, b) => b.length - a.length);
  for (const prefix of prefixes) {
    if (normalized.startsWith(prefix)) return table[prefix];
  }
  return "";
}

function lookupNumericBand(value, bands) {
  const num = Number.parseInt(String(value ?? ""), 10);
  if (Number.isNaN(num)) return "";
  for (const [min, max, label] of bands) {
    if (num >= min && num <= max) return label;
  }
  return "";
}

function gbOutcode(postalCode) {
  const compact = String(postalCode ?? "")
    .replace(/\s+/g, "")
    .toUpperCase();
  if (compact.length < 5) return compact;
  return compact.slice(0, -3);
}

/**
 * Infer State/County from postal code when missing from the source address.
 * @param {string} country ISO 3166-1 alpha-2
 * @param {string} postalCode formatted postal code
 * @returns {string}
 */
export function lookupStateByZipcode(country, postalCode) {
  const iso = String(country ?? "").toUpperCase();
  const postal = String(postalCode ?? "").trim();
  if (!postal) return "";

  switch (iso) {
    case "GB":
      return lookupLongestPrefix(gbOutcode(postal), GB_OUTCODE_STATE);
    case "FR": {
      const dept = postal.replace(/\D/g, "").slice(0, 2);
      return FR_DEPT_STATE[dept] ?? "";
    }
    case "ES": {
      const prefix = postal.replace(/\D/g, "").slice(0, 2);
      return ES_POSTAL_PREFIX[prefix] ?? "";
    }
    case "PT": {
      const digits = postal.replace(/\D/g, "");
      return lookupLongestPrefix(digits, PT_POSTAL_PREFIX);
    }
    case "IT": {
      const prefix = postal.replace(/\D/g, "").slice(0, 2);
      return IT_POSTAL_PREFIX[prefix] ?? "";
    }
    case "MX": {
      const prefix = postal.replace(/\D/g, "").slice(0, 2);
      return MX_POSTAL_PREFIX[prefix] ?? "";
    }
    case "BE": {
      const digit = postal.replace(/\D/g, "").charAt(0);
      return BE_PROVINCE_STATE[digit] ?? "";
    }
    case "SE": {
      const band = postal.replace(/\D/g, "").slice(0, 2);
      return lookupNumericBand(band, SE_POSTAL_BANDS);
    }
    case "CA": {
      const letter = postal.replace(/\s+/g, "").charAt(0).toUpperCase();
      return CA_FSA_STATE[letter] ?? "";
    }
    case "AU": {
      const band = postal.replace(/\D/g, "").slice(0, 3);
      return lookupNumericBand(band, AU_POSTAL_BANDS);
    }
    case "US": {
      const zip3 = postal.replace(/\D/g, "").slice(0, 3);
      return US_ZIP3_STATE[zip3] ?? "";
    }
    default:
      return "";
  }
}
