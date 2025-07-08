import { db } from '../../firebase';
import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  addDoc
} from 'firebase/firestore';

export const LOADING = "LOADING";
export const ADD_BLOG_SUCCESS = "ADD_BLOG_SUCCESS";
export const GET_BLOGS = "GET_BLOGS";
export const GET_BLOG = "GET_BLOG";
export const UPDATE_BLOG = "UPDATE_BLOG";
export const DELETE_BLOG = "DELETE_BLOG";
export const ERROR_BLOG = "ERROR_BLOG";
export const RESET_FLAGS = "RESET_FLAGS";

// Action Creators
export const loading = () => ({ type: LOADING });
export const getBlogs = (payload) => ({ type: GET_BLOGS, payload });
export const getBlog = (payload) => ({ type: GET_BLOG, payload });
export const addBlogSuccess = () => ({ type: ADD_BLOG_SUCCESS });
export const updateBlogSuccess = () => ({ type: UPDATE_BLOG });
export const deleteBlogSuccess = () => ({ type: DELETE_BLOG });
export const errorBlog = (payload) => ({ type: ERROR_BLOG, payload });
export const resetFlags = () => ({ type: RESET_FLAGS });


export const addBlogAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const docRef = await addDoc(collection(db, "blogs"), data);
    dispatch(addBlogSuccess());
    dispatch(getBlogsAsync());
  } catch (err) {
    dispatch(errorBlog(err.message));
  }
};


export const getBlogsAsync = () => async (dispatch) => {
  dispatch(loading());
  try {
    const res = await getDocs(collection(db, "blogs"));
    const blogs = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(getBlogs(blogs));
  } catch (err) {
    dispatch(errorBlog(err.message));
  }
};


export const getBlogAsync = (id) => async (dispatch) => {
  dispatch(loading());
  try {
    const docRef = doc(db, "blogs", id);
    const res = await getDoc(docRef);
    if (res.exists()) {
      dispatch(getBlog({ id: res.id, ...res.data() }));
    } else {
      dispatch(errorBlog("Blog not found"));
    }
  } catch (err) {
    dispatch(errorBlog(err.message));
  }
};


export const updateBlogAsync = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const { id, ...rest } = data;
    await setDoc(doc(db, "blogs", id), rest);
    dispatch(updateBlogSuccess());
    dispatch(getBlogsAsync());
  } catch (err) {
    dispatch(errorBlog(err.message));
  }
};



export const getMyBlogsAsync = (userId) => async (dispatch) => {
  dispatch(loading());
  try {
    const blogQuery = query(collection(db, "blogs"), where("userId", "==", userId));
    const res = await getDocs(blogQuery);
    const userBlogs = res.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    dispatch(getBlogs(userBlogs));
  } catch (err) {
    dispatch(errorBlog(err.message));
  }
};

export const deleteBlogAsync = (id, userId) => async (dispatch, getState) => {
  dispatch(loading());
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Blog not found");
    if (docSnap.data().userId !== userId) throw new Error("Unauthorized");

    await deleteDoc(docRef);

    const currentBlogs = getState().blogReducer.blogs || [];
    const updatedBlogs = currentBlogs.filter((blog) => blog.id !== id);

    dispatch(getBlogs(updatedBlogs));
    dispatch(deleteBlogSuccess());
  } catch (err) {
    dispatch(errorBlog(err.message));
  }
};
