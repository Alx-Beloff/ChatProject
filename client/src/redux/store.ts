import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './slices/messages/messagesSlice';
import authReducer from './slices/auth/authSlice';
import spotsReducer from './slices/spots/spotsSlice';

export const store = configureStore({
  reducer: {
    messages: messagesReducer,
    auth: authReducer,
    spots: spotsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type StoreType = typeof store;
