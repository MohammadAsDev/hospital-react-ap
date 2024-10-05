import { createSlice } from "@reduxjs/toolkit";
import { decryptData, encryptData } from "../../config/lib";
import { jwtDecode } from "jwt-decode";

import { __admin__, __user__ } from "./../../config/userAfterEncrypt";

const userRoles = Object.freeze({
  ADMIN     : 0,
  STAFF     : 1,
  DOCTOR    : 2,
  NURSE     : 3,
  PATIENT   : 4,
  ANONYMOUS : 5
});

const authRoles = {
  isAdmin     : role => role === userRoles.ADMIN,
  isStaff     : role => role === userRoles.STAFF,
  isDoctor    : role => role === userRoles.DOCTOR,
  isPatient   : role => role === userRoles.PATIENT,
  isNurse     : role => role === userRoles.NURSE,
  isAnonymous : role => role === userRoles.ANONYMOUS
};

const INITIAL_STATE = {
  auth : {
    token : null,
    role  : null,
    id    : null,
    email : null,
    isLoggedIn : false
  }
};

const getUserInfoFromLocal = () => {
  if (sessionStorage.getItem("userInfo")){
    return {auth : JSON.parse(decryptData(sessionStorage.getItem("userInfo")))};
  }

  else return INITIAL_STATE;  
};


export const authSlice = createSlice({

  name: "auth",

  initialState : getUserInfoFromLocal(),

  reducers: {

    login: (state, action) => {
      const token = action.payload["access_token"];
      const claims = jwtDecode(token);

      const userInfo = {
        token,
        role  : claims.role,
        id    : claims.id,
        email : claims.email,
        isLoggedIn : true,
      };

      state.auth.token = userInfo.token;
      state.auth.role = userInfo.role;
      state.auth.id = userInfo.id;
      state.auth.email = userInfo.email;

      state.auth.isLoggedIn = true;

      sessionStorage.setItem(
        "userInfo",
        encryptData(JSON.stringify(userInfo))
      );
    },

    logout: (state) => {
      sessionStorage.removeItem("userInfo");

      state.auth.role = null;
      state.auth.token = null;
      state.auth.email = null;
      state.auth.isLoggedIn = false;
      state.auth.id = null;
    },

    refresh: (state , action) => {
      state.auth.token = action.payload.token;
    },

    verifyPatient: (state) => {
      state.auth.role = userRoles.PATIENT
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, logout , refresh, verifyPatient } = authSlice.actions;
export const {isPatient , isAnonymous , isDoctor , isAdmin , isStaff , isNurse} = authRoles;

export default authSlice.reducer;
