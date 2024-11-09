import SingleProduct from "../components/SingleProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { sizes } from "../data/data";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const [success, setSuccess] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [selectedSize, setSelectedSize] = useState("M");

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart({ item, size: selectedSize }));
    if (!success) {
      setSuccess(true);
      setTimeout(() => {
        dispatch(removeFromWishlist(item));
        setSelectedSize(null);
        setSuccess(false);
      }, 3000);
    }
  };

  return (
    <div>
      <h1 className="text-[7vw] font-bold m-[4vw]">Wunschliste</h1>

      <div className="grid grid-cols-2 gap-[2vw] p-[4vw]">
        {wishlist.length > 0 ? (
          wishlist.map((item) => (
            <div className="flex flex-col gap-[2vw]" key={item.id}>
              <SingleProduct product={item} />
              <button
                className={`w-full flex justify-center items-center p-[3vw] ${
                  success ? "bg-[#52D441]" : "bg-black"
                }`}
                onClick={() => handleAddToCart(item)}>
                <FontAwesomeIcon
                  className="text-white text-[5vw]"
                  icon={faShoppingBag}
                />
              </button>
            </div>
          ))
        ) : (
          <p className="text-[4vw]">Deine Wunschliste ist leer</p>
        )}
      </div>

      <div className="w-full h-[50%] bg-gray-300 absolute bottom-0 left-0 z-10">
        <p>Größe auswählen</p>
        {/* SIZES */}
        <div className="w-[80%] grid grid-rows-2 grid-cols-5 gap-[2vw]">
          {sizes.map((size, index) => (
            <button
              key={index}
              className={`flex items-center justify-center border text-[4vw] ${
                size === selectedSize
                  ? "bg-[#52D441] text-white font-bold"
                  : null
              }`}
              onClick={() => setSelectedSize(size)}>
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
