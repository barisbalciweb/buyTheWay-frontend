import { useEffect } from "react";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setActiveComponent } from "../../features/ui/uiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AccountNavigation = () => {
  const dispatch = useDispatch();
  const { activeComponent } = useSelector((state) => state.ui);

  return (
    <section>
      <button
        className="w-full flex items-center gap-[2vw] text-[4vw] text-customOrange"
        onClick={() => dispatch(setActiveComponent(null))}>
        <FontAwesomeIcon
          icon={faCircleArrowLeft}
          className="font-bold pb-[0.5vw]"
        />
        <p>
          Konto
          {" > "}
          {activeComponent.title}
        </p>
      </button>
    </section>
  );
};

export default AccountNavigation;
