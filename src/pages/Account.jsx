import { useEffect } from "react";
import Orders from "../components/Account/Orders";
import { settings } from "../data/data";
import UserData from "../components/Account/UserData";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { setAccountActiveComponent } from "../features/ui/uiSlice";
import { getUserAccountInfo } from "../features/account/accountSlice";
import { logoutUser } from "../features/auth/authSlice";

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // GLOBAL STATE
  const { accountActiveComponent } = useSelector((state) => state.ui);
  const { userId } = useSelector((state) => state.auth.authentication);
  const { userAccountInfo } = useSelector((state) => state.account);

  // GET USER ACCOUNT INFO (ONLY FIRSTNAME)
  useEffect(() => {
    if (userId) {
      dispatch(
        getUserAccountInfo({
          userId,
          requestedFields: ["firstname"],
        })
      );
    }
  }, [userId]);

  const handleClick = ({ title, settingId }) => {
    // LOGOUT USER
    if (settingId === "logout") {
      dispatch(logoutUser());
      navigate("/");
      return;
    }
    dispatch(setAccountActiveComponent({ title, settingId }));
  };

  const renderActiveComponent = () => {
    switch (accountActiveComponent.settingId) {
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
        <p className="text-[4vw]">Kundennummer: {userId}</p>
      </section>

      {accountActiveComponent ? (
        renderActiveComponent()
      ) : (
        <section className="mb-[10vw]">
          <ul className="flex flex-col gap-[4vw]">
            {settings.map(({ title, id }) => (
              <li key={id}>
                <button
                  className={`w-full h-button border-gray-400 border-customBorder rounded-sm text-[4vw] shadow-sm font-bold text-center ${
                    id === "logout" && "bg-black text-white"
                  }`}
                  onClick={() => handleClick({ title, settingId: id })}>
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
