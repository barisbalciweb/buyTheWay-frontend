import { useEffect, useState } from "react";
import AccountNavigation from "./AccountNavigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  getOrdersSummary,
  getOrderDetail,
} from "../../features/checkout/checkoutSlice";

const Orders = () => {
  const dispatch = useDispatch();

  // LOCAL STATES
  const [openOrderId, setOpenOrderId] = useState(null);

  // GLOBAL STATES
  const { userIdState } = useSelector((state) => state.account);
  const { ordersSummary } = useSelector((state) => state.checkout);
  const { orderDetail } = useSelector((state) => state.checkout);

  // GET USER ORDERS SUMMARY
  useEffect(() => {
    if (userIdState.status === "succeeded") {
      dispatch(getOrdersSummary());
    }
  }, [userIdState.status]);

  const handleAccordion = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
    dispatch(getOrderDetail(orderId));
  };

  return (
    <div>
      <AccountNavigation />
      <section className="mt-[5vw]">
        <h2 className="text-[5vw] font-bold">Bestellungen</h2>
        <div className="flex flex-col gap-[3vw] mt-[2vw]">
          {/* FAKE DATA FOR TESTING */}
          {ordersSummary.result && ordersSummary.length > 0 ? (
            ordersSummary.result.map(({ id, created_at, total }) => (
              <div
                key={id}
                className="w-full shadow-md border-gray-300 border-customBorder rounded-lg bg-gray-100 p-[2vw]"
                onClick={() => handleAccordion(id)}>
                {/* ACCORDION HEADER (ORDER SUMMARY) */}
                <button className="w-full p-[2vw] text-start">
                  <div className="w-full flex font-bold">
                    <span className="w-1/3">Auftragsnr.:</span>
                    <span className="w-1/3">Datum:</span>
                    <span className="w-1/3">Summe:</span>
                  </div>
                  <div className="w-full flex mt-[1vw]">
                    <span className="w-1/3">{id}</span>
                    <span className="w-1/3">{created_at.slice(0, 10)}</span>
                    <span className="w-1/3">{total}€</span>
                  </div>
                </button>

                {/* ACCORDION CONTENT (ORDER DETAILS)*/}
                {openOrderId === id && (
                  <div className="bg-white text-gray-700 p-[2vw] mb-[2vw] rounded-md shadow-[inset_2px_2px_5px_0px_rgba(0,0,0,0.2)]">
                    <table className="w-full">
                      <thead className="text-[3vw] font-bold">
                        <tr className="p-2">
                          <td>Artikelnr.</td>
                          <td>Name</td>
                          <td>Preis</td>
                          <td>Menge</td>
                        </tr>
                      </thead>
                      {/* FAKE DATA FOR TESTING */}
                      <tbody className="text-[3.5vw]">
                        {orderDetail.status === "succeeded" &&
                          orderDetail.result.map((product) => (
                            <tr key={product.id}>
                              <td className="w-1/5">{product.id}</td>
                              <td className="w-2/5">
                                {product.name.slice(0, 13)}
                              </td>
                              <td className="w-1/5">{product.price}€</td>
                              <td className="w-1/5">{product.quantity}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="text-center">
                  <FontAwesomeIcon
                    className="text-[4vw]"
                    icon={openOrderId === id ? faAngleUp : faAngleDown}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="shadow-md flex justify-center align-center border-gray-300 border-customBorder rounded-lg bg-gray-100 p-[5vw]">
              <p>Es liegen keine Bestellungen vor.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;
