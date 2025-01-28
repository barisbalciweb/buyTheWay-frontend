import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  clearSimilar,
  fetchProducts,
  fetchSingleProduct,
} from "../features/products/productsSlice";
import ProductSlider from "../components/ProductSlider";
import { addToCart } from "../features/cart/cartSlice";
import {
  addToWishlist,
  inWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toggleLoginModal } from "../features/ui/uiSlice";
import { calculateDiscountedPrice } from "../utils/calculateDiscountedPrice";
import LoadingScreen from "../components/LoadingScreen";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  // LOCAL STATES
  const [openedAccordion, setOpenedAccordion] = useState(null);
  const [success, setSuccess] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // GLOBAL STATES
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { singleProduct, similar, statuses } = useSelector(
    (state) => state.products
  );

  const singleProductStatus = statuses.singleProduct;

  // FETCH DETAILS OF SELECTED PRODUCT
  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [productId]);

  // FETCH SIMILAR PRODUCTS
  useEffect(() => {
    dispatch(clearSimilar());
    const fetchData = () => {
      dispatch(
        fetchProducts({
          endpoint: `collection?collection=similar&category=${singleProduct.category}&targetGroup=${singleProduct.targetGroup}&id=${singleProduct.id}`,
          type: "similar",
        })
      );
    };

    if (singleProductStatus === "succeeded" && singleProduct) {
      fetchData();
    }
  }, [singleProductStatus, singleProduct]);

  // FETCH RECENTLY VIEWED PRODUCTS
  useEffect(() => {
    if (singleProductStatus === "succeeded" && singleProduct) {
      // GET PRODUCTS FROM PREVIOUS VIEWS
      let items = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

      // IF PRODUCT ALREADY EXISTS, REMOVE IT
      const index = items.findIndex((item) => item.id === singleProduct.id);
      if (index !== -1) {
        items.splice(index, 1);
      }

      // ADD THE CURRENT PRODUCT TO THE BEGINNING OF THE LIST
      items.unshift(singleProduct);

      // LIMIT THE LIST TO 10 ITEMS
      if (items.length > 10) {
        items = items.slice(0, 10);
      }

      // UPDATE STATE AND LOCALSTORAGE
      setRecentlyViewed(items);
      localStorage.setItem("recentlyViewed", JSON.stringify(items));
    }
  }, [singleProduct, singleProductStatus]);

  const toggleAccordion = (id) => {
    setOpenedAccordion(openedAccordion === id ? null : id);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: singleProduct,
        size: selectedSize,
      })
    );
    if (!success) {
      setSuccess(true);
      setTimeout(() => {
        setSelectedSize(null);
        setSuccess(false);
      }, 3000);
    }
  };

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      isInWishlist
        ? dispatch(removeFromWishlist(singleProduct.id))
        : dispatch(addToWishlist(singleProduct));
    } else {
      dispatch(toggleLoginModal());
      return;
    }
  };

  const isInWishlist = useSelector((state) => inWishlist(state, singleProduct));

  return (
    <main className="flex flex-col flex-grow">
      {singleProductStatus === "succeeded" && singleProduct ? (
        <div className="flex flex-col gap-[10vw]">
          <section className="px-[4vw] mt-[4vw] flex flex-col gap-[2vw]">
            <div className="relative">
              {singleProduct.discountPercentage > 0 && (
                <p className="text-[6vw] text-customOrange font-bold absolute top-[2vw] left-[2vw]">
                  -{singleProduct.discountPercentage}%
                </p>
              )}
              <img
                src={singleProduct.images[0].url}
                alt={singleProduct.images[0].alt}
                className="bg-productImgBg"
              />
            </div>
            <h1 className="w-full font-bold text-[7vw]">
              {singleProduct.brand + " " + singleProduct.name}
            </h1>
            <p className="w-full text-[4vw]">{singleProduct.description}</p>
            <div className="flex gap-[2vw] text-[6vw]">
              <p
                className={`${
                  singleProduct.discountPercentage > 0 && "line-through"
                }`}>
                {singleProduct.price}€
              </p>
              {singleProduct.discountPercentage > 0 && (
                <p className="text-customOrange font-bold">
                  {calculateDiscountedPrice(
                    singleProduct.price,
                    singleProduct.discountPercentage
                  )}
                  €
                </p>
              )}
            </div>
          </section>

          <section className="w-full flex flex-col justify-center items-center">
            <p className="w-[80%] text-[4vw]">Größe auswählen:</p>
            <div className="w-[80%] grid grid-rows-2 grid-cols-5 gap-[2vw]">
              {/* SIZES */}
              {singleProduct.sizes.map((el, index) => (
                <button
                  key={index}
                  disabled={el.isAvailable === 0}
                  className={`flex items-center justify-center border-customBorder font-bold border-gray-400 text-[4vw] disabled:bg-gray-300 disabled:opacity-50 rounded-sm ${
                    el.size === selectedSize ? "bg-orange-300" : null
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
                {success ? "HINZUGEFÜGT!" : "IN DEN WARENKORB"}
              </button>
              <button className="flex items-center justify-center border-customBorder border-gray-400">
                <FontAwesomeIcon
                  icon={isInWishlist ? faHeartSolid : faHeartRegular}
                  className={`text-[6vw] ${isInWishlist && "text-red-500"}`}
                  onClick={handleAddToWishlist}
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
            {recentlyViewed && recentlyViewed.length > 0 && (
              <section className="c-home-slider-sections">
                <h2 className="c-h2">Zuletzt angesehen</h2>
                <ProductSlider
                  products={Array.isArray(recentlyViewed) ? recentlyViewed : []}
                />
              </section>
            )}

            {/* SIMILAR PRODUCTS  */}
            {similar && similar.length > 0 && (
              <section className="c-home-slider-sections">
                <h2 className="c-h2">Ähnliche Produkte</h2>
                <ProductSlider products={similar} />
              </section>
            )}
          </section>
        </div>
      ) : (
        <LoadingScreen />
      )}
    </main>
  );
};

export default ProductDetail;
