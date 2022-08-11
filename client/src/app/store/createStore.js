import commentsReducer from "./comments";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";
import citiesGeReducer from "./citiesGE";
import hotelsGeReducer from "./hotelsGE";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer,
    citiesGE: citiesGeReducer,
    hotelsGE: hotelsGeReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
