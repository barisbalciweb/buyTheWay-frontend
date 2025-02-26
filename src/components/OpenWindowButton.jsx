const OpenWindowButton = () => {
  const openWindow = () => {
    const url = "https://btw.barisbalci.de";
    const width = 393;
    const height = 852;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
      url,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  return (
    <button
      onClick={openWindow}
      className="w-[40%] px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-500 m-auto">
      buyTheWay
    </button>
  );
};

export default OpenWindowButton;
