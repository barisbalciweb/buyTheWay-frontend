export const apiUrlSwitch = () => {
  const env = import.meta.env.VITE_NODE_ENV;

  const api_url =
    env === "prod"
      ? import.meta.env.VITE_API_URL_PROD
      : import.meta.env.VITE_API_URL_DEV;

  return api_url;
};
