import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticate: localStorage.getItem('isAuthenticate') === 'true'
}

const loginSlice = createSlice({
    name: 'logins',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticate = true;
            localStorage.setItem('isAuthenticate', 'true');
        },
        logout: (state) => {
            state.isAuthenticate = false;
            localStorage.setItem('isAuthenticate', 'false');
            localStorage.removeItem('authToken');
        }
    }
});
export const { loginSuccess, logout } = loginSlice.actions;
export const selectIsAuthenticate = (state) => state.logins.isAuthenticate;
export default loginSlice.reducer;