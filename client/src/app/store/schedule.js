import localStorageService from '../services/localStorage.service';
import { createAction, createSlice } from '@reduxjs/toolkit';
import scheduleService from '../services/schedule.service';
import history from '../utils/history';

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  };

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    scheduleRequested: (state) => {
      state.isLoading = true;
    },
    scheduleReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    scheduleReceivedFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    scheduleCreated: (state, action) => {
      state.entities.push(action.payload);
      state.isLoading = false;
    },
    scheduleUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
        ] = action.payload;
    },
    scheduleRemoved: (state, action) => {
      state.entities = state.entities.filter(
        (c) => c._id !== action.payload
      );
    }
  }
});

const {reducer: scheduleReducer, actions} = scheduleSlice;
const {
  scheduleRequested,
  scheduleReceived,
  scheduleReceivedFailed,
  scheduleCreated,
  scheduleUpdateSuccessed,
  scheduleRemoved
} = actions;

const updateScheduleRequested = createAction('schedule/updateScheduleRequested');
const updateScheduleFailed = createAction('schedule/updateScheduleFailed');
const removeScheduleRequested = createAction('schedule/removeScheduleRequested');


export const loadScheduleList = () => async (dispatch) => {
    dispatch(scheduleRequested());

    try {
      const { content} = await scheduleService.getScheduleList();
      dispatch(scheduleReceived(content));
    } catch (error) {
      dispatch(scheduleReceivedFailed(error.message));
    }
};

export const createSchedule = (payload) => async (dispatch, getState) => {
  dispatch(scheduleRequested());
  try {
    const { content } = await scheduleService.createSchedule(payload);
    dispatch(scheduleCreated(content));
    history.push(`/users/${content.userId}`)
  } catch (error) {
    dispatch(scheduleReceivedFailed(error.message));
  }
};

export const removeSchedule = (scheduleId) => async (dispatch) => {
  dispatch(removeScheduleRequested());
  try {
    const { content } = await scheduleService.removeSchedule(scheduleId);
    if (!content) {
      dispatch(scheduleRemoved(scheduleId));
    }
  } catch (error) {
    dispatch(scheduleReceivedFailed(error.message));
  }
};

export const updateSchedule = (payload) => async (dispatch) => {
  dispatch(updateScheduleRequested());
  try {
    const { content } = await scheduleService.updateSchedule(payload);
    dispatch(scheduleUpdateSuccessed(content));
    // history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(updateScheduleFailed(error.message));
  }
};

export const getSchedule = () => (state) => state.schedule.entities;
export const getScheduleByUserId = (userId) => (state) => state.schedule.entities.filter(item => item.userId === userId);
export const getScheduleRequestStatus = () => (state) => state.schedule.isLoading;

export default scheduleReducer;
