import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { sizes } from "../data/data";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductSlider from "../components/ProductSlider";
import { addToCart } from "../features/cart/cartSlice";

const ProductDetail = () => {
  const [openedAccordion, setOpenedAccordion] = useState(null);

  const dispatch = useDispatch();

  const { recentlyViewed, similar, statuses } = useSelector(
    (state) => state.products
  );
  const recentlyViewedStatus = statuses.recentlyViewed;
  const similarStatus = statuses.similar;

  const { id, name, price, images, careInstructions, description, materials } =
    useSelector((state) => state.products.selectedProduct);

  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );

  useEffect(() => {
    dispatch(
      fetchProducts({ endpoint: "/products.json", type: "recentlyViewed" })
    );
    dispatch(fetchProducts({ endpoint: "/products.json", type: "similar" }));
  }, [dispatch]);

  const toggleAccordion = (id) => {
    setOpenedAccordion(openedAccordion === id ? null : id);
  };

  return (
    <main className="flex flex-col gap-[10vw]">
      <section className="px-[4vw] mt-[4vw] flex flex-col gap-[2vw]">
        <img
          src={images[0].url}
          alt={images[0].alt}
          className="bg-productImgBg"
        />
        <h1 className="w-full font-bold text-[7vw]">{name}</h1>
        <p className="text-[4vw]">{description}</p>
        <p className="w-full text-[6vw]">{price} €</p>
      </section>

      <section className="w-full flex justify-center">
        <div className="w-[80%] grid grid-rows-2 grid-cols-5 gap-[2vw]">
          {sizes.map((size, index) => (
            <button
              key={index}
              className="flex items-center justify-center border text-[4vw]">
              {size}
            </button>
          ))}
          <button
            className="flex items-center justify-center h-[14vw] col-start-1 col-end-5 text-white text-[5vw] font-bold bg-[#52D441]"
            onClick={() => dispatch(addToCart(selectedProduct))}>
            IN DEN WARENKORB
          </button>
          <button className="flex items-center justify-center border">
            <FontAwesomeIcon icon={faHeart} className="text-[6vw]" />
          </button>
        </div>
      </section>

      <section className="w-full">
        {/* MATERIALS */}
        <button
          id="materials"
          className={`w-full flex justify-between text-[4vw] font-bold border-b-customBorder py-[4vw] px-[2vw] ${
            openedAccordion === "materials" && "text-customOrange"
          }`}
          onClick={(e) => toggleAccordion(e.target.id)}>
          Material
          <FontAwesomeIcon
            className="text-[4vw]"
            icon={openedAccordion === "materials" ? faMinus : faPlus}
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
          className={`w-full flex justify-between text-[4vw] font-bold border-b-customBorder py-[4vw] px-[2vw] ${
            openedAccordion === "careInstructions" && "text-customOrange"
          }`}
          onClick={(e) => toggleAccordion(e.target.id)}>
          Pflegehinweise
          <FontAwesomeIcon
            className="text-[4vw]"
            icon={openedAccordion === "careInstructions" ? faMinus : faPlus}
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

      <section>
        {/* RECENTLY VIEWED  */}
        {recentlyViewedStatus === "succeeded" ? (
          <section className="c-home-slider-sections">
            <h2 className="c-h2">Zuletzt angesehen</h2>
            <ProductSlider products={recentlyViewed} />
          </section>
        ) : (
          "Loading..."
        )}

        {/* SIMILAR PRODUCTS  */}
        {similarStatus === "succeeded" ? (
          <section className="c-home-slider-sections">
            <h2 className="c-h2">Ähnliche Produkte</h2>
            <ProductSlider products={similar} />
          </section>
        ) : (
          "Loading..."
        )}
      </section>
    </main>
  );
};

export default ProductDetail;
