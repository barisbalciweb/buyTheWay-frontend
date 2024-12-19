import ProductInOverview from "./ProductInOverview";
// REDUX
import { useSelector } from "react-redux";

const Overview = () => {
  // GLOBAL STATES
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <section className="m-[4vw]">
      <h2 className="text-[5vw] font-bold mb-[5vw]">Zusammenfassung</h2>
      {/* USER DATA */}
      <div>
        <h3>Kundendaten</h3>
        <p></p>
        <p></p>
      </div>
      {/* INVOICE ADRESS */}
      <div>
        <h3>Rechnungsadresse</h3>
        <p></p>
        <p></p>
      </div>
      {/* SHIPPING ADRESS */}
      <div>
        <h3>Lieferadresse</h3>
        <p>Lieferung an Rechnungsadresse</p>
      </div>
      {/* PAYMENT METHOD */}
      <div>
        <h3>Zahlungsart</h3>
        <p>Rechnung</p>
      </div>
      {/* ORDER SUMMARY */}
      <div>
        <h3>Warenkorb</h3>
        {cartItems.map((item) => (
          <ProductInOverview key={item.item.id + item.size} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Overview;
