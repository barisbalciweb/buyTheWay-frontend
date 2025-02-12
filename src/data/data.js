export const selections = ["DAMEN", "HERREN", "UNISEX"];

export const accordion = [
  {
    title: "Über uns",
    content:
      "Unser Unternehmen steht für Qualität und Kundenzufriedenheit. Seit unserer Gründung haben wir uns darauf spezialisiert, hochwertige Produkte anzubieten und dabei stets die Bedürfnisse unserer Kunden in den Vordergrund zu stellen.",
  },
  {
    title: "Kontakt",
    content:
      "Wir freuen uns, von Ihnen zu hören! Kontaktieren Sie uns per E-Mail oder Telefon bei Fragen, Anmerkungen oder Anfragen. Unser Kundenservice steht Ihnen gerne zur Verfügung.",
  },
  {
    title: "Versand und Lieferung",
    content:
      "Wir bieten schnellen und zuverlässigen Versand. Alle Bestellungen werden in der Regel innerhalb von 1-3 Werktagen bearbeitet und versendet. Lieferzeiten können je nach Standort variieren.",
  },
  {
    title: "Zahlungsarten",
    content:
      "Sie können bequem per Kreditkarte, PayPal, Sofortüberweisung oder auf Rechnung zahlen. Alle Zahlungen werden sicher und verschlüsselt verarbeitet.",
  },
  {
    title: "Rücksendungen und Umtausch",
    content:
      "Ihre Zufriedenheit liegt uns am Herzen. Sollten Sie nicht zufrieden sein, bieten wir eine unkomplizierte Rücksendungs- und Umtauschmöglichkeit innerhalb von 30 Tagen ab Erhalt der Ware.",
  },
];

export const persons = ["Damen", "Herren", "Unisex"];

export const collections = [
  { name: "Bestsellers", path: "/bestsellers" },
  { name: "Reduzierte Artikel", path: "/discounted" },
  { name: "Beliebte Artikel", path: "/favorites" },
];

export const settings = [
  { title: "Meine Bestellungen", id: "orders" },
  { title: "Meine Benutzerdaten", id: "user-data" },
  { title: "ABMELDEN", id: "logout" },
];

export const userDataInputs = [
  {
    labelText: "E-Mail:",
    fieldId: "email",
    type: "email",
  },
  {
    labelText: "Vorname:",
    fieldId: "firstname",
    type: "text",
  },
  {
    labelText: "Nachname:",
    fieldId: "lastname",
    type: "text",
  },
];

export const addressInputs = [
  {
    label: "Anrede",
    inputId: "title",
    type: "select",
    options: ["Herr", "Frau", "Divers"],
  },
  {
    label: "Vorname",
    inputId: "firstName",
    type: "text",
    placeholder: "Vorname",
  },
  {
    label: "Nachname",
    inputId: "lastName",
    type: "text",
    placeholder: "Nachname",
  },
  {
    label: "Straße",
    inputId: "street",
    type: "text",
    placeholder: "Straße",
  },
  {
    label: "Hausnummer",
    inputId: "houseNumber",
    type: "text",
    placeholder: "Hausnummer",
  },
  {
    label: "PLZ",
    inputId: "postalCode",
    type: "text",
    placeholder: "PLZ",
  },
  {
    label: "Stadt",
    inputId: "city",
    type: "text",
    placeholder: "Stadt",
  },
  {
    label: "Land",
    inputId: "country",
    type: "select",
    options: ["Deutschland", "Österreich", "Schweiz"],
  },
];

export const checkoutNavigation = [
  { title: "Adresse", component: "adress" },
  { title: "Zahlung", component: "payment" },
  { title: "Zusammenfassung", component: "overview" },
];

export const categoryGroups = [
  {
    name: "Bekleidung",
    path: "/bekleidung",
    categories: [
      {
        name: "T-Shirts",
        path: "/t-shirts",
        targetGroup: ["Herren", "Damen"],
      },
      { name: "Hemden", path: "/hemden", targetGroup: ["Herren"] },
      { name: "Blusen", path: "/blusen", targetGroup: ["Damen"] },
      { name: "Roecke", path: "/roecke", targetGroup: ["Damen"] },
      { name: "Kleider", path: "/kleider", targetGroup: ["Damen"] },
      { name: "Jacken", path: "/jacken", targetGroup: ["Damen", "Herren"] },
      {
        name: "Mantel",
        path: "/mantel",
        targetGroup: ["Herren", "Damen"],
      },
      {
        name: "Strickjacken",
        path: "/strickjacken",
        targetGroup: ["Herren", "Damen"],
      },
    ],
  },
  {
    name: "Oberteile",
    path: "/oberteile",
    categories: [
      {
        name: "Pullovers",
        path: "/pullovers",
        targetGroup: ["Herren", "Damen"],
      },
      {
        name: "Sweatshirts",
        path: "/sweatshirts",
        targetGroup: ["Damen", "Unisex"],
      },
    ],
  },
  {
    name: "Hosen & Jeans",
    path: "/hosen-jeans",
    categories: [
      {
        name: "Hosen",
        path: "/hosen",
        targetGroup: ["Herren", "Damen"],
      },
      {
        name: "Shorts",
        path: "/shorts",
        targetGroup: ["Herren", "Unisex"],
      },
      {
        name: "Jeans",
        path: "/jeans",
        targetGroup: ["Herren", "Unisex"],
      },
      {
        name: "Stoffhosen",
        path: "/stoffhosen",
        targetGroup: ["Herren", "Damen"],
      },
    ],
  },
  {
    name: "Accessoires",
    path: "/accessoires",
    categories: [
      {
        name: "Handschuhen",
        path: "/handschuhen",
        targetGroup: ["Herren", "Damen"],
      },
      { name: "Taschen", path: "/taschen", targetGroup: ["Damen", "Unisex"] },
      {
        name: "Schals",
        path: "/schals",
        targetGroup: ["Damen", "Unisex"],
      },
      { name: "Halsketten", path: "/halsketten", targetGroup: ["Damen"] },
      {
        name: "Muetzen",
        path: "/muetzen",
        targetGroup: ["Unisex"],
      },
      {
        name: "Socken",
        path: "/socken",
        targetGroup: ["Unisex"],
      },
    ],
  },
  {
    name: "Sportbekleidung",
    path: "/sportbekleidung",
    categories: [
      {
        name: "Unterwaesche",
        path: "/unterwaesche",
        targetGroup: ["Herren", "Unisex"],
      },
      {
        name: "Jogginganzuege",
        path: "/jogginganzuege",
        targetGroup: ["Herren", "Unisex"],
      },
    ],
  },
];

export const fakeTopCategories = [
  "Jeans",
  "Hosen",
  "Schuhe",
  "Jacken",
  "T-Shirts",
  "Hemden",
];
