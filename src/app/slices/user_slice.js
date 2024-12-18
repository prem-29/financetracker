import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userList: [{
        id: 1,
        email: 'abc@gmail.com',
        password: '1234'
    },
    {
        id: 2,
        email: 'testuser@gmail.com',
        password: '1234'
    }],
    isAuthenticate: false,
}

const loginSlice = createSlice({
    name: 'logins',
    initialState,
    reducers: {
        loginSuccess: (state) => {
            state.isAuthenticate = true;
        },
        logout: (state) => {
            state.isAuthenticate = false;
        }
    }
});
export const { loginSuccess, logout } = loginSlice.actions;
export const selectIsAuthenticate = (state) => state.logins.isAuthenticate;
export const selectList = (state) => state.logins.userList;
export default loginSlice.reducer;