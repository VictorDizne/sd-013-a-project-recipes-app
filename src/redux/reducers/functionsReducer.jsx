import { ENABLE_DISABLE_SEARCH_BAR } from '../actions';

const initialState = {
  enableSearch: true,
};

const functionsReducer = (state = initialState, { type }) => {
  switch (type) {
  case ENABLE_DISABLE_SEARCH_BAR:
    return { ...state, enableSearch: !state.enableSearch };
  default:
    return state;
  }
};

export default functionsReducer;
