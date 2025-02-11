import SingleProduct from "../components/SingleProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { removeFromWishlist } from "../features/wishlist/wishlistSlice";
import { toggleSizeSelection } from "../features/ui/uiSlice";

const Wishlist = () => {
  // LOCAL STATES
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [success, setSuccess] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);

  // GLOBAL STATES
  const { isSizeSelectionOpen } = useSelector((state) => state.ui);

  const dispatch = useDispatch();

  // DISABLE SCROLLING WHEN SIZE SELECTION IS OPEN
  useEffect(() => {
    document.body.style.overflow = isSizeSelectionOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSizeSelectionOpen]);

  const handleSizeSelection = (product) => {
    setSelectedItem(product);
    dispatch(toggleSizeSelection());
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product: selectedItem, size: selectedSize }));
    setSuccess(true);
    dispatch(toggleSizeSelection());
    setTimeout(() => {
      dispatch(removeFromWishlist(selectedItem.id));
      setSuccess(false);
      setSelectedSize(null);
      setSelectedItem(null);
    }, 3000);
  };

  return (
    <main className="flex flex-col flex-grow">
      <h1 className="text-[7vw] font-bold m-[4vw]">
        Wunschliste {wishlist.length > 0 && `(${wishlist.length})`}
      </h1>

      <div className="flex flex-col flex-grow justify-center">
        {wishlist.length === 0 ? (
          // EMPTY WISHLIST
          <section className="w-full h-[30vw] flex flex-col justify-center items-center gap-[5vw] text-[4vw]">
            <p>Deine Wunschliste ist leer</p>
            <button className="w-[50%] h-button bg-black text-white p-[4vw] text-button">
              <Link to="/" className="w-full">
                JETZT SHOPPEN!
              </Link>
            </button>
          </section>
        ) : (
          // WISHLIST ITEMS
          <div className="grid grid-cols-2 gap-[2vw] p-[4vw]">
            {wishlist.map((product) => (
              <div className="relative" key={product.id}>
                {/* SUCCESS FEEDBACK */}
                {success && selectedItem.id === product.id && (
                  <div className="w-full h-full flex flex-col justify-center gap-[2vw] items-center absolute top-0 left-0 z-[2] text-black">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-[#52D441] text-[7vw]"
                    />
                    <p className="text-center text-[4vw] font-bold">
                      In den Warenkorb hinzugefügt!
                    </p>
                  </div>
                )}
                <div
                  className={`flex flex-col gap-[2vw] relative ${
                    success && selectedItem.id === product.id && "opacity-20"
                  }`}
                  key={product.id}>
                  <SingleProduct item={{ product }} />
                  <button
                    aria-label="In den Warenkorb"
                    className={`w-full h-button flex justify-center items-center p-[3vw] ${
                      success && selectedItem.id === product.id
                        ? "bg-[#52D441]"
                        : "bg-black"
                    }`}
                    onClick={() => handleSizeSelection(product)}>
                    <FontAwesomeIcon
                      className="text-white text-[5vw]"
                      icon={faShoppingBag}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL BACKGROUND */}
        {isSizeSelectionOpen && (
          <section>
            <div
              className="w-full h-full bg-[rgba(0,0,0,0.5)] fixed bottom-0 left-0 z-[2]"
              onClick={() => dispatch(toggleSizeSelection())}
            />
            <div className="w-full h-[30%] flex flex-col justify-center items-center gap-[3vw] bg-white fixed bottom-0 left-0 z-[2]">
              <div className="w-[80%] flex flex-col items-center justify-center gap-[3vw]">
                <p className="w-full">Größe auswählen:</p>
                <div className="w-full grid grid-cols-5 gap-[2vw]">
                  {selectedItem.sizes.map((size, index) => (
                    <button
                      key={index}
                      className={`h-[15vw] flex items-center justify-center font-bold border disabled:bg-gray-300 disabled:opacity-50 border-gray-400 text-[4vw] rounded-sm ${
                        size.size === selectedSize ? "bg-orange-300" : null
                      }`}
                      onClick={() => setSelectedSize(size.size)}
                      disabled={size.isAvailable === 0}>
                      {size.size}
                    </button>
                  ))}
                </div>
              </div>
              <button
                className="w-[80%] h-button flex items-center justify-center col-start-1 col-end-5 outline-none text-white text-button p-[5vw] font-bold disabled:bg-gray-400 bg-black"
                disabled={!selectedSize}
                onClick={handleAddToCart}>
                IN DEN WARENKORB
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
