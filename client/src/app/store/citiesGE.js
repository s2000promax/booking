import { createSlice } from '@reduxjs/toolkit';
import citiesGEService from '../services/citiesGE.service';
import isOutdated from '../utils/isOutdated';

const citiesGeSlice = createSlice({
    name: 'citiesGE',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        citiesGeRequested: (state) => {
            state.isLoading = true;
        },
        citiesGeReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        citiesGeRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: citiesGeReducer, actions } = citiesGeSlice;
const { citiesGeRequested, citiesGeReceived, citiesGeRequestFailed } =
    actions;

export const loadCitiesGeList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().citiesGE;
    if (isOutdated(lastFetch)) {
        console.log("lastFetch", lastFetch);
        dispatch(citiesGeRequested());
        try {
            const { content } = await citiesGEService.get();
            dispatch(citiesGeReceived(content));
        } catch (error) {
            dispatch(citiesGeRequestFailed(error.message));
        }
    }
};

export const getCitiesGE = () => (state) => state.citiesGE.entities;
export const getCitiesGeLoadingStatus = () => (state) =>
    state.citiesGE.isLoading;
export const getCitiesGeById = (id) => (state) => {
    if (state.citiesGE.entities) {
        return state.citiesGE.entities.find((p) => p._id === id);
    }
};
export default citiesGeReducer;
