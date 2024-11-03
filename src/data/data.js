export const selections = ["Damen", "Herren", "Kinder"];

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

export const sortOptions = [
  "Preis aufsteigend",
  "Preis absteigend",
  "Name A-Z",
  "Name Z-A",
  "Rabatt",
  "Meistverkauft",
];

export const filters = [
  {
    filterGroup: "Sortierung",
    options: sortOptions,
    inputType: "radio",
  },
  {
    filterGroup: "Kategorie",
    options: ["Elektronik", "Bekleidung", "Sport"],
    inputType: "checkbox",
  },
  {
    filterGroup: "Preis",
    options: ["0-50€", "50-100€", "100-200€"],
    inputType: "checkbox",
  },
  {
    filterGroup: "Farbe",
    options: ["Rot", "Blau", "Grün"],
    inputType: "checkbox",
  },
  {
    filterGroup: "Größe",
    options: ["S", "M", "L", "XL"],
    inputType: "checkbox",
  },
  {
    filterGroup: "Marke",
    options: ["Marke A", "Marke B", "Marke C"],
    inputType: "checkbox",
  },
  {
    filterGroup: "Sale",
    options: ["Ja", "Nein"],
    inputType: "radio",
  },
];
