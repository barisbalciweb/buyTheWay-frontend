import productImg from "../../src/assets/images/Jacke.png";

//FAKE DATA
export const fakeProductData = [
  { productId: 1, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 2, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 3, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 4, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 5, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 6, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 7, productName: "Jacke", price: 99.99, img: productImg },
  { productId: 8, productName: "Jacke", price: 99.99, img: productImg },
];

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
