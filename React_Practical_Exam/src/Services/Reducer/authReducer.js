const initialState = {
  user: null,
  isCreated: false,
  errorMsg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN_SUC":
      return {
        ...state,
        user: action.payload || null,
        errorMsg: "",
      };

    case "SIGN_OUT_SUC":
      return {
        ...state,
        user: null,
        isCreated: false,
        errorMsg: "",
      };

    case "SIGN_UP_SUC":
      return {
        ...state,
        isCreated: true,
        errorMsg: "",
      };

    case "ERROR":
      return {
        ...state,
        errorMsg: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        errorMsg: "",
      };

    default:
      return state;
  }
};

export default authReducer;
