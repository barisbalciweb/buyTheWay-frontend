import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// REDUX
import { useSelector } from "react-redux";

const ProductDetail = () => {
  const [openedAccordion, setOpenedAccordion] = useState(null);

  const { id, name, price, images, careInstructions, description, materials } =
    useSelector((state) => state.products.selectedProduct);

  const toggleAccordion = (id) => {
    setOpenedAccordion(openedAccordion === id ? null : id);
  };

  return (
    <main className="p-[5vw] flex flex-col gap-[3vw]">
      <img
        src={images[0].url}
        alt={images[0].alt}
        className="bg-productImgBg"
      />
      <h1 className="font-bold text-[7vw]">{name}</h1>
      <p className="text-[4vw]">{description}</p>
      <p className="text-[6vw]">{price} €</p>

      <section className="bg-gray-100">
        {/* MATERIALS */}
        <button
          id="materials"
          className={`w-full flex justify-between text-[4vw] font-bold border-b-customBorder py-[3vw] px-[2vw] ${
            openedAccordion === "materials" && "text-customOrange"
          }`}
          onClick={(e) => toggleAccordion(e.target.id)}>
          Material
          <FontAwesomeIcon
            className="text-[4vw]"
            icon={openedAccordion === "materials" ? faAngleUp : faAngleDown}
          />
        </button>

        {openedAccordion === "materials" && (
          <ul className="p-[2vw]">
            {materials.map((material, index) => (
              <li key={index} className="text-[4vw]">
                {material.percentage * 100 + "%"} {material.name}
              </li>
            ))}
          </ul>
        )}

        {/* CARE INSTRUCTIONS */}
        <button
          id="careInstructions"
          className={`w-full flex justify-between text-[4vw] font-bold border-b-customBorder py-[3vw] px-[2vw] ${
            openedAccordion === "careInstructions" && "text-customOrange"
          }`}
          onClick={(e) => toggleAccordion(e.target.id)}>
          Pflegehinweise
          <FontAwesomeIcon
            className="text-[4vw]"
            icon={
              openedAccordion === "careInstructions" ? faAngleUp : faAngleDown
            }
          />
        </button>

        {openedAccordion === "careInstructions" && (
          <ul className="p-[2vw]">
            {careInstructions.map((careInstruction, index) => (
              <li key={index} className="text-[4vw]">
                {careInstruction}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default ProductDetail;
