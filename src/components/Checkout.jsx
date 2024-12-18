import Adress from "./Checkout/Adress";

const Checkout = () => {
  return (
    <div className="w-full flex flex-col flex-grow">
      <h1 className="text-[7vw] font-bold m-[4vw]">Kasse</h1>
      <Adress />
    </div>
  );
};

export default Checkout;
