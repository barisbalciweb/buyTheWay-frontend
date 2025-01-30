// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setAccountActiveComponent } from "../../features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AccountNavigation = () => {
  const dispatch = useDispatch();
  const { accountActiveComponent } = useSelector((state) => state.ui);

  return (
    <section>
      <button
        aria-label="Zurück"
        className="w-full flex items-center gap-[2vw] text-[4vw] text-customOrange"
        onClick={() => dispatch(setAccountActiveComponent(null))}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold pb-[0.5vw]"
        />
        <p>
          Konto
          {" > "}
          {accountActiveComponent.title}
        </p>
      </button>
    </section>
  );
};

export default AccountNavigation;
