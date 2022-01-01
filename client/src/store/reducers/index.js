import { combineReducers } from "redux";

import cinemaReducer from "./cinemas";
import reservationReducer from "./reservations";
import showtimeReducer from "./showtimes";
import checkoutReducer from "./checkout";
import userReducer from "./users";
import movieReducer from "./movies";
import alertReducer from "./alert";
import authReducer from "./auth";
const rootReducer = combineReducers({
  alertReducer,
  authReducer,
  userReducer,
  movieReducer,
  cinemaReducer,
  reservationReducer,
  showtimeReducer,
  checkoutReducer,
});
export default rootReducer;
