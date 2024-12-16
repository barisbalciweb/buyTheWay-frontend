import { useState } from "react";
import AccountNavigation from "./AccountNavigation";
import { orders } from "../../data/fakeData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Orders = () => {
  // LOCAL STATES
  const [openOrderId, setOpenOrderId] = useState(null);

  return (
    <div>
      <AccountNavigation />
      <section className="mt-[5vw]">
        <h2 className="text-[5vw] font-bold">Bestellungen</h2>
        <div className="flex flex-col gap-[3vw] mt-[2vw]">
          {/* FOR TESTING */}
          {orders.map(({ id, date, total }) => (
            <div
              key={id}
              className="w-full shadow-md border-gray-300 border-customBorder rounded-lg bg-gray-100 p-[2vw]"
              onClick={() => setOpenOrderId(openOrderId === id ? null : id)}>
              {/* ACCORDION HEADER (ORDER SUMMARY) */}
              <button className="w-full p-[2vw] text-start">
                <div className="w-full flex font-bold">
                  <span className="w-1/3">Auftragsnr.:</span>
                  <span className="w-1/3">Datum:</span>
                  <span className="w-1/3">Summe:</span>
                </div>
                <div className="w-full flex mt-[1vw]">
                  <span className="w-1/3">{id}</span>
                  <span className="w-1/3">{date}</span>
                  <span className="w-1/3">{total}€</span>
                </div>
              </button>

              {/* ACCORDION CONTENT (ORDER DETAILS)*/}
              {openOrderId === id && (
                <div className="p-[2vw] bg-gray-50 text-gray-700">
                  <p>test</p>
                </div>
              )}

              <div className="text-center">
                <FontAwesomeIcon
                  className="text-[4vw]"
                  icon={openOrderId === id ? faAngleUp : faAngleDown}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Orders;
