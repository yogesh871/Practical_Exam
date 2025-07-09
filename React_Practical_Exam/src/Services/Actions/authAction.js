import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { auth } from "../../Firebase";

export const signINSuc = (user) => ({ type: "SIGN_IN_SUC", payload: user });
export const signOUTSUC = () => ({ type: "SIGN_OUT_SUC" });
export const signUPSuc = () => ({ type: "SIGN_UP_SUC" });
export const setError = (msg) => ({ type: "ERROR", payload: msg });
export const clearError = () => ({ type: "CLEAR_ERROR" });

export const signINAsync = ({ email, password }) => async (dispatch) => {
  dispatch(clearError());
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      email: res.user.email,
      uid: res.user.uid,
    };
    dispatch(signINSuc(user));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const signUpAsync = ({ email, password }) => async (dispatch) => {
  dispatch(clearError());
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(signUPSuc());
    dispatch(signINSuc({ email: res.user.email, uid: res.user.uid }));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const googleSignInAsync = () => async (dispatch) => {
  dispatch(clearError());
  const provider = new GoogleAuthProvider();
  try {
    const res = await signInWithPopup(auth, provider);
    const user = {
      email: res.user.email,
      uid: res.user.uid,
    };
    dispatch(signINSuc(user));
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const checkAuthStateAsync = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(signINSuc({ email: user.email, uid: user.uid }));
    } else {
      dispatch(signOUTSUC());
    }
  });
};

export const logoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(signOUTSUC());
  } catch (err) {
    console.error("Logout error:", err.message);
  }
};
