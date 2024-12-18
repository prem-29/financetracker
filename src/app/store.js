import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user_slice";

const store = configureStore({
    reducer: {
        logins: userReducer
    }
});

export default store;