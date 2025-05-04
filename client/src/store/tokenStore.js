export let tokenStore = {
  ACCESS_TOKEN: null,
  set_ACCESS_TOKEN: null,
  logout: null,
};

export const injectTokenStore = (token, setToken, logout) => {
  tokenStore.ACCESS_TOKEN = token;
  tokenStore.set_ACCESS_TOKEN = setToken;
  tokenStore.logout = logout;
};
