export const LOGIN = 'LOGIN';
export const ENABLE_DISABLE_SEARCH_BAR = 'ENABLE_DISABLE_SEARCH_BAR';

export const setUserEmail = (email) => ({
  type: LOGIN, email,
});

export const enableSearchBar = () => ({
  type: ENABLE_DISABLE_SEARCH_BAR,
});
