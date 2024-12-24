import { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { userDataInputs } from "../../data/data";
import _ from "lodash";
import {
  faFloppyDisk,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  missingInputMsg,
  serverErrorMsg,
  vorbiddenInputMsg,
} from "../../utils/feedbacks";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAccountInfo,
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
  });
  const [editOpen, setEditOpen] = useState({
    firstname: false,
    lastname: false,
    email: false,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [warning, setWarning] = useState(null);

  // GLOBAL STATES
  const { userIdState } = useSelector((state) => state.account);
  const { userAccountInfo } = useSelector((state) => state.account);
  const infoStatus = userAccountInfo.status;
  const infoResult = userAccountInfo.result;
  const updateStatus = useSelector((state) => state.account.userUpdate.status);
  const updateError = useSelector((state) => state.account.userUpdate.error);

  // GET USER ACCOUNT INFO (FIRSNAME, LASTNAME, EMAIL)
  useEffect(() => {
    if (userIdState.status === "succeeded") {
      dispatch(
        getUserAccountInfo({
          userId: userIdState.result.id,
          requestedFields: ["email", "firstname", "lastname"],
        })
      );
    }
  }, [userIdState.status, updateStatus]);

  useEffect(() => {
    // SET FORM VALUES AFTER FETCHING USER ACCOUNT INFO
    if (infoStatus === "succeeded") {
      setFormValues({
        firstname: infoResult.data.firstname,
        lastname: infoResult.data.lastname,
        email: infoResult.data.email,
      });
    }
  }, [userAccountInfo]);

  // SHOW SUCCESS MESSAGE AFTER UPDATING USER DATA
  useEffect(() => {
    if (updateStatus === "succeeded") {
      setUpdateSuccess(true);
      setWarning(false);

      setTimeout(() => {
        setUpdateSuccess(false);
        dispatch(resetUserUpdate());
      }, 3000);
    }

    // SHOW FEEDBACK IF UPDATE FAILED
    if (updateStatus === "failed") {
      switch (updateError) {
        case "missingInput":
          setWarning(missingInputMsg);
          break;
        case "vorbiddenInput":
          setWarning(vorbiddenInputMsg);
          break;
        default:
          setWarning(serverErrorMsg);
          break;
      }
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
        userId: userIdState.result.id,
      })
    );
  };

  const handleCancel = (fieldId) => {
    setEditOpen((prev) => ({
      ...prev,
      [fieldId]: false,
    }));
    setFormValues((prev) => ({
      ...prev,
      [fieldId]: infoResult.data[fieldId],
    }));
  };

  return (
    <div>
      <AccountNavigation />
      <section className="w-full mt-[5vw]">
        <h2 className="text-[5vw] font-bold">Benutzerdaten</h2>
        <div className="flex justify-center items-center bg-gray-200 mt-[2vw]">
          <form className="w-[90%] flex flex-col gap-[3vw] justify-center items-center py-[10vw]">
            {userDataInputs.map(({ labelText, fieldId, type }) => (
              <div key={fieldId} className="w-full flex flex-col gap-[1vw]">
                <label htmlFor={fieldId}>{labelText}</label>
                <div className="w-full flex justify-between items-center relative">
                  <input
                    id={fieldId}
                    type={type}
                    value={
                      (fieldId === "email"
                        ? formValues[fieldId]
                        : _.capitalize(formValues[fieldId])) || ""
                    }
                    onChange={handleChange}
                    disabled={fieldId === "email" ? true : !editOpen[fieldId]}
                    className="w-[75%] h-[10vw] focus:outline-none px-[3vw] disabled:bg-gray-100 focus:border-customOrange"
                  />
                  {/* EDIT || SAVE */}
                  {fieldId !== "email" && (
                    <div className="w-[25%] h-[10vw] flex justify-end items-center">
                      {editOpen[fieldId] ? (
                        <div className="w-full h-full flex justify-between items-center ml-[4vw]">
                          <FontAwesomeIcon
                            icon={faFloppyDisk}
                            className="text-[6vw] text-customOrange"
                            aria-label="Speichern"
                            onClick={() => handleSave(fieldId)}
                          />
                          <FontAwesomeIcon
                            icon={faXmark}
                            className="text-[7.5vw]"
                            onClick={() => handleCancel(fieldId)}
                          />
                        </div>
                      ) : (
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="text-[6vw] mb-[1vw]"
                          aria-label="Bearbeiten"
                          onClick={() => handleEdit(fieldId)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* SHOW UPDATE WARNING */}
            {warning && <p className="bg-red-200 p-[2vw]">Fehler: {warning}</p>}
          </form>
        </div>
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
