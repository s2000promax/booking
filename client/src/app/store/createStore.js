import usersReducer from './users';
import citiesGeReducer from './citiesGE';
import hotelsGeReducer from './hotelsGE';
import scheduleReducer from './schedule';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
    users: usersReducer,
    citiesGE: citiesGeReducer,
    hotelsGE: hotelsGeReducer,
    schedule: scheduleReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
