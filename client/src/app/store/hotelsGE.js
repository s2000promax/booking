import { createAction, createSlice } from '@reduxjs/toolkit';
import hotelsGEService from '../services/hotelsGE.service';
import isOutdated from '../utils/isOutdated';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import history from '../utils/history';
import scheduleService from '../services/schedule.service';

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
        },
        hotelCreated: (state, action) => {
            state.entities.push(action.payload);
        },
    }
});

const { reducer: hotelsGeReducer, actions } = hotelsGeSlice;
const { hotelsGeRequested, hotelsGeReceived, hotelsGeRequestFailed, hotelCreated } =
    actions;

const addNewHotelsRequested = createAction('hotels/addNewHotelsRequested');


export const loadHotelsGeList = () => async (dispatch, getState) => {
        dispatch(hotelsGeRequested());
        try {
            const { content } = await hotelsGEService.get();
            dispatch(hotelsGeReceived(content));
        } catch (error) {
            dispatch(hotelsGeRequestFailed(error.message));
        }
};

export const addNewHotel = (payload) =>
  async (dispatch) => {
      dispatch(addNewHotelsRequested());
      try {
          const { content } = await hotelsGEService.post(payload);

          dispatch(hotelCreated(content.owner));
          dispatch(loadHotelsGeList());
          history.push(`/users/${content.owner}`);
      } catch (error) {
          dispatch(hotelsGeRequestFailed(error.message));
      }
  };

export const getHotelsGE = () => (state) => state.hotelsGE.entities;
export const getHotelsGeLoadingStatus = () => (state) => state.hotelsGE.isLoading;
export const getOwnerHotels = (userId) => (state) => state.hotelsGE.entities.filter(hotel => hotel.owner === userId);
export const getHotelsGeById = (id) => (state) => {
    if (state.hotelsGE.entities) {
        return state.hotelsGE.entities.find((p) => p._id === id);
    }
};
export default hotelsGeReducer;
