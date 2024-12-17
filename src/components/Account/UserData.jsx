import { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { inputs } from "../../data/data";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccountInfo,
  getUserData,
  resetUserUpdate,
  updateUserData,
} from "../../features/account/accountSlice";

const UserData = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [editOpen, setEditOpen] = useState({
    firstname: false,
    lastname: false,
    email: false,
    password: false,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // GLOBAL STATES
  const userId = useSelector((state) => state.account.userData.result.id);
  const { userAccountInfo } = useSelector((state) => state.account);
  const infoStatus = userAccountInfo.status;
  const infoResult = userAccountInfo.result;
  const updateStatus = useSelector((state) => state.account.userUpdate.status);

  useEffect(() => {
    // GET USER DATA FROM COOKIES
    dispatch(getUserData());
    // GET USER ACCOUNT INFO
    dispatch(getUserAccountInfo(userId));
  }, []);

  useEffect(() => {
    // SET FORM VALUES AFTER FETCHING USER ACCOUNT INFO
    if (infoStatus === "succeeded") {
      setFormValues({
        firstname: infoResult.data.firstname,
        lastname: infoResult.data.lastname,
        email: infoResult.data.email,
        password: infoResult.data.password,
      });
    }
  }, [userAccountInfo]);

  // SHOW SUCCESS MESSAGE AFTER UPDATING USER DATA
  useEffect(() => {
    if (updateStatus === "succeeded") {
      setUpdateSuccess(true);

      setTimeout(() => {
        setUpdateSuccess(false);
        dispatch(resetUserUpdate());
      }, 3000);
    }
  }, [updateStatus]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleEdit = (fieldId) => {
    setEditOpen((prev) => {
      return Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === fieldId;
        return acc;
      }, {});
    });
  };

  const handleSave = (fieldId) => {
    setEditOpen((prev) => ({
      ...prev,
      [fieldId]: false,
    }));
    // CALL FETCH TO UPDATE USER DATA
    dispatch(
      updateUserData({
        fieldToEdit: fieldId,
        newValue: formValues[fieldId],
        userId,
      })
    );
  };

  return (
    <div>
      <AccountNavigation />
      <section className="w-full flex justify-center items-center bg-gray-200 p-[2vw] mt-[5vw]">
        <form className="w-[80%] flex flex-col gap-[3vw] justify-center items-center py-[10vw]">
          {inputs.map(({ labelText, fieldId, type }) => (
            <div key={fieldId} className="w-full flex flex-col gap-[1vw]">
              <label htmlFor={fieldId}>{labelText}</label>
              <div className="w-full flex justify-between items-center gap-[2vw] relative">
                <input
                  id={fieldId}
                  type={type}
                  value={formValues[fieldId] || ""}
                  onChange={handleChange}
                  disabled={!editOpen[fieldId]}
                  className="w-[90%] h-[10vw] focus:outline-none px-[3vw] disabled:bg-gray-100 focus:border-customOrange"
                />
                {/* EDIT || SAVE */}
                <div className="w-[10%] h-[10vw] flex justify-center items-center">
                  {editOpen[fieldId] ? (
                    <FontAwesomeIcon
                      icon={faFloppyDisk}
                      className="text-[6vw] text-customOrange"
                      aria-label="Speichern"
                      onClick={() => handleSave(fieldId)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="text-[6vw] mb-[1vw]"
                      aria-label="Bearbeiten"
                      onClick={() => handleEdit(fieldId)}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </form>
      </section>

      {/* SUCCESS FEEDBACK */}
      {updateSuccess && (
        <section>
          <div className="w-[100%] h-[15%] flex justify-center items-center text-[4vw] bg-[rgba(0,100,0,0.9)] text-white fixed bottom-0 left-0">
            <p>Änderungen wurden erfolgreich gespeichert!</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserData;
