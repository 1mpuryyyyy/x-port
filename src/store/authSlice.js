import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const headers = {
    'Content-Type': 'application/json',
    accept: 'application/json',
};

axios.defaults.headers.common = headers;

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ phoneNumber, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, { phoneNumber, password });
            const { token } = response.data;

            Cookies.set('token', token, { expires: 7 });
            const userResponse = await axios.get(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            return {
                token,
                user: userResponse.data
            };
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка входа');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ firstName, lastName, phoneNumber, email, password }, { rejectWithValue }) => {
        try {
            const data = { firstName, lastName, phoneNumber, email, password };
            await axios.post(`${API_URL}/auth/register`, data);

            return {};
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Ошибка регистрации');
        }
    }
);

export const verifyToken = createAsyncThunk(
    'auth/verifyToken',
    async (_, { rejectWithValue }) => {
        const token = Cookies.get('token');
        if (!token) {
            return rejectWithValue('Токен отсутствует');
        }

        try {
            const response = await axios.get(`${API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const user = response.data;

            return { user, token };
        } catch (err) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                Cookies.remove('token');
                return rejectWithValue('Токен недействителен');
            }
            return rejectWithValue('Нет связи с сервером или временная ошибка');
        }
    }
);

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    loading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearAuthData: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            Cookies.remove('token');
        },
        loadAuthDataFromCookies: (state) => {
            const token = Cookies.get('token');

            if (token) {
                state.token = token;
                state.isAuthenticated = true;
            } else {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
            }
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
            })
            .addCase(verifyToken.pending, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(verifyToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(verifyToken.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.payload;
            });
    },
});

export const { clearAuthData, loadAuthDataFromCookies, setUser } = authSlice.actions;
export default authSlice.reducer;