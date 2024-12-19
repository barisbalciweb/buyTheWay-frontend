export const selections = ["Damen", "Herren", "Unisex"];

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
  { title: "Abmelden", id: "logout" },
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

export const adressInputs = [
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
    inputId: "zipCode",
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
