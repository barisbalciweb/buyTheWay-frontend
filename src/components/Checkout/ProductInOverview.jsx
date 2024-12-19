const ProductInOverview = ({ item }) => {
  const { name, price, images, brand } = item.item;

  const productTitle = brand + " " + name;

  return (
    <div className="flex relative gap-[2vw] bg-white p-[1vw] rounded-md">
      <img
        className="w-[40%] bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-[4.5vw]">{productTitle}</h3>
        <div className="text-[3.5vw]">
          <p>
            <b>Preis:</b> {price} €
          </p>
          <p>
            <b>Größe:</b> {item.size}
          </p>
        </div>
        <div className="text-[3.5vw]">
          <p>
            <b>Anzahl:</b> {item.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInOverview;
