/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
const store = configureStore({
  reducer: rootReducer,
});
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
