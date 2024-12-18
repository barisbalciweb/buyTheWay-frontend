import { useEffect } from "react";
import Orders from "../components/Account/Orders";
import { settings } from "../data/data";
import UserData from "../components/Account/UserData";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setAccountActiveComponent } from "../features/ui/uiSlice";
import {
  getUserAccountInfo,
  getUserData,
} from "../features/account/accountSlice";
import { logoutUser } from "../features/auth/authSlice";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GLOBAL STATE
  const { accountActiveComponent } = useSelector((state) => state.ui);
  const { userData } = useSelector((state) => state.account);
  const { userAccountInfo } = useSelector((state) => state.account);

  // GET USER DATA FROM COOKIES
  useEffect(() => {
    dispatch(getUserData());
  }, []);

  // GET USER ACCOUNT INFO (ONLY FIRSTNAME)
  useEffect(() => {
    if (userData.status === "succeeded") {
      dispatch(
        getUserAccountInfo({
          userId: userData.result.id,
          requestedFields: ["firstname"],
        })
      );
    }
  }, [userData.status]);

  const handleClick = (title, id) => {
    // LOGOUT USER
    if (id === "logout") {
      dispatch(logoutUser());
      navigate("/");
      return;
    }
    dispatch(setAccountActiveComponent({ title, id }));
  };

  const renderActiveComponent = () => {
    switch (accountActiveComponent.id) {
      case "orders":
        return <Orders />;
      case "user-data":
        return <UserData />;
      default:
        return null;
    }
  };

  return (
    <main className="p-[4vw] flex flex-col flex-grow">
      <section className="mb-[10vw]">
        <h1 className="text-[7vw] font-bold mb-[4vw]">Mein Konto</h1>
        <h2 className="text-[5vw]">
          Wilkommen, {_.capitalize(userAccountInfo.result?.data?.firstname)}
        </h2>
        <p className="text-[4vw]">Kundennummer: {userData.result?.id}</p>
      </section>

      {accountActiveComponent ? (
        renderActiveComponent()
      ) : (
        <section className="mb-[10vw]">
          <ul className="flex flex-col gap-[2vw]">
            {settings.map(({ title, id }) => (
              <li key={id}>
                <button
                  className={`w-full border-gray-400 border-customBorder rounded-md text-[4vw] shadow-md font-bold text-center py-[5vw] px-[2vw] ${
                    id === "logout" && "bg-black text-white"
                  }`}
                  onClick={() => handleClick(title, id)}>
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Account;
