import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import ProductSlider from "../components/ProductSlider";
import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  inWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { ClipLoader } from "react-spinners";

const ProductDetail = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [openedAccordion, setOpenedAccordion] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // GLOBAL STATES
  const { singleProduct } = useSelector((state) => state.products);
  const { recentlyViewed, similar, statuses } = useSelector(
    (state) => state.products
  );

  const recentlyViewedStatus = statuses.recentlyViewed;
  const similarStatus = statuses.similar;
  const singleProductStatus = statuses.singleProduct;

  // FETCH RECENTY VIEWED AND SIMILAR PRODUCTS
  useEffect(() => {
    const fetchData = () => {
      if (recentlyViewed.length === 0) {
        dispatch(
          fetchProducts({
            endpoint: "collections/recentlyViewed",
            type: "recentlyViewed",
          })
        );
      }
      if (similar.length === 0) {
        dispatch(
          fetchProducts({
            endpoint: "collections/similar",
            type: "similar",
          })
        );
      }
    };
    fetchData();
  }, []);

  const toggleAccordion = (id) => {
    setOpenedAccordion(openedAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ item: singleProduct, selectedSize }));
    if (!success) {
      setSuccess(true);
      setTimeout(() => {
        setSelectedSize(null);
        setSuccess(false);
      }, 3000);
    }
  };

  const isInWishlist = useSelector((state) => inWishlist(state, singleProduct));

  return (
    <main className="flex flex-col flex-grow">
      {singleProductStatus === "succeded" && singleProduct ? (
        <div className="flex flex-col gap-[10vw]">
          <section className="px-[4vw] mt-[4vw] flex flex-col gap-[2vw]">
            <img
              src={singleProduct.images[0].url}
              alt={singleProduct.images[0].alt}
              className="bg-productImgBg"
            />
            <h1 className="w-full font-bold text-[7vw]">
              {singleProduct.name}
            </h1>
            <p className="text-[4vw]">{singleProduct.description}</p>
            <p className="w-full text-[6vw]">{singleProduct.price} €</p>
          </section>

          <section className="w-full flex flex-col justify-center items-center">
            <p className="w-[80%] text-[4vw]">Größe auswählen:</p>
            <div className="w-[80%] grid grid-rows-2 grid-cols-5 gap-[2vw]">
              {/* SIZES */}
              {singleProduct.sizes.map((el, index) => (
                <button
                  key={index}
                  disabled={el.isAvailable === 0}
                  className={`flex items-center justify-center border text-[4vw] disabled:bg-gray-300 disabled:opacity-20 ${
                    el.size === selectedSize
                      ? "bg-[#52D441] text-white font-bold"
                      : null
                  }`}
                  onClick={() => setSelectedSize(el.size)}>
                  {el.size === "Einheitsgröße" ? "OS" : el.size}
                </button>
              ))}
              {/* ADD TO CART BUTTON */}
              <button
                className={`flex items-center justify-center h-[14vw] col-start-1 col-end-5 outline-none text-white text-[5vw] font-bold disabled:bg-gray-300 ${
                  success ? "bg-[#52D441]" : "bg-black"
                }`}
                disabled={selectedSize === null}
                onClick={handleAddToCart}>
                IN DEN WARENKORB
              </button>
              <button className="flex items-center justify-center border">
                <FontAwesomeIcon
                  icon={isInWishlist ? faHeartSolid : faHeartRegular}
                  className={`text-[6vw] ${isInWishlist && "text-red-500"}`}
                  onClick={() =>
                    isInWishlist
                      ? dispatch(removeFromWishlist(singleProduct))
                      : dispatch(addToWishlist(singleProduct))
                  }
                />
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
                {singleProduct.materials.map((material, index) => (
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
                {singleProduct.instructions.map((el, index) => (
                  <li key={index} className="text-[4vw]">
                    {el.instruction}
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
              <div className="h-slider flex justify-center items-center mt-[12vw]">
                <ClipLoader size={"20vw"} />
              </div>
            )}

            {/* SIMILAR PRODUCTS  */}
            {similarStatus === "succeeded" ? (
              <section className="c-home-slider-sections">
                <h2 className="c-h2">Ähnliche Produkte</h2>
                <ProductSlider products={similar} />
              </section>
            ) : (
              <div className="h-slider flex justify-center items-center mt-[12vw]">
                <ClipLoader size={"20vw"} />
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader size={"20vw"} />
        </div>
      )}
    </main>
  );
};

export default ProductDetail;
