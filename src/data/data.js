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
    filterCategory: "Sortierung",
    filterOptions: sortOptions,
    inputType: "radio",
  },
  {
    filterCategory: "Kategorie",
    filterOptions: ["Elektronik", "Bekleidung", "Sport"],
    inputType: "checkbox",
  },
  {
    filterCategory: "Preis",
    filterOptions: ["0-50€", "50-100€", "100-200€"],
    inputType: "checkbox",
  },
  {
    filterCategory: "Farbe",
    filterOptions: ["Rot", "Blau", "Grün"],
    inputType: "checkbox",
  },
  {
    filterCategory: "Größe",
    filterOptions: ["S", "M", "L", "XL"],
    inputType: "checkbox",
  },
  {
    filterCategory: "Marke",
    filterOptions: ["Marke A", "Marke B", "Marke C"],
    inputType: "checkbox",
  },
  {
    filterCategory: "Sale",
    filterOptions: ["Ja", "Nein"],
    inputType: "radio",
  },
];

const singleProduct = {
  productId: 1,
  productName: "Unnamed Jacke",
  price: 50,
  img: "https://via.placeholder.com/300",
  availableSizes: ["S", "M", "L", "XL"],
  availableColors: ["Rot", "Blau", "Grün"],
  sale: false,
  discount: 0,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac metus sit amet urna ultricies ultricies. Nullam nec magna nec sem ultrices ultricies. Nulla facilisi. Sed ut elit nec turpis ultricies ultricies. Nullam nec magna nec sem ultricies ultricies. Nulla facilisi. Sed ut elit nec turpis ultricies ultricies.",
};

export const sizes = ["XS", "S", "M", "L", "XL"];
