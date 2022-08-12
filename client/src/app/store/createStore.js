import usersReducer from './users';
import citiesGeReducer from './citiesGE';
import hotelsGeReducer from './hotelsGE';
import scheduleReducer from './schedule';
import searchRequestReducer from './searchRequest';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
    users: usersReducer,
    citiesGE: citiesGeReducer,
    hotelsGE: hotelsGeReducer,
    schedule: scheduleReducer,
    search: searchRequestReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
