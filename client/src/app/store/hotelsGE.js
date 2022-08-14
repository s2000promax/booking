import { createSlice } from '@reduxjs/toolkit';
import hotelsGEService from '../services/hotelsGE.service';
import isOutdated from '../utils/isOutdated';

const hotelsGeSlice = createSlice({
    name: 'hotelsGE',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        hotelsGeRequested: (state) => {
            state.isLoading = true;
        },
        hotelsGeReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        hotelsGeRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: hotelsGeReducer, actions } = hotelsGeSlice;
const { hotelsGeRequested, hotelsGeReceived, hotelsGeRequestFailed } =
    actions;

export const loadHotelsGeList = () => async (dispatch, getState) => {
        dispatch(hotelsGeRequested());
        try {
            const { content } = await hotelsGEService.get();
            dispatch(hotelsGeReceived(content));
        } catch (error) {
            dispatch(hotelsGeRequestFailed(error.message));
        }
};

export const getHotelsGE = () => (state) => state.hotelsGE.entities;
export const getHotelsGeLoadingStatus = () => (state) => state.hotelsGE.isLoading;
export const getHotelsGeById = (id) => (state) => {
    if (state.hotelsGE.entities) {
        console.log('sadasasdasasd')
        return state.hotelsGE.entities.find((p) => p._id === id);
    }
};
export default hotelsGeReducer;
