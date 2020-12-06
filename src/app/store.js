import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';

// prev we are using const store = createStore(reducers...);  (reducers... is combineReducer({}) )
// but here we using configureStore() and exporting it so we directly use store in index.js (see index.js) 
export default configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});
