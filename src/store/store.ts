import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bookAPI} from "../services/BookService";
import {userAPI} from "../services/UserService";
import authSlice from "./reducers/authSlice";
import searchSlice from "./reducers/searchSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        search: searchSlice,
        [userAPI.reducerPath]: userAPI.reducer,
        [bookAPI.reducerPath]: bookAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userAPI.middleware).concat(bookAPI.middleware)
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;