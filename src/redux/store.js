import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user";

// const initialState = {
//   data: {
//     users_id: null,
//     roles_id: null,
//     token: null,
//   },
// };

// const reduxStore = configureStore({
//   reducer: (prevState = initialState, action) => {
//     // token: (add)
//     // action: {
//     //   type: (get)
//     //   data: token
//     switch (action.type) {
//       case "ADD":
//         return {
//           ...prevState,
//           data: prevState.data,
//         };
//       case "GET":
//         return {
//           ...prevState,
//           data: prevState.data,
//         };
//       default:
//         return prevState;
//     }
//   },
// });

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
