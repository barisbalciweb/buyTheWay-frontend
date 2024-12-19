const ProductInOverview = ({ item }) => {
  const { name, price, images, brand } = item.item;

  const productTitle = brand + " " + name;

  return (
    <div className="flex relative gap-[2vw]">
      <img
        className="w-[40%] bg-productImgBg"
        src={images[0].url}
        alt={images[0].alt}
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-[5vw]">{productTitle}</h3>
        <div className="text-[4vw]">
          <p>
            <b>Preis:</b> {price} €
          </p>
          <p>
            <b>Größe:</b> {item.size}
          </p>
        </div>
        <div className="text-[4vw]">
          <p>
            <b>Anzahl:</b> {item.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInOverview;
