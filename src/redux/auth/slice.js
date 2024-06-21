import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations';

const initialState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true; // Встановлюємо стан завантаження
        state.isRefreshing = true; // Встановлюємо стан оновлення
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false; // Скидаємо стан завантаження
        state.isLoggedIn = true;
        state.isRefreshing = false; // Скидаємо стан оновлення
      })
      .addCase(register.rejected, (state, action) => {
        state.isRefreshing = false; // Скидаємо стан оновлення
        console.error(action.error); // Логовуємо помилку
        state.isLoading = false; // Скидаємо стан завантаження
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true; // Встановлюємо стан завантаження
        state.isRefreshing = true; // Встановлюємо стан оновлення
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false; // Скидаємо стан завантаження
        state.isRefreshing = false; // Скидаємо стан оновлення
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isLoading = false; // Скидаємо стан завантаження
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
        state.isLoading = true; // Встановлюємо стан завантаження
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.isLoading = false; // Скидаємо стан завантаження
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoading = false; // Скидаємо стан завантаження
      });
  },
});

export default authSlice.reducer;
