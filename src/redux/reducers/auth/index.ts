import { LOGIN, LOGOUT } from './auth.types';

const initialState = {
  isAuthorized: false,
  userDetails: {},
};

type Actions = {
  type: string;
  payload?: any;
};

const reducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        userDetails: action.payload,
        isAuthorized: true,
      };
    }

    case LOGOUT:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
