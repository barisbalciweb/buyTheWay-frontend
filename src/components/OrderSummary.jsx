const OrderSummary = ({ children, total, cartItemsCount }) => {
  return (
    <section className="bg-[#D9D9D9] flex flex-col justify-center gap-[2vw] text-[4.5vw] px-[5vw] py-[10vw]">
      <div className="w-full mb-[5vw]">
        <h2 className="text-[6vw] font-bold">Bestellübersicht</h2>
        <p className="text-gray-600">{cartItemsCount} Artikel</p>
      </div>
      <div className="flex justify-between">
        <p>Zwischensumme</p>
        <p>{total.toFixed(2)} €</p>
      </div>
      <div className="flex justify-between">
        <p>Lieferung</p>
        <p>kostenlos</p>
      </div>
      <hr className="border-black" />
      <div className="flex justify-between font-bold">
        <p>Gesamtsumme</p>
        <p>{total.toFixed(2)} €</p>
      </div>
      {children ? children : null}
    </section>
  );
};

export default OrderSummary;
