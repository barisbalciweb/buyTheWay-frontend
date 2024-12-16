export const fakeTopCategories = [
  "Jeans",
  "Hosen",
  "Schuhe",
  "Jacken",
  "T-Shirts",
  "Hemden",
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

export const orders = [
  { id: 1, date: "2021-09-01", total: 1000, details: "Detaylar 1" },
  { id: 2, date: "2021-09-02", total: 2000, details: "Detaylar 2" },
  { id: 3, date: "2021-09-03", total: 3000, details: "Detaylar 3" },
];

export const productsInOrder = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    quantity: 5,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    quantity: 3,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    quantity: 2,
  },
];
