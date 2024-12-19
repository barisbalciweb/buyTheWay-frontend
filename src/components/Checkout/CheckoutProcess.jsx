import { checkoutNavigation } from "../../data/data";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setCheckoutActiveComponent } from "../../features/ui/uiSlice";

const CheckoutProcess = () => {
  const dispatch = useDispatch();

  const { checkoutActiveComponent } = useSelector((state) => state.ui);
  const { payment, overview } = useSelector(
    (state) => state.checkout.isProgressStepDisabled
  );

  return (
    <div className="w-full flex justify-between gap-[3vw] text-[4vw] my-[5vw]">
      {checkoutNavigation.map(({ title, component }, index) => (
        <button
          key={title}
          className="flex gap-[1vw] justify-center items-center disabled:opacity-50"
          disabled={
            (component === "payment" && payment) ||
            (component === "overview" && overview)
          }
          onClick={() => dispatch(setCheckoutActiveComponent(component))}>
          <p
            className={`w-[5vw] h-[5vw] flex justify-center items-center rounded-full text-[3.5vw] text-white pt-[0.5vw] ${
              checkoutActiveComponent === component
                ? "bg-customOrange"
                : "bg-black"
            }`}>
            {index + 1}
          </p>
          <p
            className={`mt-[1vw] ${
              checkoutActiveComponent === component && "font-bold"
            }`}>
            {title}
          </p>
        </button>
      ))}
    </div>
  );
};

export default CheckoutProcess;
