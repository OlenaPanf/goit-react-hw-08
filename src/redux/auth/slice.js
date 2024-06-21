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
        state.isLoading = true; // Встановлюємо загальний стан завантаження в true під час очікування завершення реєстрації
        state.isRefreshing = true; // Встановлюємо стан оновлення в true під час очікування завершення реєстрації
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false; // Скидаємо загальний стан завантаження після успішної реєстрації
        state.isLoggedIn = true;
        state.isRefreshing = false; // Скидаємо стан оновлення після успішної реєстрації
      })
      .addCase(register.rejected, (state, action) => {
        state.isRefreshing = false; // Скидаємо стан оновлення після невдалої спроби реєстрації
        console.error(action.error); // Логовуємо помилку, якщо реєстрація не вдалася
        state.isLoading = false; // Скидаємо загальний стан завантаження після невдалої спроби реєстрації
      })
      .addCase(logIn.pending, state => {
        state.isLoading = true; // Встановлюємо загальний стан завантаження в true під час очікування завершення входу в систему
        state.isRefreshing = true; // Встановлюємо стан оновлення в true під час очікування завершення входу в систему
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false; // Скидаємо загальний стан завантаження після успішного входу в систему
        state.isRefreshing = false; // Скидаємо стан оновлення після успішного входу в систему
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export default authSlice.reducer;
