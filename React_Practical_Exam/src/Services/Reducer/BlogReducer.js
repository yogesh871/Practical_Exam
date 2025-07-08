import {
  LOADING,
  ADD_BLOG_SUCCESS,
  GET_BLOGS,
  GET_BLOG,
  UPDATE_BLOG,
  DELETE_BLOG,
  ERROR_BLOG,
  RESET_FLAGS,
} from "../Actions/blogAction";

const initialState = {
  blogs: [],
  blog: null,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  errorMsg: "",
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
        errorMsg: "", 
      };

    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        isCreated: true,
        isLoading: false,
      };

    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        isLoading: false,
      };

    case GET_BLOG:
      return {
        ...state,
        blog: action.payload,
        isLoading: false,
      };

    case UPDATE_BLOG:
      return {
        ...state,
        isUpdated: true,
        isLoading: false,
      };

    case DELETE_BLOG:
      return {
        ...state,
        isDeleted: true,
        isLoading: false,
      };

    case ERROR_BLOG:
      return {
        ...state,
        errorMsg: action.payload,
        isLoading: false,
      };

    case RESET_FLAGS:
      return {
        ...state,
        isCreated: false,
        isUpdated: false,
        isDeleted: false,
      };

    default:
      return state;
  }
};

export default blogReducer; 
