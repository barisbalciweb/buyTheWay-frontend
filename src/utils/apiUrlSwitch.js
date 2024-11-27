export const apiUrlSwitch = () => {
  const env = import.meta.env.VITE_NODE_ENV;

  const api_url =
    env === "dev"
      ? import.meta.env.VITE_API_URL_DEV
      : import.meta.env.VITE_API_URL_PROD;

  return api_url;
};
