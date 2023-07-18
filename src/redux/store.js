import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import accountReducer from "./account/reducer";
import toastsReducer from "./toasts/reducer";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistConfig = {
	key: "root",
	storage,
	blacklist: [
		// "account",
		"toasts",
		"backdrop",
	],
};

const rootReducer = combineReducers({
	account: accountReducer,
	toasts: toastsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
	persistedReducer,
	composeEnhancer(applyMiddleware(thunk)),
);
const persistor = persistStore(store);

export { store, persistor };
