import SingleProduct from "../components/SingleProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { sizes } from "../data/data";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";

const Wishlist = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSizeSelectionOpen, setIsSizeSelectionOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [success, setSuccess] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);

  const dispatch = useDispatch();

  // DISABLE SCROLLING WHEN SIZE SELECTION IS OPEN
  useEffect(() => {
    document.body.style.overflow = isSizeSelectionOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSizeSelectionOpen]);

  const handleSizeSelection = (item) => {
    setSelectedItem(item);
    setIsSizeSelectionOpen(true);
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ item: selectedItem, size: selectedSize }));
    setSuccess(true);
    setIsSizeSelectionOpen(false);
    setSelectedSize(null);
    setSelectedItem(null);
    setTimeout(() => {
      dispatch(removeFromWishlist(selectedItem));
      setSuccess(false);
    }, 3000);
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
                onClick={() => handleSizeSelection(item)}>
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

      {/* MODAL BACKGROUND */}
      {isSizeSelectionOpen && (
        <section>
          <div
            className="w-full h-full bg-[rgba(0,0,0,0.5)] absolute top-0 left-0"
            onClick={() => setIsSizeSelectionOpen(false)}
          />
          <div className="w-full h-[30%] flex flex-col justify-center items-center gap-[3vw] bg-customGray fixed bottom-0 left-0 z-10">
            <div className="w-[80%] flex flex-col items-center justify-center gap-[3vw]">
              <p className="w-full">Größe auswählen:</p>
              <div className="w-full grid grid-cols-5 gap-[2vw]">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`h-[15vw] flex items-center justify-center border border-gray-700 text-[4vw] ${
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
            <button
              className="w-[80%] flex items-center justify-center h-[14vw] col-start-1 col-end-5 outline-none text-white text-[5vw] p-[5vw] font-bold disabled:bg-gray-400 bg-black"
              disabled={!selectedSize}
              onClick={handleAddToCart}>
              IN DEN WARENKORB
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Wishlist;
